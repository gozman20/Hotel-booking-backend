const express = require("express");
const router = express.Router();
const {
  registerUser,

  getUser,
  deleteUser,
} = require("../controller/userController");

//Adding protection to ur route
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
//
router.get("/me", getUser);
//to delete user
//I added this
router.delete("/:id", protect, deleteUser);

module.exports = router;
