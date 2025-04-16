import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password || username === "" || email === '' || password === '') {
        return next(errorHandler(400, "All field are required"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10) //await bcryptjs.hash(password, 10)

    const newUser = new User({
        username,
        email, // after ES6 we keep the key and value same 
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.json("Signup succesfully")
    } catch (error) {
        // res.status(500).json({ message: error.message })
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'))
    }

    try {
        const ValidUser = await User.findOne({ email });

        if (!ValidUser) {
            return next(errorHandler(404, 'User not found'))
        }

        const ValidPassword = bcryptjs.compareSync(password, ValidUser.password);
        if (!ValidPassword) {
            return next(errorHandler(404, 'Invalid password'))
        }

        const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(ValidUser)



    } catch (error) {
        next(error)
    }

}