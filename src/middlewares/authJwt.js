import config from "../config";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    // verificar el token del usuario con la de los productos
    const token = req.headers["x-access-token"];
    console.log(token);
    //   verificar si envian el token
    if (!token) return res.status(403).json({ message: "Not token provider" });
    //   comprobar si el token es valido
    const decoded = jwt.verify(token, config.SECRET);

    //   validar si el usuario existe
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status().json({ message: "no user found" });

    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  console.log(roles);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Moderator Role" });
};
export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  console.log(roles);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Admin Role" });
};
