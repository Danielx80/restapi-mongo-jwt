import Role from "../models/Role";
import User from "../models/User";

export const createUser = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    roles,
    // Encrypar contraseña
    password: await User.encryptPassword(password),
  });
  // para agregar un role por defecto o generarlo
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    // si no se coloca role por defecto sera User
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }
  const userSaved = await newUser.save();
  res.status(201).json(userSaved);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  res.status(200).json(updateUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(204).json(`user whith ${userId} delete succesfully`);
};
