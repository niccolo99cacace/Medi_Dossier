const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
dataClinicalAnalysisButton:{
  type:Boolean,
},
tbw:{
  type:Boolean,
},
ffm:{
  type:Boolean,
},
xcAndFmLevel:{
  type:Boolean,
},
heartRespRate:{
  type:Boolean,
},
dataTable:{
  type:Boolean,
},
bunChart:{
  type:Boolean,
},
bMIChart:{
  type:Boolean,
},
searchForm:{
  type:String,
},


});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("User", userSchema);
