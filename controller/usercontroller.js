const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = require("../model/usermodel");

const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newlyInsertUser = await userSchema.create({
      ...req.body,
      password: hashPassword,
    });
    res.json({
      success:true,
      message: "Registration completed, please login to continue",
    });
  } catch {
    res.json({
      success:false,
      message: "Something went wrong",
    });
  }
};

const logIn = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const currentTime = Math.floor(new Date().getTime() / 1000);
    const expirytime = currentTime + 3600;

    const jwtPayload = {
      userId: user._id,
      mobileNo: user.mobileNo,
      exp: expirytime,
    };

    const token = jwt.sign(jwtPayload, process.env.KEY);

    const data = await userSchema.findByIdAndUpdate(user._id, {
      $set: { token },
    });

    res.json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
  const logout = async (req,res)=>{
    try{
      const userId = req.user._id
      const user = await userSchema.findByIdAndUpdate(userId,{
        $unset:{token:"-"}
      });
      if(!user){
      res.json({
        success: false,
        message:"User not found"
        });
      }
      res.json({
        success:true,
        message:"Logout successful"
        });
    }catch(err){
      res.json({
        success:false,
        message:"An error occurred while logging out the user",
        error:err.message
        });
    }
  }

const userController = {
  signUp,
  logIn,
  logout
};

module.exports = userController;