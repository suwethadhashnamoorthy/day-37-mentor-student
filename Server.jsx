//All Requirement;
const express = require("express");
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const Tesla = express();
const URL = process.env.URL;
const DB = "SpaceX";

//Middleware;
Tesla.use(express.json()); 
require("dotenv").config();

//Working Conform;
Tesla.get("/",function(req,res){
    res.send('<h1>Welcome! Guys</h1>');
})

//Create Teacher POST Method;
Tesla.post("/Mentor",async function(req,res){

    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        await db.collection("Falcon").insertOne(req.body);

        //5) Close the connection;
        await connection.close()

        //Status Report;
        res.status(200).json({Message:"Mentor is Created Done"});

    } catch (error) {

        //Error message;
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
})



//Get All Mentors GET Method;
Tesla.get("/Mentor-all",async function(req,res){

    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const Mentors =  await db.collection("Falcon").find({},{"_id":1,"Mentor_name":1,"Class_spl":0,"Age":0,"Students":1,"Rating":0,"Award":0,"Spl_Talent":0}).toArray();

        //5) Close the connection;
        await connection.close()

        //Status Report;
        res.status(200).json(Mentors);

    } catch (error) {

        //Error message;
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
})




//Create Student POST Method;
Tesla.post("/Student",async function(req,res){

    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB); 

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        await db.collection("Students").insertOne(req.body);

        //5) Close the connection;
        await connection.close();

        //Status Report
        res.status(200).json({Message:"Student create Done"});

    } catch (error) {

        //Error message;
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})


//Get All Student's GET Method;
Tesla.get("/Students-all",async function(req,res){

    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB); 

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const Students =await db.collection("Students").find().toArray();

        //5) Close the connection;
        await connection.close();

        //Status Report
        res.status(200).json(Students);

    } catch (error) {

        //Error message;
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})

//Assign Mentor to student PUT method;
Tesla.put("/Assign_Mentor/:id",async function(req,res){
    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const edit = await db.collection("Students").findOneAndUpdate({_id:mongoDB.ObjectId(req.params.id)},{$set:req.body});

        //5) Close the connection;
        await connection.close()

        res.json(edit)
    } catch (error) {
        
        //Error Message;
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})



//Assign Student to Mentor PUT method;
Tesla.put("/Assign_student/:id",async function(req,res){
    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const edit = await db.collection("Falcon").findOneAndUpdate({_id:mongoDB.ObjectId(req.params.id)},{$set:req.body});

        //5) Close the connection;
        await connection.close()

        res.json(edit)
    } catch (error) {
        
        //Error Message;
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})



//Show All student's of particular mentor;
Tesla.get("/Mentor/:id",async function(req,res){
    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const mentor = await db.collection("Falcon").findOne({_id:mongoDB.ObjectId(req.params.id)});

        //5) Close the connection;
        await connection.close()

        //Status Report
        res.status(200).json(mentor);

    } catch (error) {
        
        //Error Message
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
})


//Show All student's of particular student;
Tesla.get("/Student/:id",async function(req,res){
    try {
        //1) Create a connection for Node.js to MongoDB;
        const connection = await mongoClient.connect(URL);

        //2) Select a Particular DB;
        const db = connection.db(DB);

        //3) Select a Specific Collection;
        //4) Make a DATA method or operation(C.R.E.D);
        const mentor = await db.collection("Students").findOne({_id:mongoDB.ObjectId(req.params.id)});

        //5) Close the connection;
        await connection.close()

        //Status Report
        res.status(200).json(mentor);

    } catch (error) {
        
        //Error Message
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
})

//Working Port;
Tesla.listen( process.env.PORT ||5000);