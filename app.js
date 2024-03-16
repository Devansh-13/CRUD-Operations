const fs=require('fs');
const fsPromises=require('fs/promises');
const express=require("express")

let data=JSON.parse(fs.readFileSync("./data/data.json",{encoding:"utf8"}));
// console.log(data);
const app = express()

app.use(express.json());  //middleware 

app.get('/api/v1/tours', function (req, res) {
  res.status(200);
  res.json({
    status: 'success',
    body:{
      tours:data
    }
  })
})

//get a single tour giving its id in the url
app.get("/api/v1/tours/:id",function (req,res){
  // let objId=Object.entries(req);
  
  // let queryObj=Object.fromEntries(objId);
  // const findId=(queryObj.params.id).slice(1);//removing the : from the begining if the value of param
  //method to retrieve the id 
  const changeObj= req.body;
  const paramId = (req.params.id).slice(1);
  // console.log(paramId);
  try{

    const objToFind=data.find((item,idx)=>{
      if(item.id==paramId){
        return item; 
      }
    })
    if(objToFind==undefined){
      throw new Error("Resource not found");
    }
    res.status(200);
    res.json({
      status:"success",
      body:{
        tour:objToFind
      }
    });
    
  }
  catch(error){
    console.error("Error Occured:",error.message);
    res.status(500);
    res.json({ error: 'Internal server error' });
  }
})

app.post('/api/v1/tours', function (req, res) {
  // as in post the req has a body also so use that
  let  newTour=req.body;
  console.log(newTour);

  let total=data.length;
  let newId=data[total-1].id+1;
  const newObj={...newTour,id:newId};

  fsPromises.writeFile("./data/data.json",JSON.stringify([...data,newObj]));

  res.status(201);
  res.send({
    status: 'success',
    body:{
      tours:newObj
    }
  })
})

//patch will change the entries never replace them
//first see if the changing entry is present or not
//use try and catch
app.patch("/api/v1/tours/:id",function (req,res){
  const newTour=req.body;
  const objId=req.params.id.slice(1);

  //removing the : from the begining if the value of param
  console.log(objId,newTour);
  try{

    const objToFind=data.find((item,idx)=>{
    if(item.id==objId){
      return item; 
    }
    })
    if(objToFind==undefined){
      throw new Error("Resource not found");
    }
    //change the object accordingly
    const newobj={...objToFind,...newTour};
    console.log(newobj);

    const newData=data.map((item)=>{
      if(item.id==objId){
        return newobj;
      }
      else {
        return item;
      }
    })
    fsPromises.writeFile("./data/data.json",JSON.stringify(newData));
    res.status(200);
    res.json({
      status:"Resuurce updated successfully",
      body:{
        tour:newobj
      }
    });
    
  }
  catch(error){
    console.error("Error Occured:",error.message);
    res.status(500);
    res.json({ error: 'Internal server error' });
  }
})

//put i need to replace the whole object with my new one

app.put("/api/v1/tours/:id",function (req,res){
  const newTour=req.body;
  const objId=req.params.id.slice(1);

  //removing the : from the begining if the value of param
  console.log(objId,newTour);
  try{

    const objToFind=data.find((item,idx)=>{
    if(item.id==objId){
      return item; 
    }
    })
    if(objToFind==undefined){
      res.status(404);
      throw new Error("Resource not found");
    }
    //replace the object accordingly
  
    const newData=data.map((item)=>{
      if(item.id==objId){
        return newTour;
      }
      else {
        return item;
      }
    })
    fsPromises.writeFile("./data/data.json",JSON.stringify(newData));
    res.status(200);
    res.json({
      status:"Resource replaced successfully",
      body:{
        tour:newTour
      }
    });
    
  }
  catch(error){
    console.error("Error Occured:",error.message);
    res.status(500);
    res.json({ error: 'Internal server error' });
  }
})

//delete 
app.delete("/api/v1/tours/:id",function (req,res){
 
  const objId=req.params.id.slice(1);
  //removing the : from the begining frmo the value of param

  console.log(objId);
  try{

    const objToFind=data.find((item,idx)=>{
    if(item.id==objId){
      return item; 
    }
    })
    if(objToFind==undefined){
      res.status(404);
      throw new Error("Resource already not present");
    }
    //delete the object accordingly
  
    let newData=data.map((item)=>{
      if(item.id==objId){
        return undefined;
      }
      else {
        return item;
      }
    })
    newData=newData.filter((item)=>{
      if(item==undefined){
        return false;
      }
      else {
        return true;
      }
    })

    fsPromises.writeFile("./data/data.json",JSON.stringify(newData));
    res.status(200);
    res.json({
      status:"Resurce deleted successfully",
      body:{
        tour:{}
      }
    });
    
  }
  catch(error){
    console.error("Error Occured:",error.message);
    res.status(500);
    res.json({ error: 'Internal server error' });
  }
})



app.listen(1400,()=>{
    console.log("******App listening at 1400*******")
})

