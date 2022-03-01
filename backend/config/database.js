import mongoose from "mongoose";

const db = async () => {
    try {
        let database = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        })

        const url = `${database.connection.host}:${database.connection.port}`;
        console.log(`MongoDB connected to ${url}`);
    } catch (err) {
        console.log(err);
    }
}

export default db;