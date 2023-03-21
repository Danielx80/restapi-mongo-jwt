import User from "../models/User";

export const createUser = (req, res) => {
  res.json("create User");
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};
