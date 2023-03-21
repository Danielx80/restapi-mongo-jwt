import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    // para encryptar la contraseña
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

  const saveUser = await newUser.save();
  console.log(saveUser);

  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400, // 24hrs
  });
  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  // si el email existe
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.json({ message: "User not found " });
  //  validar la contraseña
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
