import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import dotenv from "dotenv";

dotenv.config();


const redisAvailable = () => redis && typeof redis.set === "function";


const generateToken = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};


// Store Refresh token in Redis (with fallback)
const storeRefreshToken = async (userId, refreshToken) => {
  if (!redisAvailable()) {
    console.warn("⚠ Redis unavailable — refresh token not persisted");
    return;
  }

  try {
    await redis.set(
      `refresh_token:${userId}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60 // 7 days
    );
    console.log(`✅ Refresh token stored for user: ${userId}`);
  } catch (error) {
    console.error(`❌ Redis error while storing token:`, error.message);
  }
};

const isProd = process.env.NODE_ENV === "production";


// Set cookies
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProd ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


// SIGNUP
export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (redisAvailable()) {
          await redis.del(`refresh_token:${decoded.userId}`);
        }
      } catch (err) {
        console.warn("⚠ Failed to decode refresh token on logout");
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// REFRESH ACCESS TOKEN
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (redisAvailable()) {
      const stored = await redis.get(`refresh_token:${decoded.userId}`);
      if (stored !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    } else {
      console.warn("⚠ Redis down — skipping refresh token validation (fallback)");
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// PROFILE
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
