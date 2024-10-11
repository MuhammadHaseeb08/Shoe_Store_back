const Program= new mongoose.model("Program",data)
const firstProgram= new Program({
  name:"haseeb",
  programs:[1,2]
})
firstProgram.save()
let savingData=async()=>{
  try {
    const secondProgram= new Program({
      name:"second",
      programs:[2,1]
    })

    let created= await secondProgram.save()
    // console.log(created);
  } catch (error) {
    console.log(error);
  }
}
savingData()



let sortingData=async()=>{
  let result= await Program.find({$or:[{name:"haseeb"}]})
  console.log(result);
}
sortingData()

// app.get("/main",async(req,res)=>{
//   let pArray= await Program.find()
//   console.log(pArray);
//   res.json(pArray)
// })

app.post("/create",async(req,res)=>{
console.log(req.body);
// await Program.insert(req.body)
let founded= new Program(req.body)
await founded.save()
// Program.insertMany([])
// .find().select({name:1}).limit(1)
// select=> to show only one field
// limit=> to limit you result

})
app.get("/receiving",async(req,res)=>{
  // let founded=  await Program.find().limit(1)
let founded=  await Program.find()
// console.log(founded);
res.json({founded})


})

app.put("/update/:id",async(req,res)=>{
let id=req.params.id
// let founded=  await Program.findOne({_id:id})
let founded= await Program.updateOne({_id:id},{$set:{name:req.body.nyaName, }})
// console.log(founded);
})
// app.get(".sdf",()=>{})

app.delete("/delete/:id",async(req,res)=>{
let id=req.params.id
let founded= await Program.deleteMany({_id:id})
console.log(founded);

// deleteOne
})
