import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';

dotenv.config()
const SECRET = process.env.SECRET;

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const userProfile = await Profile.findOne({ userId: existingUser?._id });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "1h" });

        res.status(200).json({ existingUser, userProfile, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, bio } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // const userProfile = await Profile.findOne({ userId: existingUser?._id });

        if (existingUser) return res.status(400).json({ message: "User already exist" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" });

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            bio
        });

        const userProfile = await Profile.create({
            userId: newUser._id,
            name: `${firstName} ${lastName}`,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber || null,
            logo: newUser.logo || null
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ newUser, userProfile, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
};