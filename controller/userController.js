const Hoteldb = require("../model/hotelModel");
const asyncHandler = require("express-async-handler");
//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    fullname,
    phone,

    formattedCheckIn,
    formattedCheckOut,
    totalAdults,
    totalKids,
  } = req.body;
  if (!fullname || !phone) {
    res.json("Please enter all field");
  }
  // Check if user exist
  const duplicate = await Hoteldb.findOne({ phone });
  if (duplicate) {
    res.json("User already exist");
  }

  //Create user
  const user = await Hoteldb.create({
    fullname,
    phone,

    totalAdults,
    totalKids,
    formattedCheckIn,
    formattedCheckOut,
  });
  if (user) {
    res.json({
      _id: user.id,
      fullname: ` Successful.Thanks for choosing Adina hotel ${user.fullname}`,
      phone: user.phone,
    });
  } else {
    res.json("invalid user data");
  }
});

//@desc Aunthenticate a new user
//@route POST /api/users/login
//@access Public
// const loginUser = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   //This will check for user email in the db
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.json("Invalid credentials");
//   }
// });

//@desc Register new user
//@route GET /api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
//To delete user from database
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Hoteldb.findById(req.params.id);

  if (!user) {
    res.json("User data to be deleted not found");
  }

  await user.remove();

  res.json({ message: `Delete with id: ${req.params.id}` });
});

module.exports = { registerUser, getUser, deleteUser };
