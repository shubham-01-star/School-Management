export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function normalizePagination(pageRaw: unknown, limitRaw: unknown, maxLimit = 100) {
  let page = Number(pageRaw ?? 1);
  let limit = Number(limitRaw ?? 20);
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = 20;
  if (limit > maxLimit) limit = maxLimit;
  return { page, limit, offset: (page - 1) * limit };
}

export function buildMeta(page: number, limit: number, total: number): PageMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    page,
    limit,
    total,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}
