import bcrypt from 'bcryptjs';
import User from '@/models/user';
import connectDB from '@/lib/mongodb';
import Joi from 'joi';
import { NextResponse } from 'next/server';

// Connect to the database
connectDB();

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// POST handler for the registration route
export async function POST(req) {
    const body = await req.json(); // Retrieve JSON body
    const { username, email, password } = body;

    try {
        // Validate the request body using Joi
        const { error } = registerSchema.validate(body);
        if (error) {
            return NextResponse.json({ message: error.details[0].message }, { status: 400 });
        }

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user in the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user',
        });

        await newUser.save();

        // Return a success response
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        // Return an error response for server issues
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
