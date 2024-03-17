const express=require("express")
const tourContoller=require("../controllers/tourController.js")

const app = express();

const tourRouter=express.Router();

tourRouter
    .route('/')
    .get(tourContoller.getTours)
    .post(tourContoller.createTour)

tourRouter  
    .route('/:id')
    .get(tourContoller.getTour)
    .patch(tourContoller.updateTour)
    .put(tourContoller.replaceTour)
    .delete(tourContoller.deleteTour)

module.exports=tourRouter;