//PERFORMING A CRUD OPERATION ON 36 STATE AND CAPITAL
//Requiring the dependences
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

//Declear a veriable and create the middleware function
const app = express();
 app.use(express.json());

 const port = process.env.PORT;
//Connecting to port
app.listen(port, ()=>{
    console.log(`Port: ${port} is up and running fine.`)
});


//Creating a veriable for database
const dataBaseUrl = process.env.DATABASE_URL;
//Connectig mongoose to url
mongoose.connect(dataBaseUrl)
.then(()=>{
    console.log('Server is connected to Database.')
})
.catch((e)=>{
    console.log('Server is not connected.', e.message)
});
//Creating a Schema
const nigeriaSchema = new mongoose.Schema({
    State:{
        type:String,
        require: [true, 'State is required']
    },
    Capital:{
        type:String,
        require:[true, 'Capital is required']
    },
    Governor:{
        type:String,
        require:[true, 'Governor is required']
    }
},{timestamps:true});

//Creating the Model
const stateModel = mongoose.model("States",nigeriaSchema)

// C--Create{post} operation
app.post('/StateCap', async(req, res)=>{
    try{
        const data = req.body
        const nigerState = await stateModel.create(data)
        //Check for success
        if(!nigerState){
            res.status(400).json({
                message:'Error creating State and Capital.'
            })
        }else{
            res.status(200).json({
                message:'State and Capital Created successfully.',
                data: nigerState
            })
        }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
   
});

//get all states
app.get('/StateCap', async(req, res)=>{
    try{
        const allState = await stateModel.find();
        if(allState ===0){
            res.status(404).json({
                message:'No State Found'
            })
        }else{
            res.status(200).json({
                message:'Here are all the 36 States in Nigeria',
                data: allState,
                totalNumberOfState: allState.length
            })
        }

    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})
//Get a State
app.get('/StateCap/:id', async(req, res)=>{
    try{
    const stateId = req.params.id
    const oneState = await stateModel.findById(stateId);
    if(!oneState){
        res.status(404).json({
            message:`State with this Id: ${stateId} does not exist.`
        })
    }else{
        res.status(200).json({
            message:`State with this Id: ${stateId} is found.`,
            data: oneState
        })
    }
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
});
//Update  Fields by put
app.put('/StateCap/:id', async(req, res)=>{
    try{
       const stateId = req.params.id
       const stateUpdate = await stateModel.findByIdAndUpdate(stateId, req.body, {new:true, runValidators:true});
       if(!stateUpdate){tyu
        res.status(404).json({
            message:`State with id: ${stateId} is not successfully Updated.`
        })
       }else{
        res.status(200).json({
            message:`State with id: ${stateId} is successfully Updated.`,
            data: stateUpdate 
        })
       }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

});
// Update by Patch(single field)
app.patch('/StateCap/:id', async(req, res)=>{
    try{
        const stateId = req.params.id
        const statePatch = await stateModel.findByIdAndUpdate(stateId, req.body, {new:true});
        if(!statePatch){
            res.status(404).json({
                message: `State with id: ${stateId} is not Updateed successfully.`
            })
        }else{
            res.status(200).json({
                message: `State with id: ${stateId} is Updated successfully.`,
                data: statePatch
            })
        }

    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});
//Delete a State
app.delete('/StateCap/:id', async(req, res)=>{
    try{
       const stateId = req.params.id
       const stateDete = await stateModel.findByIdAndDelete(stateId);
       if(!stateDete) {
        res.status(404).json({
            message:`State with this id: ${stateId} is not Deleted.`
        })
       }else{
        res.status(200).json({
            message:`State with id: ${stateId} is Deleted successfully`,
            data: stateDete
        })
       }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})
