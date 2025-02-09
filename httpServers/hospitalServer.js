const express = require("express");
const app = express();

var user = [{
    name: "varun",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json());

app.get('/', function(req, res){              //print 
    const kidneys=user[0].kidneys;
    const totalKidneys = kidneys.length;
    let healthyKidneys = 0;
    for(let i=0; i<totalKidneys; i++){
        if(kidneys[i].healthy) healthyKidneys++;
    }
    const unhealthyKidneys = totalKidneys - healthyKidneys;
    res.json({
        totalKidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})

app.put('/', function(req, res){          //update (replace a unhealthy kidney with a healthy kidney)
    for(let i=0; i<user[0].kidneys.length; i++){
        user[0].kidneys[i].healthy = true;
    }
    res.json({})
})

app.post('/', function(req, res){           //add (add new kidney unhealthy/healthy)
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done"
    })
})

function isThereAnUnhealthyKidney(){
    let atleastOneHealthyKidney = false;
    for(let i=0; i<user[0].kidneys.length; i++){
        if(!user[0].kidneys[i].healthy){
            atleastOneHealthyKidney= true;
        }
    }
    return atleastOneHealthyKidney;
}

app.delete('/', function(req, res){  //removing all unhealthy kidneys
    if(isThereAnUnhealthyKidney()){
        let newKidneys = [];
    
        for(let i=0; i<user[0].kidneys.length; i++){
            if(user[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                }) 
            }
        }
        user[0].kidneys=newKidneys;
        res.json({
            msg: "done"
        })
    } else {
        res.status(411).json({
            msg: "there isnt any bad kidney"
        });
    }
    
})



app.listen(3000);