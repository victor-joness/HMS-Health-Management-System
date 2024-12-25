import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { BedRepositoryImplementation } from "../../core/implementation/BedRepositoryImplementation";
import { BedService } from "../../core/services/BedService";
import { BedController } from "../controllers/BedController";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const bedRepository = new BedRepositoryImplementation();
const bedServices = new BedService(bedRepository);
const bedController = new BedController(bedServices, loggingService);

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => bedController.getAllBeds(req, res));
  router.post("/", (req, res) => bedController.createBed(req, res));
  router.put("/:id", (req, res) => bedController.updateBed(req, res));
  router.delete("/:id", (req, res) => bedController.deleteBed(req, res));
  router.get("/:id", (req, res) => bedController.getBedById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => bedController.getAllBeds(req, res));
  router.post("/", isAdmin, (req, res) => bedController.createBed(req, res));
  router.put("/:id", isAdmin, (req, res) => bedController.updateBed(req, res));
  router.delete("/:id", isAdmin, (req, res) =>
    bedController.deleteBed(req, res)
  );
  router.get("/:id", isAdmin, (req, res) => bedController.getBedById(req, res));
}

export default router;
