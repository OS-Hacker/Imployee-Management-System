const cloudinary = require("cloudinary").v2;
const userModel = require("../models/users");

// Configure Cloudinary (use environment variables for security)
cloudinary.config({
  cloud_name: "dlxznnxsv",
  api_key: "432283578868661",
  api_secret: "bW942yN0YeNrgKYSAwKu-sPix5o",
});

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath);
};

// Helper function to delete image from Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

// Create User
const createUserController = async (req, res) => {
  try {
    const { name, age, email, number, department } = req.fields;
    const { profileImage } = req.files;

    // Validate required fields
    if (!name || !age || !email || !number || !profileImage || !department) {
      return res.status(400).send({
        success: false,
        msg: "All fields are required",
      });
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadImageToCloudinary(profileImage.path);

    // Create user in the database
    const user = await userModel.create({
      name,
      age,
      email,
      number,
      department,
      profileImage: cloudinaryResult.secure_url,
      cloudinary_id: cloudinaryResult.public_id,
    });

    res.status(201).send({
      success: true,
      msg: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "Error creating user",
      error,
    });
  }
};

// Search and Pagination
const SearchAndPaginationController = async (req, res) => {
  try {
    const { search, page = 1, per_page = 10 } = req.query;

    // Validate pagination values
    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(per_page, 10);

    if (pageNumber <= 0 || perPageNumber <= 0) {
      return res.status(400).send({
        success: false,
        msg: "Invalid page or per_page values",
      });
    }

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") }, // Case-insensitive search for name
        { email: new RegExp(search, "i") }, // Case-insensitive search for email
        { department: new RegExp(search, "i") }, // Case-insensitive search for email
      ];

      // Add numeric search for age and number
      if (!isNaN(search)) {
        const searchNumber = parseFloat(search);
        query.$or.push(
          { age: searchNumber }, // Search for age as a number
          { number: searchNumber } // Search for number as a number
        );
      }
    }

    // Fetch users with pagination
    const totalUsers = await userModel.countDocuments(query);
    const users = await userModel
      .find(query)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber)
      .sort({ updatedAt: -1 });

    res.status(200).send({
      success: true,
      msg: users.length ? "Users fetched successfully" : "No users found",
      users,
      pagination: {
        totalUsers,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalUsers / perPageNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({
      success: false,
      msg: "Error fetching users",
      error, // Use error.message instead of error.msg
    });
  }
};

// Get Single User
const getSingleUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      msg: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "Error fetching user",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, age, email, number, department } = req.fields;
    const { profileImage } = req.files;

    console.log(name, age, email, number, department);
    console.log(profileImage);

    // Validate required fields
    if (!name || !age || !email || !number || !department) {
      return res.status(400).send({
        success: false,
        msg: "All fields are required",
      });
    }

    // Fetch the existing user
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    let cloudinaryResult = null;

    if (profileImage) {
      // Delete old image from Cloudinary
      if (user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }

      // Upload new image to Cloudinary
      cloudinaryResult = await cloudinary.uploader.upload(profileImage.path);
    }

    // Prepare updated data
    const updatedData = {
      name,
      age,
      email,
      number,
      department,
      profileImage: cloudinaryResult
        ? cloudinaryResult.secure_url
        : user.profileImage,
      cloudinary_id: cloudinaryResult
        ? cloudinaryResult.public_id
        : user.cloudinary_id,
      updatedAt: new Date(),
    };

    // Update user in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).send({
      success: true,
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "Error updating user",
      error,
    });
  }
};

// Delete User
const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    // Delete image from Cloudinary
    await deleteImageFromCloudinary(user.cloudinary_id);

    res.status(200).send({
      success: true,
      msg: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "Error deleting user",
      error,
    });
  }
};

module.exports = {
  createUserController,
  SearchAndPaginationController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
};
