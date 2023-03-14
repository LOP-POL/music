const express =  require("express");
const { result } = require("lodash");
const morgan = require("morgan")

const dashRoutes = require("./routes/dashRoutes")
const mongoose = require("mongoose")
const Track = require("./models/track")
const fs = require("fs")
const fse = require("fs-extra")



const app = express();

//connect to mongo 
const dbURI = "mongodb+srv://net-Ninja:ferrari458@cluster0.wdf9sv1.mongodb.net/tracks?retryWrites=true&w=majority"
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))


// register view engine

app.set("view engine","ejs")

//static files
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))





app.get("/refresh",(req,res)=>{
    // fs.readdir("./music-dex",(err,files)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //        const songTitles = [...files]
    //        console.log(songTitles)
    //        files.forEach((song)=>{
    //         const tracks  = new Track({
    //             title:song,
    //             url:"./music-dex/" + song
    //         })
    //         tracks.save()
    //         .then((result)=>{
    //             res.redirect("/dash")
    //         })
    //         .catch(err=>console.log(err))
    //        })
    //     }
    // })
    fs.readdir("./musicDB",(err,files)=>{
        if(err){
            console.log(err)
        }
        else{
            if(files.length>0){
                console.log(files)
                files.forEach((song)=>{
                    const tracks  = new Track({
                        title:song,
                        url:"./music-dex/" + song
                    })
                    tracks.save()
                    .then(()=>{
                        res.redirect("/dash")
                        fse.copy("./musicDB","./music-dex")
                        .then(()=>{
                            files.forEach((file)=>{
                                console.log(file)
                                fs.unlink("./musicDB/" + file,(err)=>{
                                    if(err){console.log(err)} else{console.log("deleted and ready for new entries")}
                                })
                            })
                        })
                        .catch(err=>{console.log(err)})
                        
                    })
                    .catch(err=>console.log(err))
            })
            }
            else{
                res.redirect("/dash")
                
            }
            
        }
})}
)
app.get("/",(req,res)=>{
    res.redirect("dash")
})
app.use("/dash",dashRoutes)

app.use((req,res)=>{
    res.status(404).render("404")
})