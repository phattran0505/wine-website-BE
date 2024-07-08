import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // check token
  if (token) {
    const accessToken = token.split(" ")[1];
    // if token is exist => verify token
    jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "token is invalid"});
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({
        success: false,
        message: "You're not authenticated. Please sign in !!",
      });
  }
};
