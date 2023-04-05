const mongoose = require("mongoose");



exports.connectDB = async () => {
    const LOCAL_DB = "mongodb://127.0.0.1:27017/toDoList";
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL || LOCAL_DB, {
            useNewUrlParser: true,
        });

    } catch (err) {
        throw err
    }
       
}

mongoose.connection.once("open", function () {
    console.log("Connected to the Database.");
});
mongoose.connection.on("error", function (error) {
    console.log("Mongoose Connection Error : " + error);
});
