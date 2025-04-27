const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.login = async (req, res) => {
  try {
    console.log("Přijatá data:", req.body);
    const admins = await Admin.find();
    const admin = await Admin.findOne({ adminId: req.body.adminId });
    console.log({admin});
    console.log({admins});
    if (!admin) {
      console.log("Admin nenalezen");
      return res.status(401).json({ message: "Neplatné přihlašovací údaje" });
    }

    const match = await bcrypt.compare(req.body.password, admin.password);
    console.log("Porovnání hesel:", match);
    if (!match) {
      return res.status(401).json({ message: "Neplatné přihlašovací údaje" });
    }

    // Generování jwt
    // token je platný 1 hodinu
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "tajnyklic",
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Přihlášení úspěšné", 
      token 
    });

  } catch (error) {
    console.error("Chyba při přihlášení:", error);
    res.status(500).json({ message: "Interní chyba serveru" });
  }
};
