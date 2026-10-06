const path = require('path');
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

// name bank for every score going from most chill to fiercest warrior
const wuNames = {
    5: 'Quiet Monk',
    6: 'Hidden Oracle',
    7: 'Poetic Lyricist',
    8: 'Mystic Chemist',
    9: 'Jade Ronin',
    10: 'Shaolin Samurai',
    11: 'Golden Emperor',
    12: 'Iron Fist',
    13: 'Venomous Dragon',
    14: 'Thunderous Tiger',
    15: 'Unstoppable Warrior'
}

//make function that creates new name
function wu_4_ever(q1, q2, q3, q4, q5) {
  //the answer values are strings so we need to convert it to actual numbers
  let score = Number(q1) + Number(q2) + Number(q3) + Number(q4) + Number(q5)
   
    console.log(score)

    return `${wuNames[score]}`
}

const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    console.log(page);
      if (page == '/') {
        fs.readFile('index.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
          
      } else if (page == '/name') {
          //if all of the questions were answered, run the function
          if ('q1' in params && 'q2' in params && 'q3' in params && 'q4' in params && 'q5' in params) {
              //run the function to get the wu name from the score the user received
              let wu_name = wu_4_ever(params['q1'], params['q2'], params['q3'], params['q4'], params['q5'])
              res.writeHead(200, { 'Content-Type': 'application/json' });
              const objToJson = {
                  result: wu_name
              }
              res.end(JSON.stringify(objToJson));
          }
      }
      else if (page == '/css/style.css'){
        fs.readFile('css/style.css', function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/css'});
          res.write(data);
          res.end();
        });
      }else if (page == '/js/main.js'){
        fs.readFile('js/main.js', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.write(data);
          res.end();
        });
      }else if (page == '/fonts/Bamboo-Regular.ttf'){
          fs.readFile('fonts/Bamboo-Regular.ttf', function(err, data) {
            res.writeHead(200, {'Content-Type': 'font/ttf'});
            res.write(data);
            res.end();
          });
      }else{
        figlet('404!!', function(err, data) {
          if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
          }
          res.write(data);
          res.end();
        });
      }
    });
    
    server.listen(8000);