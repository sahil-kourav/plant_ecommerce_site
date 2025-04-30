const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth ,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", checkAuth, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

router.get("/admin-dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the admin dashboard!",
    user: req.user,
  });
});

module.exports = router;
