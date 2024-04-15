const express=require('express');
const cors=require('cors');
const { mongo, default: mongoose } = require('mongoose');


const app=express();

app.use(cors());
app.use(express.json());


//schema for login and userlist 
const schemaAut=mongoose.Schema({
    username:String,
    email:String,
    password:String,
},{
    timestamps:true
})


const modelAut=mongoose.model("user",schemaAut)

//schema for adding bank
const schemabank=mongoose.Schema({
    bankname:String,
    bankcode:String,
    accountnumber:String
})

const bankmodel=mongoose.model("bank",schemabank)
//for adding banks
app.get("/getbank",async(req,res)=>{
    const data=await bankmodel.find({});
    res.send({success:true,message:"banks laoded secussfull",data:data})
})


app.post("/createB",async(req,res)=>{
    const data=new bankmodel(req.body);
    await data.save();
    res.send({success:true,message:"banks created successfully",data:data})
})


app.put("/updateB",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body

    const data=await bankmodel.updateOne({_id:_id},rest)
    res.send({success:true,message:"data updated",data:data})
})

app.delete("/deleteB/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await bankmodel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully",data:data})
    console.log(id)
})
const PORT=process.env.PORT || 8080;


//For Login
app.post("/createL",async(req,res)=>{
    console.log(req.body)
    const data= new modelAut(req.body)
    
    await data.save()
    
    res.send({success:true,message:"data saved successfully"})

})

//For users
app.get("/users",async(req,res)=>{
    const data=await modelAut.find({});
    console.log(data);
    res.send({success:true,message:"data fetched successfuly",data:data})
})

//For showing slecting banks
app.get("/banks",async(req,res)=>{
    const data=await bankmodel.find({});
    console.log(data);
    res.send({success:true,message:"data fetched successfuly",data:data})
})



//schema for adding Payee

const Schemapayee=mongoose.Schema({
    sn:Number,
    PayeeName:String
})

const payeemodel=mongoose.model("paye",Schemapayee)





//Schema for savig cheque form
const cheque=mongoose.Schema({
    payeeName:String,
    amount:Number,
    amountInWords:String,
    date:String,
    language:String
})
const modelChe=mongoose.model("che",cheque)




app.post("/saveC",async(req,res)=>{
    const data=new modelChe(req.body);
    await data.save();
    res.send({success:true,mesaage:"Cheque details saved successfully"})
})





//For ADDING PAYEE
//get method
app.get("/getpayee",async(req,res)=>{
    const data=await payeemodel.find({});
    res.send({success:true,message:"payee laoded secussfull",data:data})
})


app.post("/createPayee",async(req,res)=>{
    const data=new payeemodel(req.body);
    await data.save();
    res.send({success:true,message:"payee created successfully",data:data})
})


app.put("/updatePayee",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body

    const data=await payeemodel.updateOne({_id:_id},rest)
    res.send({success:true,message:"Payee updated",data:data})
})

app.delete("/deletePayee/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await payeemodel.deleteOne({_id:id})
    res.send({success:true,message:"Payee deleted successfully",data:data})
    console.log(id)
})












































mongoose.connect("mongodb://localhost:27017/C")
.then(()=>{
    console.log("connect to Db")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))




// const express=require('express');
// const cors=require('cors');

// const mongoose=require('mongoose')


// const app=express()
// app.use(cors());
// app.use(express.json())

// const PORT=process.env.PORT || 8080
// app.get("/",(req,res)=>{
//     res.json({message:"server is on a running"})
// })
// app.post("/createA",async(req,res)=>{
//     console.log(req.body)
//      const data=new modelAut(req.body)
//      await data.save()
//     res.send({success:true,message:"data saved successfully"})
// })

// const schemaAut=mongoose.Schema({
//     username:String,
//     password:String,
// },{
//     timestamps:true
// })


// const modelAut=mongoose.model("user",schemaAut)



// mongoose.connect("mongodb://localhost:27017/tecize")
// .then(()=>{
//     console.log("connect to Db")
//     app.listen(PORT,()=>console.log("server is running"))
// })
// .catch((err)=>console.log(err))
