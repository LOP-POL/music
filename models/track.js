const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    title:{
        type:String,
        required:true
    // },
    // image:{
    //     type:String,
    //     required:false,
    },
    url:{type:String,required:true},
     comments:[{
        name:String,
       body:String,
    }],
    Likes:{type:Number,default:0}
    
},{timestamps:true})

const Track = mongoose.model("Track",trackSchema)
module.exports = Track