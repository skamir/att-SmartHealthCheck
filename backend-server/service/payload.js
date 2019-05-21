const express = require('express');
const router = express.Router();

var Fakerator = require("fakerator");
var fakerator = Fakerator();

var faker = require('faker');

const server = 'http://localhost:8095/';
let userMap = {};

router.post('/register', async (request, response) => {
    try{
        console.log('register');
        var data = request.body;
        if (!(data && data.userId)) {
            response.status(400).send("missing userId");
        }
        let userId = data.userId;
        console.log('register: ' + userId);

        request.app.locals.my_longpoll.create("/poll/" + userId);

        response.status(200).send("");
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);
    }
});

router.post('/generate', async (request, response) => {
    try{
        console.log('generate, post request received');
        response.status(200).send("");
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);
    }
});


router.get('/generate', async (request, response) => {
    try{


        let numberOfLocations = request.query.numberOfPoints ? request.query.numberOfPoints : 1;
        let result = [];
        for(let i = 0 ; i < numberOfLocations ; i++){
            let currentX = parseFloat(request.query.lat);
            let currentY = parseFloat(request.query.lng);
            let radius = parseFloat(request.query.radius);


            let u = getRandomInt(1000000000) / 1000000000;
            let v = getRandomInt(1000000000) / 1000000000;

            let w = radius * Math.sqrt(u);
            let t = 2 * Math.PI * v;
            let x = w * Math.cos(t);
            let y = w * Math.sin(t);

            let geoLocation = fakerator.address.geoLocation();
            geoLocation.latitude = currentX + y;
            geoLocation.longitude = currentY + x;
            let phoneNumber = faker.phone.phoneNumberFormat();
            let codeNumber = fakerator.random.number(1, 10);

            let responseBody = { phoneNumber, geoLocation, codeNumber };
            result.push(responseBody);
        }

        console.log(result);

        response.write(JSON.stringify(result));
        response.end();


    }
    catch(err){
        console.log(err);
        response.status(500).send(err);
    }
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Three second later');
}

router.get('/send', async (request, response) => {
    try{
        console.log('send - now = ' + Date.now());
        let userId = request.query.userId;
        let data = request.query.data;
        console.log('send: ' + userId + ' !!! ' + data);

        console.log('send - now = ' + Date.now() + ' map.user.now = ' + userMap[userId]);

        if (userMap[userId] !== undefined && userMap[userId] + 2000 > Date.now()) {
            console.log('before delay ' + "stamp:" + Date.now());
            await wait();
            console.log('after delay ' + "stamp:" + Date.now());
        }
        console.log('sending - now = ' + Date.now());

        userMap[userId] = Date.now();

        request.app.locals.my_longpoll.publish("/poll/" + userId, data);

        response.status(200).send("");
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);
    }
});




module.exports = router;
