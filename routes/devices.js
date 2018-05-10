const express = require('express');
const router = express.Router();
const redis = require('redis');

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
            res.render('alldevices', devicelist);
            console.log(data);
        }
    });
});




module.exports = router;
