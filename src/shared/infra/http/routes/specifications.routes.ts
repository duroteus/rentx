import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/ListSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
