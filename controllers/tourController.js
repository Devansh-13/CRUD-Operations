const fs=require('fs');
const fsPromises=require('fs/promises');

let data=JSON.parse(fs.readFileSync("./data/data.json",{encoding:"utf8"}));

module.exports.getTours = (req, res)=> {
    res.status(200);
    res.json({
      status: 'success',
      body:{
        tours:data
      }
    })
}

module.exports.getTour= (req,res)=>{
  
    const changeObj= req.body;
    const paramId = req.params.id;
    
    try{
      const objToFind=data.find((item,idx)=>{
        if(item.id==paramId){
          return item; 
        }
      })
      if(objToFind==undefined){
        res.status(404);
        return res.send({
          status:"Failed",
          message:"Resource not found"
        })
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
}

module.exports.createTour = (req, res)=> {

    let {id,...newTour}=req.body;

    if(!newTour.name || !newTour.price){
      return res.send({
        status:"failed",
        message:"name and price property must be given."
      })
    }
  
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
    const newTour=req.body;
    const objId=req.params.id;
  
    try{
  
      const objToFind=data.find((item,idx)=>{
      if(item.id==objId){
        return item; 
      }
      })
      if(objToFind==undefined){
        res.status(404);
        return res.send({
          status:"Failed",
          message:"Resource not found"
      })
      }
      const newobj={...objToFind,...newTour};  
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
    catch(error){
      console.error("Error Occured:",error.message);
      res.status(500);
      res.json({ error: 'Internal server error' });
    }
}

module.exports.replaceTour = (req,res)=>{
    const {id,...newTour}=req.body;
    //id alag hojae aur baki sab newTour m ajae
    const objId=req.params.id;
    try{
  
      const objToFind=data.find((item,idx)=>{
      if(item.id==objId){
        return item; 
      }
      })
      if(objToFind==undefined){
        res.status(404);
        return res.send({
          status:"Failed",
          message:"Resource not found"
        })
      }
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
    catch(error){
      console.error("Error Occured:",error.message);
      res.status(500);
      res.json({ error: 'Internal server error' });
    }
}

module.exports.deleteTour=(req,res)=>{
 
    const objId=req.params.id;
    //removing the : from the begining frmo the value of param
    try{
      
      const objToFind=data.findIndex((item,idx)=>{
      if(item.id==objId){
        return idx; 
      }
      })
      if(objToFind==-1){
        res.status(404);
        return res.send({
          status:"Failed",
          message:"Resource not found"
        })
      }
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
    catch(error){
      console.error("Error Occured:",error.message);
      res.status(500);
      res.json({ error: 'Internal server error' });
    }
}





