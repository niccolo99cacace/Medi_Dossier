const User = require("../models/user");
const { sendError } = require("../utils/helper");
const axios = require("axios");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, "This email is already in use!");

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({
    message: "User added!",
  });
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");


  req.session.isAuth = true;
  req.session.name = user.name;
  req.session.idUser = user.id;


  res.json({user:user.name});
};


exports.recovery = async (req, res, next) => {
  const id = req.session.idUser;

  const user = await User.findOne({ _id : id });

  res.json({user:user});
};



exports.memoriseButtons = async (req, res, next) => {


const buttonsData = req.body;  

User.findByIdAndUpdate('63c85ecea9c4167f99f8469b', buttonsData , { new: true }, (err, doc) => {
  if (err) {
    console.log(err);
  } else {
    console.log(doc);
  }
});

res.json(buttonsData);
};                     



exports.dashboard = async (req, res, next) => {
  if (req.session.isAuth) {
    res.json({ ok: "ok" });
  } else {
    return sendError(res, "You need to login!");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ ok: "logout effettuato" });
  });
};

const username = "j.parker@meddoctor.org";
const password = "DocJParker";

const auth = {
  username,
  password,
};

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

exports.fetchBalanceData = (req, res) => {
  const { key } = req.body;
  const url = "http://141.95.111.168:8080/media/v1/balance/";
  const urlCompleto = url + key;

  axios
    .get(urlCompleto, { auth, headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(urlCompleto);
      res.send(error);
    });
};

exports.fetchPersonalData = (req, res) => {
  const { key } = req.body;
  const url = "http://141.95.111.168:8080/media/v1/patients/";
  const urlCompleto = url + key;

  axios
    .get(urlCompleto, { auth, headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(urlCompleto);
      res.send(error);
    });
};

exports.fetchClinicalAnalysis = (req, res) => {
  const { key } = req.body;
  const url = "http://141.95.111.168:8080/media/v1/complex/basic/";
  const urlCompleto = url + key;

  axios
    .get(urlCompleto, { auth, headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(urlCompleto);
      res.send(error);
    });
};
