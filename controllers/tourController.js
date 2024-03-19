const fs=require('fs');
const fsPromises=require('fs/promises');

let data=JSON.parse(fs.readFileSync("./data/data.json",{encoding:"utf8"}));

module.exports.checkID = (req, res, next, val) => {
  let resourceIndex = data.findIndex(({id})=> id==val);

  if(resourceIndex==-1){
      res.status(404);
      return res.send({
          status: 'fail',
          message: 'Invalid request id'
      });
  }

  next();
}

module.exports.checkRequestBody = (req, res, next) =>{
  const {id: redID, ...newTour} = req.body;
  if(!newTour.name || !newTour.price){
    res.status(400);
    return res.send({
      status:"failed",
      message:"name and price property must be given."
    })
  }

  next();
}

module.exports.getTours = (req, res)=> {
    res.status(200);
    res.json({
      status: 'success',
      results:data.length,
      body:{
        tours:data
      }
    });
}

module.exports.getTour= (req,res)=>{
    const paramId = req.params.id;
    let objIndex=data.findIndex((obj)=>obj.id==paramId);
    const obj=data[objIndex];
    
    res.status(200);
    res.send({
      status:"success",
      body:{
        tour:obj
      }
    });
    
}
   


module.exports.createTour = (req, res)=> {

    let {id,...newTour}=req.body;
  
    let total=data.length;
    let newId=data[total-1].id+1;
    const newObj={id:newId,...newTour};
  
    fsPromises.writeFile("./data/data.json",JSON.stringify([...data,newObj]));
  
    res.status(201);
    res.send({
      status: 'success',
      body:{
        tours:newObj
      }
    })
}

module.exports.updateTour = (req,res)=>{
    const {id:redId,...newTour}=req.body;
    const objId=req.params.id;
     
    let objIndex= data.findIndex((obj)=>obj.id==objId);
    const obj=data[objIndex];
  
    const newobj={...obj,...newTour};  
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
      status:"Resource updated successfully",
      body:{
        tour:newobj
      }
    });
      
  }
  

module.exports.replaceTour = (req,res)=>{
    const {id,...newTour}=req.body;
    const objId=req.params.id;
    
      //replace the object accordingly
    
    const newData=data.map((item)=>{
      if(item.id==objId){
        return {id:objId,...newTour};
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
        tour:{id:objId,...newTour}
      }
    });
      
  }
    

module.exports.deleteTour=(req,res)=>{
 
    const objId=req.params.id;
    //removing the : from the begining frmo the value of param
    
      
    const objToFind=data.findIndex((item)=>item.id==objId);
    
    //delete the object accordingly
    //map then filter the undefined or
    data.splice(objToFind,1);

    fsPromises.writeFile("./data/data.json",JSON.stringify(data));
    res.status(200);
    res.json({
      status:"Resource deleted successfully",
      body:{
        tour:null
      }
    });
    
}





