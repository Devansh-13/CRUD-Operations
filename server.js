const app = require('./app');
const mongoose = require('mongoose');

const DATABASE = "mongodb+srv://devansh12_02:<PASSWORD>@cluster0.ylso8me.mongodb.net/<NAME>?retryWrites=true&w=majority&appName=Cluster0"
const DATABASE_NAME = "Test1"
const DATABASE_PASSWORD = "chichore@123"

const DB_URL=DATABASE.replace("<PASSWORD>",DATABASE_PASSWORD).replace("<NAME>",DATABASE_NAME);

mongoose.connect(DB_URL).then((con)=>{
    console.log("---------DATABASE CONNECTED---------");
})
.catch((err)=>{
    console.log(err);
})  //db,connect is also apromise

//for making a entry we need a model and for model we need schema so create a schema 
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name fir the tour is mandatory"],
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    description:String
});

//now we are good to got to create a model it createsa collection

const collections=mongoose.model("Tour",tourSchema)

const testTour=new collections({
    name: 'MIT Tour',
    rating: 4.9,
    price: 13000,
    description: "Have a blast, it can be your last!"

})
testTour.save().then((doc)=>{
    console.log('-------------DOC Created------------');
    console.log(doc);
}).catch((err)=>{
    console.log('ERROR::', err);
})

const PORT = 1400

app.listen(PORT, ()=>{
    console.log("******App listening at 1400*******")
})