import express, { Request, Response } from "express"
import cors from "cors"
import { config } from "dotenv"
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
const app = express();

app.use(express.json())
app.use(cors());
config();

app.use("/compiler", compilerRouter)
app.use("/user", userRouter)

dbConnect();
app.listen(3000, ()=>{
    console.log("server connected at port 3000")
})