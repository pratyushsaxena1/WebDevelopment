#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

app.set('view engine','ejs')

app.use(
    express.static('static_files')
)

let count = 0;

app.get('/', function(req,res){
    count++;
    var obj = {'visitor':count}
    res.render('home', obj);
});

app.get('/flip', function(req,res){
    var coin_flip = Math.floor(Math.random() * 2)
    var heads_true = (coin_flip == 0)
    console.log(heads_true)
    if (heads_true == true) {
        return res.render('winFlipPage');
    }
    return res.render('loseFlipPage');
});

app.get('/schedule', function(req,res){
    var dataTable = {
        "count": 110,
        "next": "https://ion.tjhsst.edu/api/schedule?page=5",
        "previous": "https://ion.tjhsst.edu/api/schedule?page=3",
        "results": [
            {
                "url": "https://ion.tjhsst.edu/api/schedule/2022-09-01",
                "date": "2022-09-01",
                "day_type": {
                    "name": "Blue Day",
                    "special": false,
                    "blocks": [
                        {
                            "order": 1,
                            "name": "Period 1",
                            "start": "8:40",
                            "end": "10:15"
                        },
                        {
                            "order": 2,
                            "name": "Period 2",
                            "start": "10:25",
                            "end": "12:00"
                        },
                        {
                            "order": 3,
                            "name": "Lunch",
                            "start": "12:00",
                            "end": "12:40"
                        },
                        {
                            "order": 4,
                            "name": "Period 3",
                            "start": "12:40",
                            "end": "14:15"
                        },
                        {
                            "order": 5,
                            "name": "Period 4",
                            "start": "14:25",
                            "end": "16:00"
                        }
                    ]
                }
            }
        ]
    }
    var block_1 = {'block_1':dataTable["results"][0]["day_type"]["blocks"][0]["name"]}
    var block_2 = {'block_2':dataTable["results"][0]["day_type"]["blocks"][1]["name"]}
    var block_3 = {'block_3':dataTable["results"][0]["day_type"]["blocks"][2]["name"]}
    var final_array = [block_1, block_2, block_3]
    res.render('scheduleView', final_array)
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});