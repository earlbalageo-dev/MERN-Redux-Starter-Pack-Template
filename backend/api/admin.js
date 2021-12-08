import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

//@desc      Get all users from the DataBase
//@route     GET /v1/api/admin/get-all-users
//@access    Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc      Get Single User By ID
//@route     GET /v1/api/admin/user/:id
//@access    Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc      Update User By ID
//@route     PUT /v1/api/admin/user/:id
//@access    Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const {
      newEmail,
      newFirstName,
      newLastName,
      newPassword,
      setEmailConfirm,
      setAdmin,
    } = req.body;
    console.log(user);

    user.email = newEmail || user.email;
    user.firstName = newFirstName || user.firstName;
    user.lastName = newLastName || user.lastName;
    user.password = newPassword || user.password;
    user.isEmailConfirm = setEmailConfirm || user.isEmailConfirm;
    user.isAdmin = setAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      isEmailConfirm: updatedUser.isEmailConfirm,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Delete user
// @route   DELETE /v1/api/admin/user/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User Has Been DELETED" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { getAllUsers, getUserById, updateUserById, deleteUserById };
