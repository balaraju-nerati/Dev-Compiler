import mongoose from "mongoose"

export const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "Dev-Compiler",
        });
        console.log("Database connection successfull")
    } catch (error) {
        console.log("Error connecting Database", error)
    }
}