const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(User.createStrategy());
const { createTokenAndSaveCookie } = require("../jwt/generateToken");

exports.signup = async function(req, res) {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({ fullname, email });
    await User.register(newUser, password);

    // If user is created successfully
    createTokenAndSaveCookie(newUser._id, res);
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      }
    });
    
  } catch (err) {
    console.error('Error during signup:', err.message);
    return res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

exports.login = async function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) { 
      let message = "Invalid email or password"; // Default error message
      
      // Check the info object for specific error messages from Passport
      if (info && info.message) {
        if (info.message === "Missing credentials") {
          message = "Please provide both email and password.";
        } else if (info.message === "Incorrect password") {
          message = "The password you entered is incorrect.";
        } else if (info.message === "No user found with this email") {
          message = "No account found with this email address.";
        }
      }

      return res.status(401).json({ error: message });
    }
    
    req.logIn(user, function(err) {
      if (err) { 
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Assuming `createTokenAndSaveCookie` is a function to handle JWT token creation
      createTokenAndSaveCookie(user._id, res); 

      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    });
  })(req, res, next);  // Call the middleware with the correct params
};


exports.logout = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "User Logged out!" });
  });
};


exports.allUsers = async function(req, res) {
  try {
    const loggedInUser = req.user._id; // Get logged in user's ID
    // Fetch all users except the logged in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(200).json(filteredUsers);

  } catch (err) {
    console.error("Error in allUsers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
