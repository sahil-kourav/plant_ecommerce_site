// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../../models/User");

// // //register
// // const registerUser = async (req, res) => {
// //   const { userName, email, password, number } = req.body;
// //   if (!userName || !email || !password || !number) {
// //     return res.json({
// //       success: false,
// //       message: "Please fill in all required details.",
// //     });
// //   }

// //   try {
// //     // Check for existing email
// //     const checkEmail = await User.findOne({ email });
// //     if (checkEmail) {
// //       return res.json({
// //         success: false,
// //         message: "User already exists with this email! Please try again.",
// //       });
// //     }

// //     // Check for existing mobile number
// //     const checkNumber = await User.findOne({ number });
// //     if (checkNumber) {
// //       return res.json({
// //         success: false,
// //         message: "Mobile number is already registered! Please try again.",
// //       });
// //     }

// //     const hashPassword = await bcrypt.hash(password, 12);

// //     const newUser = new User({
// //       userName,
// //       email,
// //       number,
// //       password: hashPassword,
// //     });

// //     await newUser.save();

// //     res.status(200).json({
// //       success: true,
// //       message: "Registration successful",
// //     });

// //   } catch (e) {
// //     console.log(e);
// //     res.status(500).json({
// //       success: false,
// //       message: "Some error occurred",
// //     });
// //   }
// // };

// // //login
// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
// //   if ( !email || !password ) {
// //     return res.json({
// //       success: false,
// //       message: "Please fill in all required details.",
// //     });
// //   }

// //   try {
// //     const checkUser = await User.findOne({ email });
// //     if (!checkUser)
// //       return res.json({
// //         success: false,
// //         message: "User doesn't exists! Please register first",
// //       });

// //     const checkPasswordMatch = await bcrypt.compare(
// //       password,
// //       checkUser.password
// //     );
// //     if (!checkPasswordMatch)
// //       return res.json({
// //         success: false,
// //         message: "Incorrect email or password! Please try again",
// //       });

// //     const token = jwt.sign(
// //       {
// //         id: checkUser._id,
// //         role: checkUser.role,
// //         email: checkUser.email,
// //         userName: checkUser.userName,
// //       },
// //       "CLIENT_SECRET_KEY",
// //       { expiresIn: "60m" }
// //     );

// //     res.cookie("token", token, { httpOnly: true, secure: false }).json({
// //       success: true,
// //       message: "Logged in successfully",
// //       user: {
// //         email: checkUser.email,
// //         role: checkUser.role,
// //         id: checkUser._id,
// //         userName: checkUser.userName,
// //       },
// //     });
// //   } catch (e) {
// //     console.log(e);
// //     res.status(500).json({
// //       success: false,
// //       message: "Some error occured",
// //     });
// //   }
// // };

// // //logout

// // const logoutUser = (req, res) => {
// //   res.clearCookie("token").json({
// //     success: true,
// //     message: "Logged out successfully!",
// //   });
// // };

// // //auth middleware
// // const authMiddleware = async (req, res, next) => {
// //   const token = req.cookies.token;
// //   if (!token)
// //     return res.status(401).json({
// //       success: false,
// //       message: "Unauthorised user!",
// //     });

// //   try {
// //     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(401).json({
// //       success: false,
// //       message: "Unauthorised user!",
// //     });
// //   }
// // };

// // module.exports = { registerUser, loginUser, logoutUser, authMiddleware };










const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { generateToken } = require("../../utils/generateToken");

// ========== REGISTER ==========
const registerUser = async (req, res) => {
  const { userName, email, password, number, role = "user" } = req.body;

  if (!userName || !email || !password || !number) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const existingEmail = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const existingNumber = await User.findOne({ where: { number } });
    if (existingNumber) {
      return res.status(409).json({
        success: false,
        message: "Mobile number is already registered.",
      });
    }

    // Prevent multiple admins
    if (role === "admin") {
      const existingAdmin = await User.findOne({ where: { role: "admin" } });
      if (existingAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin already exists.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      userName,
      email: email.toLowerCase(),
      number,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully .`,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// ========== LOGIN ==========
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    generateToken(res, user, `Welcome back, ${user.userName}!`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

// ========== LOGOUT ==========
const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// ========== AUTH MIDDLEWARE (ADMIN ONLY) ==========
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not logged in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// ========== CHECK AUTH ==========
const checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    const user = await User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Token invalid." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth,
};
