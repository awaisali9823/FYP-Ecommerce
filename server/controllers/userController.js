import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";

// New User
export const creatUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      userEmail,
      password,
      address,
      phone,
      profilePicture,
      isAdmin,
    } = req.body;

    const userExist = await User.findOne({ userEmail });
    if (userExist) {
      return res.status(200).send({
        message: "User already Exists",
        success: false,
      });
    }
    let newUserName = userName;
    const checkUserName = await User.findOne({ userName });
    if (checkUserName) {
      const randomNum = Math.floor(Math.random() * 1000);
      newUserName = userName + randomNum;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName: newUserName,
      userEmail,
      password: hashPassword,
      address,
      phone,
      profilePicture,
      isAdmin,
    });

    await newUser.save();
    res.status(200).send({
      message: "User Created Succesfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// User Login
export const userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(200).send({
        message: "Email is not registered",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(200).send({
        message: "Password is wrong",
        success: false,
      });
    } else {
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "Login Succes",
        success: true,
        data: token,
      });
    }
  } catch (error) {}
};
// Get All User
export const getAllUser = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).send({
      message: "User Data fetch Succesfully",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Get Single User
export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "User Data fetch Succesfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Update User
export const updateUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body, req.body._id);
    const response = await User.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    console.log(response);

    res.status(200).send({
      message: "User Data Updated Successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Delete the User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    console.log(req.body._id, deletedUser);
    if (!deletedUser) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "User Deleted Successfully",
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Forget Password
export const forgetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(401).send({
        message: "Email not registered",
        success: false,
      });
    }
    const otp = Math.ceil(Math.random() * 10000);
    user.otpCode = otp;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "engrmohsin32@gmail.com",
        pass: "tgsf qlsp yzae wqsb",
      },
    });

    const mailOptions = {
      from: "engrmohsin32@gmail.com",
      to: userEmail,
      subject: "Reset Your password",
      html: `<p>Hello ${user?.userName},</p><br/> Your Otp is for reset Password is ${otp}`,
    };

    transporter.sendMail(mailOptions);

    res.status(200).send({
      message: "Email sent Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { userEmail, otpCode, newPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(401).send({
        message: "User Not Found",
        success: false,
      });
    }

    // const otpExpireTime = new Date(user.createdAt.getTime() + 60 * 60 * 1000);

    // if (otpExpireTime <= new Date()) {
    //   return res.status(401).send({
    //     message: "Expired Otp",
    //     success: false,
    //   });
    // }

    user.password = newPassword;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    user.otp = null;
    await user.save();

    res.status(200).send({
      message: "Password reset successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// get user info by user id
export const getUserInfoById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(401).send({
        message: "User not found",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Data fetch Succsessfuly",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false });
  }
};
