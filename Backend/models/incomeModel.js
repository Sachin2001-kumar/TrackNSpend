const mongoose=require('mongoose');

const IncomeSchema=new mongoose.Schema({
      title:{
        type : String,
        required:true,
        trim:true,
        maxLength:50
      },
      
      amount:{
        type:Number,
        required:true,
        trim:true,
        maxLength:50
      },
      type:{
        type:String,
        default:"income"
     },
      Date:{
        type:Date,
        required:true,
        trim:true
      },
       Category:{
        type : String,
        required:true,
        trim:true
      },
      description:{
        type : String,
        required:true,
        trim:true,
        maxLength:50
      },
},{timestamps:true})

module.exports=mongoose.model("Income",IncomeSchema);