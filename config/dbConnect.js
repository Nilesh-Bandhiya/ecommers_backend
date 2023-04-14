const { default: mongoose } = require("mongoose")

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_Uri)
        console.log("db connected");
    } catch (error) {
        console.log("db connection error", error);
    }
}

module.exports = dbConnect;