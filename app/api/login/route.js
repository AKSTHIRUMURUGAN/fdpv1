import bcrypt from 'bcryptjs';
import User from '@/models/user';
import connectDB from '@/lib/mongodb';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Connect to the database
connectDB();

// Define the schema for login validation
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// POST handler for the login route
export async function POST(req) {
    const body = await req.json(); // Retrieve the request body
    const { email, password } = body;

    try {
        // Validate the request body using Joi
        const { error } = loginSchema.validate(body);
        if (error) {
            return NextResponse.json({ message: error.details[0].message }, { status: 400 });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // You can generate a token here (JWT or session-based authentication) if needed
        // For example:
        // const token = generateJWT(user._id);
        // Example: Generating JWT (requires jsonwebtoken package)


const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Set expiration time for the token
});
return NextResponse.json({ message: 'Login successful', token }, { status: 200 });

    } catch (error) {
        // Handle server errors
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
