const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
     try {
      if (req.cookies.jwt) {
        //le token pour l'instant inclut "Bearer token", on veut récupérer après l'espace ' ', le token qui est en 2eme [1]
        const token = req.cookies.jwt;
        //décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        next();
      } else {
         res.clearCookie();
         console.status(401).json({ message: "Unauthorized" })
      }
     } catch(error) {
        res.status(401).json({ message: "Unauthorized" });
     };
};