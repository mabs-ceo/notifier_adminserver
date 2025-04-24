const express = require('express');
const { registerUser } = require('../controller/User.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/register',isAuthenticated,registerUser)
router.get('/status', isAuthenticated,(req, res) => {
console.log('status')
    if (req.session.user.id && req.isAuthenticated()) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "User authenticated.",
        user: req.user
      });
    } else {
      res.status(401).json({
        status: "fail",
        code: 401,
        message: "Unauthorized. Authentication required."
      });
    }
  });

module.exports = router;