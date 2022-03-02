import User from "../models/UserModel.js";
import generateToken from "../helpers/generateToken.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegister, emailForgorPassword } from "../helpers/emails.js"

const newUser = async (req, res) => {

    const { email } = req.body

    const userExist = await User.findOne({ email });

    if (userExist) {
        const error = new Error("e-mail already in use");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body)
        user.token = generateToken()


        // nodemailer
        emailRegister({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            token: user.token
        })



        // end nodemailer
        await user.save()
        res.json({ success: true, msg: 'Account created correctly, check your email.' })
    } catch (error) {
        console.log(error)

    }
}

const authenticate = async (req, res) => {

    const { email, password } = req.body

    // exist?

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User does not exist");
        return res.status(400).json({ msg: error.message });
    }

    // confirmed?

    if (!user.confirmed) {
        const error = new Error("Username does not exist");
        return res.status(403).json({ msg: error.message });
    }

    // password match?

    if (await user.unhashPassword(password)) {
        // console.log("password match")
        res.json({
            success: true,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: generateJWT(user._id),
            _id: user._id,
            confirmed: user.confirmed,
            msg: "User authenticated"
        })

    } else {
        const error = new Error("Password does not match");
        return res.status(400).json({ msg: error.message });
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params
    const userConfirm = await User.findOne({ token })

    if (!userConfirm) {
        const error = new Error("Invalid token");
        return res.status(403).json({ msg: error.message });
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = "";
        await userConfirm.save()
        res.json({ success: true, msg: "Account confirmed" })
    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User does not exist");
        return res.status(400).json({ msg: error.message });
    }

    try {
        user.token = generateToken()
        await user.save()

        // nodemailer 

        emailForgorPassword({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            token: user.token
        })

        res.json({ success: true, msg: "Email sent for reset your password!" })
    } catch (error) {
        console.log(error)

    }
}

const forgotPasswordConfirm = async (req, res) => {
    const { token } = req.params

    const validToken = await User.findOne({ token })

    if (validToken) {
        res.json({ success: true, msg: "Token valid and user exist" })
    } else {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }

}

const newPassword = async (req, res) => {
    const { token } = req.params

    const { password } = req.body

    const user = await User.findOne({ token })

    if (user) {
        user.password = password
        user.token = ""
        try {
            await user.save()
            res.json({ success: true, msg: "Password changed" })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }
}

const perfil = async (req, res) => {
    const { user } = req

    res.json(user)
}

export { newUser, authenticate, confirmAccount, forgotPassword, forgotPasswordConfirm, newPassword, perfil }