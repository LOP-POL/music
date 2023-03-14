const Track = require("../models/track.js");
const fs = require("fs");


var detail_detail = {}
const music_details = (req,res) => {
    const id = req.params.id
    console.log(id)
    Track.findById(id)
    .then((result)=>{
        detail_detail = result 
        var tracks  
        Track.find().sort({createdAt:1})
        .then((tracksDB)=>{
            console.log(typeof(tracksDB))
           var result1 = tracksDB.filter(item =>  item._id != id)
           tracks = result1
           console.log(typeof(result1))
           res.render("details",{result,tracks:tracks})
        })
        .catch(err=>{console.log(err)})
            
      })
      
        .catch( err=>{
            console.log(err)
            
    })
    
}

const music_details_audio = (req,res)=>{
    
    const stream = fs.createReadStream(detail_detail.url)
    stream.pipe(res)
    
}
const music_likes =(req,res)=>{
    const id  = req.params.id
    if(detail_detail.id === id){
        console.log("updated")
        var update=detail_detail.Likes
        update++
        console.log(update)
        Track.findByIdAndUpdate(id,{Likes:update},(err,doc)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(doc)
            res.json({data:doc.Likes})
        }
       
    })
    }
    else{
        res.json({data:1})
        console.log("not updated")
    }
    
    
}
const new_comment = (req,res)=>{
    console.log(req.body)
    
    if(detail_detail.id){
        console.log("added new comment")
       console.log(detail_detail.comments) 
        
        // If i ever wanna limit the number of comments
        Track.findById(detail_detail.id,(err,doc)=>{
                if(err){console.log(err)}
                else{
                    console.log(doc)
                    doc.comments.push(req.body)
                    doc.save()
                    .then(result=>res.redirect(`/dash/${detail_detail.id}`))
                    .catch(err=>{console.log(err); console.log("Saving failed")})
                    
                }
        }
        )
    }
      else{
        res.redirect(`/dash/${detail_detail.id}`)
        res.json({data:2})
        console.log("not updated")
    }
}

module.exports = {
    music_details,
    music_details_audio,
    music_likes,
    detail_detail,
    new_comment
}