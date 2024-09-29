const express=require("express");
const app=express();
const fs=require("fs");
const shortID=require("shortid");
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+"/staticFiles")); 
app.use(express.json());
app.get("/",(req,res)=>{
    res.sendFile("./staticFiles/index.html");
})
app.post("/short",(req,res)=>{
    let {LongURL}=req.body;
    fs.readFile("./url.json", "utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            data=JSON.parse(data);
            let filteredData=data.filter(e=>e.URL==LongURL);
            if(filteredData.length>0){
                res.json("http://localhost:3000/"+filteredData[0].id);
            }
            else{
                const newID=shortID.generate();
                let obj={
                    id:newID,
                    URL:LongURL
                }
                data.push(obj);
                fs.writeFile("./url.json",JSON.stringify(data),(err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json("http://localhost:3000/"+newID);
                    }
                })
            }
        }
    })
})

app.get("/:id",(req,res)=>{
    let urlID=req.params.id;
    fs.readFile("./url.json","utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            data=JSON.parse(data);
            data.forEach(e=>{
                if(e.id==urlID){
                    res.redirect(e.URL);
                }
            })
        }
    })
})

app.listen(3000,(e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log("Server is running on port 3000")
    }
})