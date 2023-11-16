import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Authentication failed", success: false });
      } else {
        req.body._id = decoded.id;

        next();
      }
    });
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(401).send({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default authMiddleware;
