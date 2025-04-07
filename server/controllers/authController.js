const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.login = async (req, res) => {
  const { adminId, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(401).json({ message: "Neplatné přihlašovací údaje" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ message: "Neplatné heslo" });

    const token = jwt.sign({ adminId: admin.adminId }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Chyba serveru" });
  }
};
