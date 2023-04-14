const { genrerateAccessToken } = require("../config/jwtToken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
    const formData = req.body;
    try {
        const existsUser = await User.findOne({ email: formData?.email })
        if (existsUser) {
            return res.status(400).json({ msg: "User already exists" })
        }
        const newUser = await User.create(formData)
        const { password, ...restData } = newUser._doc
        res.status(200).json({ msg: "User registerd successfully", data: restData })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message })
    }
}

const loginUser = async (req, res) => {
    const formData = req.body;
    try {
        const user = await User.findOne({ email: formData?.email })
        if (user && await user.isPasswordMatched(formData?.password)) {
            const { password, ...restData } = user._doc
            res.status(200).json({ msg: "User logged in successfully", data: restData, token: genrerateAccessToken(user?._id) })
        } else {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({ msg: "users found successfully", data: users })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}