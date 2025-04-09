import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: string;
  }
}


const register = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    if (!email) {
      resp.status(400).json({
        message: "Email is required",
      });
      return;
    }

    if (!password) {
      resp.status(400).json({
        message: "Password is required",
      });
      return;
    }

    if (!name) {
      resp.status(400).json({
        message: "Name is required",
      });
      return;
    }

    const isUserExists = await User.findOne({
      email,
    });

    if (isUserExists) {
      resp.status(401).json({
        message: "Email already in use",
      });
      return;
    }

    const hashedPassword = hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ id: user._id }, process.env.JWT_SECRET as string);

    resp.cookie("authentication-token", token, {
      maxAge: 24 * 60 * 60 * 1000 * 7,
    });

    resp.status(200).json({
      message: "account created successfully",
      userData: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      resp.status(400).json({
        message: "Email is required",
      });
      return;
    }

    if (!password) {
      resp.status(400).json({
        message: "Password is required",
      });
      return;
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      resp.status(400).json({
        message: "Invalid credentials",
      });
      return;
    }

    const isPaswordMatch = compareSync(password, user.password as string);

    if (!isPaswordMatch) {
      resp.status(400).json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET as string);

    resp.cookie("authentication-token", token, {
      maxAge: 24 * 60 * 60 * 1000 * 7,
    });

    resp.status(200).json({
      message: "login successfull",
      userData: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

const me = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      resp.status(400).json({
        message: "Unauthorized",
      });
      return;
    }

    const currentUser = await User.findById(user);

    if (!currentUser) {
      resp.status(400).json({
        message: "Unauthorized",
      });
      return;
    }

    resp.status(200).json({
      message: "User authenticated",
      userData: {
        email: currentUser.email,
        name: currentUser.name,
        id: currentUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

const logout = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    resp.cookie("authentication-token", "");
    resp.status(200).json({
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};
export default {
  login,
  register,
  me,
  logout,
};
