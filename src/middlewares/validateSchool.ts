// middlewares/validateSchool.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function validateSchool(req: Request, res: Response, next: NextFunction) {
    const { name, address, latitude, longitude } = req.body;

    // Required field checks
    // if (!name) 
    //     // throw new AppError("name is required", 400, "BAD_REQUEST");
    // res.status(400).json({ code: "BAD_REQUEST", message: "name is required" });
    // if (!address) 
    //     // throw new AppError("address is required", 400, "BAD_REQUEST");
    // if (latitude === undefined)
    //     //  throw new AppError("latitude is required", 400, "BAD_REQUEST");
    //     res.status(400).json({ code: "BAD_REQUEST", message: "latitude is required" });
    // if (longitude === undefined)
    //     //  throw new AppError("longitude is required", 400, "BAD_REQUEST");
    //     res.status(400).json({ code: "BAD_REQUEST", message: "longitude is required" });
 

    // Type check
    // if (typeof latitude !== "number" || typeof longitude !== "number") {
    //     // throw new AppError("latitude/longitude must be numbers", 400, "BAD_REQUEST");
    //     res.status(400).json({ code: "BAD_REQUEST", message: "latitude/longitude must be numbers" });
    // }

    // Allowed fields only check
    const allowed = ["name", "address", "latitude", "longitude"];
    const extraFields = Object.keys(req.body).filter(k => !allowed.includes(k));
    if (extraFields.length > 0) {
        // throw new AppError(`Unexpected fields: ${extraFields.join(", ")}`, 400, "BAD_REQUEST");
        res.status(400).json({ code: "BAD_REQUEST", message: `Unexpected fields: ${extraFields.join(", ")}` });
        return;
    }

    next();

}