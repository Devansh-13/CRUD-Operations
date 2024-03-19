const express=require("express")
const morgan=require("morgan")
const tourRouter=require("./routes/tourRoutes.js")

const app = express();

//middleware 
app.use(express.json());  
app.use(morgan('dev'));
app.use((req,res,next)=>{
    res.append("Server-time",new Date().toISOString());
    next();
})


app.use("/api/v1/tours",tourRouter);


app.listen(1400,()=>{
    console.log("******App listening at 1400*******")
})

