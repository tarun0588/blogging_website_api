const jwt = require("jsonwebtoken");

const usermodel = require("../model/usermodel");

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.KEY);

    const tokenData = jwt.decode(token);

    const currentTime = Math.floor(new Date().getTime() / 1000);
    const tokenExpireTime = tokenData.exp;

    if (currentTime > tokenExpireTime) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const user = await usermodel.findById(tokenData.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    req.user = user;
    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
};
module.exports = authMiddleware;