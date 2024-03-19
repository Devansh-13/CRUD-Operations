const express=require("express")
const tourContoller=require("../controllers/tourController.js")

const app = express();

const tourRouter=express.Router();

tourRouter
    .route('/')
    .get(tourContoller.getTours)
    .post(tourContoller.checkRequestBody,tourContoller.createTour)  //chaining

tourRouter.param('id',tourContoller.checkID);

tourRouter  
    .route('/:id')
    .get(tourContoller.getTour)
    .patch(tourContoller.updateTour)
    .put(tourContoller.replaceTour)
    .delete(tourContoller.deleteTour)

module.exports=tourRouter;