const express=require("express")

let tourContoller=require("./Controllers/tourController.js")

const app = express()

app.use(express.json());  //middleware 

app.get('/api/v1/tours', tourContoller.getTours)

app.get("/api/v1/tours/:id",tourContoller.getTour)

app.post('/api/v1/tours',tourContoller.createTour )

app.patch("/api/v1/tours/:id",tourContoller.updateTour
)

app.put("/api/v1/tours/:id",tourContoller.replaceTour)

app.delete("/api/v1/tours/:id",tourContoller.deleteTour)

app.listen(1400,()=>{
    console.log("******App listening at 1400*******")
})

