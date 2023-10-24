const { Router } = require("express");
const route = Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");

route.get("/", (req, res) => res.send("Bienvenido a mi servidor"));

//method for register
route.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new user({ name, email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "ClaveSecreta");
  res.status(200).json({ token });
});

route.put("/complete-profile", verifyToken, async (req, res) => {
  const { biography, title, phone, address, photo, birthDate } = req.body;
  const userId = req.userId;

  try {
    const userToUpdate = await user.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    userToUpdate.biography = biography;
    userToUpdate.title = title;
    userToUpdate.phone = phone;
    userToUpdate.address = address;
    userToUpdate.photo = photo;
    userToUpdate.birthDate = birthDate;

    await userToUpdate.save();

    const token = jwt.sign({ _id: userId }, "ClaveSecreta");

    return res.status(200).json({
      message: "Profile updated successfully",
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});


route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  if (!User) return res.status(401).send("El correo o contrasenia no existen");
  if (User.password !== password)
  return res.status(401).send("La contrasenia o el correo no existen");
  const token =  jwt.sign({ _id: User._id }, "ClaveSecreta");
  return res.status(200).json({token});
});


module.exports = route;


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).rend("Acceso autorizado");
  }
  const token = req.headers.authorization.split(' ')[1]
  if(token === null){
    return res.status(401).send("Acceso No autorizado")
  }
  const payload = jwt.verify(token,'ClaveSecreta')
  req.userId = payload._id;
  next();
}