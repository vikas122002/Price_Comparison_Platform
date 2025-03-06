import path from "path";
import express from 'express';
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js'
import { errorHandler ,notFound} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config()
connectDB()
const PORT=process.env.PORT||5000
const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.get("/",(req,res)=>{
//     res.send("Api is running...")
// })
app.use("/api/products",productsRoutes) 
app.use("/api/users",userRoutes)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use("/uploads", express.static(path.join(__dirname, "uploads")))
  app.use(express.static(path.join(__dirname, "/client/dist")))
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  )
} else {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")))
  app.get("/", (req, res) => {
    res.send("Api is running...")
  })
}

app.use(notFound)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})