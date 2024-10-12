const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary=require("cloudinary")
require('dotenv').config()
const app = express();
app.use(express.json());
app.listen(4000, () => {
  console.log("Server is working continously");
});


mongoose
  .connect("mongodb+srv://haseebshabir31:rEK1OvUc61v4s35u@cluster0.mi75x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db working");
  })
  .catch((e) => {
    e
  });

const data = new mongoose.Schema({
  category: String,
  name: String,
  imageName: String,
  price: Number,
  total: Number,
  qty: Number,
  size:Number
});
const Product = new mongoose.model("Product", data);
const CartProduct = new mongoose.model("CartProduct", data);


 


app.get("/getData",async(req,res)=>{
  let founded= await Product.find()
  // console.log(founded);
  res.json({founded})

})
app.get("/getCart",async(req,res)=>{
  let founded= await CartProduct.find()
  // console.log(founded);
  res.json({founded})

})
app.put("/editQty/:id",async(req,res)=>{
  let id= req.params.id
  let founded= await Product.find({_id:id})
  founded.qty=req.body.nqty
  founded.total=req.body.total
  // console.log(founded);
  res.json({
  success:true
  })
})

app.post("/addCart",async(req,res)=>{
 
  // let founded=req.body

  let find= await CartProduct.find({_id:req.body._id})
  console.log(find);

  if (find.length==0) {
  
    let founded= new CartProduct(req.body)
    let carted= await founded.save()
    // console.log(carted);
     res.json({
       success:true
     })
  }else{
    res.json({
      success:false
    })
  }
          

  // console.log( req.body);
 
})
app.delete("/delete/:id",async(req,res)=>{
 
  let id= req.params.id
  let founded= await CartProduct.deleteMany({_id:id})
  res.json({
    success:true
  })
})
app.post("/sendMail",async(req,res)=>{
console.log(req.body);


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
   
    secure: false, // true for 465, false for other ports
    auth: {
      user: "makenna70@ethereal.email", // generated ethereal user
      pass:  'q3BDJucrrcVaAzhgXj', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.email,// sender address
    to: "Haseeb, Haseeb31@gmail.com", // list of receivers
    subject: "Visited site", // Subject line
    text: "hello i just visited your site and it was fabulous", // plain text body
    html: "<b>hello i just visited your site and it was fabulous</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 


})
