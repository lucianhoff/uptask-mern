import mongoose from "mongoose";
import bcrypt from "bcrypt"; // middleware for hashing passwords
const userSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    token: { type: String },
    confirmed: { type: Boolean, default: false },
    image: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" },
}, { timestamps: true });

// hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        next()
    }; // if password is not modified, skip the rest of the function

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// new method to unhash password

userSchema.methods.unhashPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User