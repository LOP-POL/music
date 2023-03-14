//Imports
const Track = require("../models/track.js");


//Functions
const music_index = (req,res) =>{
   
    Track.find().sort({createdAt:-1})
    .then((result)=>{
        tracksExp = result
        res.render("dash",{tracks:result})
    })
    .catch((err)=>{console.log(err)})    
}


const music_favs = (req,res) =>{
    res.render("favourites")
}

const music_upload = (req,res) =>{
    res.render("upload")
}

const music_delete = (req,res) =>{
    res.render("404")
}



module.exports = {
    music_index,
    music_favs,
    music_upload,
    music_delete,


}

