const express = require("express");
const {
  create,
  signIn,
  dashboard,
  logout,
  fetchBalanceData,
  fetchPersonalData,
  fetchClinicalAnalysis,
  recovery,
  memoriseButtons ,
} = require("../controllers/user");
const {
  validate,
  signInValidator,
} = require("../middlewares/validator");
const isAuth = require("../middlewares/is-auth");
const router = express.Router();


router.get("/recovery", recovery);

router.post("/memoriseButtons", memoriseButtons );


router.post("/create", 
    create
); 

router.post("/sign-in",
  signInValidator, validate, signIn); 


router.get("/dashboard", dashboard);


router.get("/logout",logout);


router.post('/fetchBalanceData', fetchBalanceData);
router.post('/fetchPersonalData', fetchPersonalData);
router.post('/fetchClinicalAnalysis', fetchClinicalAnalysis);

module.exports = router;
