const express = require('express');
const passport = require('../configs/Passport');
const router = express.Router();
const FRONTEND_URL = process.env.CLIENT_URL ;
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', {
        // failureRedirect: 'http://localhost:5173/join', // custom redirect if no user found
        failureRedirect: `${FRONTEND_URL}/join`, // custom redirect if no user found
        failureMessage: true
      }),
      (req, res) => {
        // Success: user exists
      
        req.session.user={id:req.user._id}
      
        res.redirect(`${FRONTEND_URL}/dashboard`); // your React dashboard
        // res.redirect('https://admin-kappa-pied-76.vercel.app/dashboard'); // your React dashboard
      //  res.status(200).json({status:"success",code:200,message:'User logged in.'}) // your React dashboard
      }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.status(201).json({ status:'success',code:201,message: 'Logged out' });
  });
});



module.exports = router;
