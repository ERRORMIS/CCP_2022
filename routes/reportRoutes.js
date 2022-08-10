import express from "express";
import {
  getReport,
  updateReport
} from '../controllers/reportController.js'

const router = express.Router();

router.route("/").put(updateReport)
router.route("/").get(getReport);

export default router;