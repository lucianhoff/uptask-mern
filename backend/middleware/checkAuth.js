import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
const checkAuth = async (req, res, next) => {
    // console.log(req.headers.authorization)
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password -confirmed -updatedAt -createdAt -token -__v')

            // console.log(req.user);
            return next()
        } catch (error) {
            return res.status(404).json({ msg: "Unauthorized" })
        }
    }

    if(!token) {
        const error = new Error("Unauthorized")
        return res.status(404).json({ msg: error.message})
    }

    next()
}

export default checkAuth

