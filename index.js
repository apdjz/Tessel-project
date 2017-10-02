'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
const av = require('tessel-av');
const http = require('http');
const ambientlib = require('ambient-attx4');

const camera = new av.Camera();
const takePicture = camera.capture();
const ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
  // Get points of light and sound data.
   setInterval( function () {
     ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      else if (lightdata > 0.2) {
        takePicture.on('data', (image) => {
          console.log('taking picture');

          const request = http.request({
            hostname: 'https://agile-depths-39391.herokuapp.com/',
            port: 443,
            path: '/pic',
            method: 'POST',
            headers: {
              'Content-Type': 'image/jpg',
              'Content-Length': image.length
            }
          })

          request.write(image)

        })
      }
      console.log("Light level:", lightdata.toFixed(8));
     });
   }, 500); // The readings will happen every .5 seconds
 });

 ambient.on('error', function (err) {
   console.log(err);
 });

takePicture.on('error', (err) => console.error(err))
