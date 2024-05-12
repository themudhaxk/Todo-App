import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Utils
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";


dotenv.config();
const app = express();

connectDB()

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Error Middleware
app.use(errorHandler);


// Routes
app.use("/api/users", userRoute);
app.use("/api/todo", todoRoute);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ❤️`);
});
