import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    })
}


//   const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         const { password: pass, ...rest } = ValidUser._doc;

//         res.status(200).cookie('access_token', token, {
//             httpOnly: true
//         }).json(rest)