const app = require('express')();
const fs = require('fs');
const http = require('http');



app.get('/pictest', (req, res, next) => {
  console.log('ererereerere');
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };
  const request = http.request({
    hostname: "https://westcentralus.api.cognitive.microsoft.com",
    port: 443,
    path: '/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpg'
    }
  })
  fs.readFile('./test.jpg', 'image/jpg', function(err, data) {
    request.write(data);
    console.log('trying to put data..')
    if(err) console.error(err);
  });

  res.send("SENT");
})

app.post('/pic', (req, res, next) => {
	console.log('Request incoming')
	var imageThing = new Buffer(0);


	req.on('data', (chunk) => {
		imageThing = Buffer.concat([imageThing, chunk])
	})

	req.on('end', () => {
		fs.writeFile('./image2.jpg', imageThing)
	})

})

app.get('/pic', (req, res, next) => {
	res.sendFile(__dirname + '/image1.jpg');
})

let port = process.env.PORT || 1337;

app.listen(port, () => {
	console.log('rhyming at 1337')
})
