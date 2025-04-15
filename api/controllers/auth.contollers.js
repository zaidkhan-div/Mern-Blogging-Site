import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password || username === "" || email === '' || password === '') {
        return res.status(400).json({ message: "All filed required" });
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
        res.status(500).json({ message: error.message })
    }
}