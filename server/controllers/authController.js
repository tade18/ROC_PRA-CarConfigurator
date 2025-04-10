const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.login = async (req, res) => {

  try {
    console.log("Přijatá data:", req.body);
    const admin = await Admin.findOne({ adminID: req.body.adminID });
    if (!admin) {
      console.log("Admin nenalezen");
      return res.status(401).json({ message: "Neplatné přihlašovací údaje" });
    }

    const match = await bcrypt.compare(req.body.password, admin.password);
    console.log("Porovnání hesel:", match);
    if (!match) {
      return res.status(401).json({ message: "Neplatné přihlašovací údaje" });
    }

    res.status(200).json({ message: "Přihlášení úspěšné" });

  } catch (error) {
    console.error("Chyba při přihlášení:", error);
    res.status(500).json({ message: "Interní chyba serveru" });
  }
};
