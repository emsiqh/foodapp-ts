import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
// import Profile from '../models/profileModel.js';

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, bio } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // const userProfile = await Profile.findOne({ userId: existingUser?._id })

        if (existingUser) return res.status(400).json({ message: "User already exist" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" });

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            bio
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            'YOUR_SECRET_KEY',
            { expiresIn: "1h" }
        );

        // res.status(200).json({ result, userProfile, token });
        res.status(200).json({ result: newUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
};