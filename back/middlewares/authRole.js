require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const authRole = (role) => (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const arrayRole = Array.isArray(role);

  if (token) {
    
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        res.status(401).json(err);
      } else {
        if ( !arrayRole && payload.role === role) {
          req.user = payload;
          console.log(payload)          
          next();
        } else if (arrayRole && role.some((ar) => ar === payload.role)) {
          req.user = payload;
          console.log(payload)          
          next();
        } else {
          res.status(403).json({
            message: "You're not allowed to access this",
          });
        }
      }
    });
  } else {
    res.status(401).json({ message: " No token" });
  }
  
};

module.exports = authRole;
