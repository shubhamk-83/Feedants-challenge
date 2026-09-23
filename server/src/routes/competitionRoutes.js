const express = require("express");
const {
  getFeatured,
  getById,
  register,
  submit,
} = require("../controllers/competitionController");

const router = express.Router();

router.get("/featured", getFeatured);
router.get("/:id", getById);
router.post("/:id/register", register);
router.post("/:id/submissions", submit);

module.exports = router;
