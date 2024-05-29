const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).send({
        message: "A user with this email already exists.",
        success: false,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).send({
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).send({
        message: "Invalid email address.",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(200).send({
        message: "Incorrect password.",
        success: false,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).send({
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "isAdmin",
        "isActive",
      ],
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).send({
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "isAdmin", "isActive"],
    });

    return res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Failed to fetch users", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.blockUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    user.isActive = false;
    await user.save();

    return res.status(200).send({
      message: "User has been blocked.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to block user", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.unblockUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    user.isActive = true;
    await user.save();

    return res.status(200).send({
      message: "User has been unblocked.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to unblock user", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.demoteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    user.isAdmin = false;
    await user.save();

    return res.status(200).send({
      message: "User has been demoted.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to demote user", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.promoteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    user.isAdmin = true;
    await user.save();

    return res.status(200).send({
      message: "User has been promoted.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to promote user", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }

    await user.destroy();

    return res.status(200).send({
      message: "User has been deleted.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete user", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
