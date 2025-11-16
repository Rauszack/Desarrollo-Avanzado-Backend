import { Router } from "express";
import PetsController from "../controller/pets.controller.js";

export const router = Router();

router.get("/", PetsController.getPets);
router.post("/", PetsController.createPet);