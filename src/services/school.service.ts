import { DataSource } from 'typeorm';
import { AppError, Conflict, NotFound } from '../utils/errors';
import { normalizePagination, buildMeta } from '../utils/pagination';
import { School } from '../enitity/School';

export type CreateSchoolDTO = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type ListSchoolsParams = {
  userLat: number;
  userLng: number;
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: 'distance' | 'name' ;
  orderDir?: 'ASC' | 'DESC';
};

export class SchoolService {
  constructor(private readonly ds: DataSource) {}

  private repo() {
    return this.ds.getRepository(School);
  }

  private sanitizeCreate(dto: CreateSchoolDTO): CreateSchoolDTO {
    const name = String(dto.name ?? '').trim();
    const address = String(dto.address ?? '').trim();
    const latitude = Number(dto.latitude);
    const longitude = Number(dto.longitude);

    if (!name) throw new AppError('name is required');
    if (!address) throw new AppError('address is required');
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90)
      throw new AppError('latitude must be between -90 and 90');
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180)
      throw new AppError('longitude must be between -180 and 180');
    if (name.length > 255) throw new AppError('name too long (max 255)');
    if (address.length > 500) throw new AppError('address too long (max 500)');

    return { name, address, latitude, longitude };
  }

  private async assertNotDuplicateNear(name: string, lat: number, lng: number) {
    const thresholdKm = 0.1; // 100 meters

    const distanceExpr =
      `(6371 * 2 * ASIN(SQRT( POWER(SIN(RADIANS(:lat - s.latitude) / 2), 2)` +
      ` + COS(RADIANS(:lat)) * COS(RADIANS(s.latitude))` +
      ` * POWER(SIN(RADIANS(:lng - s.longitude) / 2), 2) )))`;

    const qb = this.repo()
      .createQueryBuilder('s')
      .select(['s.id AS id', 's.name AS name'])
      .addSelect(distanceExpr, 'distance_km')
      .where('s.name = :name', { name })
      .setParameters({ lat, lng })
      .groupBy('s.id')
      .having('distance_km <= :threshold', { threshold: thresholdKm });

    const near = await qb.getRawMany();
    if (near.length > 0) throw Conflict('A school with the same name already exists nearby (<= 100m).');
  }

  async addSchool(input: CreateSchoolDTO) {
    const dto = this.sanitizeCreate(input);
    await this.assertNotDuplicateNear(dto.name, dto.latitude, dto.longitude);
    const saved = await this.repo().save(this.repo().create(dto));
    return saved;
  }

  async listSchools(params: ListSchoolsParams) {
    const userLat = Number(params.userLat);
    const userLng = Number(params.userLng);
    if (!Number.isFinite(userLat) || userLat < -90 || userLat > 90) throw new AppError('userLat invalid');
    if (!Number.isFinite(userLng) || userLng < -180 || userLng > 180) throw new AppError('userLng invalid');

    const { page, limit, offset } = normalizePagination(params.page, params.limit, 100);
    const orderBy = (params.orderBy ?? 'distance') as 'distance' | 'name';
    const orderDir = (params.orderDir ?? 'ASC') as 'ASC' | 'DESC';

    const distanceExpr =
      `(6371 * 2 * ASIN(SQRT( POWER(SIN(RADIANS(:lat - s.latitude) / 2), 2)` +
      ` + COS(RADIANS(:lat)) * COS(RADIANS(s.latitude))` +
      ` * POWER(SIN(RADIANS(:lng - s.longitude) / 2), 2) )))`;

    const repo = this.repo();
    let qb = repo
      .createQueryBuilder('s')
      .select([
        's.id AS id',
        's.name AS name',
        's.address AS address',
        's.latitude AS latitude',
        's.longitude AS longitude',
        // 's.created_at AS created_at',
        // 's.updated_at AS updated_at'
      ])
      .addSelect(distanceExpr, 'distance_km')
      .setParameters({ lat: userLat, lng: userLng });

    const search = (params.search ?? '').trim();
    if (search) qb = qb.andWhere('(s.name LIKE :q OR s.address LIKE :q)', { q: `%${search}%` });

    // count
    const total = await qb.clone().getCount();

    // order
    if (orderBy === 'distance') qb = qb.orderBy('distance_km', orderDir);
    else if (orderBy === 'name') qb = qb.orderBy('s.name', orderDir);
    // else qb = qb.orderBy('s.created_at', orderDir);

    qb = qb.groupBy('s.id').offset(offset).limit(limit);

    const rows = await qb.getRawMany();

    const data = rows.map((r) => ({
      id: Number(r.id),
      name: r.name,
      address: r.address,
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      // created_at: r.created_at,
      // updated_at: r.updated_at,
      distance_km: Number(Number(r.distance_km).toFixed(3))
    }));

    return { data, meta: buildMeta(page, limit, total) };
  }

  async getById(id: number) {
    const one = await this.repo().findOne({ where: { id } });
    if (!one) throw NotFound('School not found');
    return one;
  }

  async remove(id: number) {
    const entity = await this.getById(id);
    await this.repo().remove(entity);
    return { deleted: true };
  }
}
