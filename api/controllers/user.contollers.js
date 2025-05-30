import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: "This is user.Model.Controllers" })
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this user"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User has been Deleted' });
    } catch (error) {
        next(error)
    }
}

export const signout = (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('user has been signed out')
    } catch (error) {
        next(error)
    }
}

// Here we are saving the cookie and then getting it 

//   const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         const { password: pass, ...rest } = ValidUser._doc;

//         res.status(200).cookie('access_token', token, {
//             httpOnly: true
//         }).json(rest)



