const jwt = require("jsonwebtoken");

const generateToken = (res, user, message) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      userName: user.userName,
    },
    process.env.CLIENT_SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: message || "Login successful.",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      userName: user.userName,
    },
  });
};

module.exports = { generateToken };
