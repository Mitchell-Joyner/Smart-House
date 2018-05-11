const express = require('express');
const router = express.Router();
const redis = require('redis');

let client  = redis.createClient();

client.on('connect',function(){
  console.log("You did it! You did it! You did it! Yay! (Lo hiciste!)");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express JS Event Log' });
});

router.get('/all',function(req, res, next){

    client.keys('device*', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let devicelist = {};

            for(let d=0; d<data.length; d++){
                let item = "dvc"+d;
                devicelist[item] = data[d];
            }
            res.render('devices', devicelist);
            console.log(data);
        }
    });
});

router.get('/goto/:id',function (req, res){
    let id = req.params.id;
    client.hgetall(id,function(err,obj){
        if(!obj){
            console.log(id);
            res.render('index',{
                error: 'device does not exist',
                title: 'NO!'
            });
        }
        else{
            console.log(obj);
            obj.id = "device"+req.params.id;
            res.render('device',{
                device:obj
            });
        }
    })
});

module.exports = router;
