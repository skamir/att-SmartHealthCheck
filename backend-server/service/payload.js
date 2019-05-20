const express = require('express');
const router = express.Router();

var Fakerator = require("fakerator");
var fakerator = Fakerator();


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

router.get('/generate', async (request, response) => {
    try{

        let v = Math.floor(Math.random() * Math.floor(10000000)) / 10000000;

        console.log("v" + v);
        let u = Math.floor(Math.random() * Math.floor(10000000)) / 10000000;
        console.log("u" + u);

        let w = request.query.radius * Math.sqrt(u);
        console.log("w" + w);
        let t = 2 * Math.PI * v;
        console.log("t" + t);
        let x = w * Math.cos(t);
        console.log("x" + x);
        let y = w * Math.sin(t);
        console.log("y" + y);

        var name = fakerator.names.name();
        var geoLocation = fakerator.address.geoLocation();
        geoLocation.latitude = request.query.lat + y;
        geoLocation.longitude = request.query.lng + x;
        var phoneNumber = fakerator.phone.number();
        var codeNumber = fakerator.random.number(1, 10);


        console.log(phoneNumber);
        console.log(geoLocation);
        console.log(codeNumber);

        const responseBody = { phoneNumber, geoLocation, codeNumber };

        response.write(JSON.stringify(responseBody));
        response.end();


    }
    catch(err){
        console.log(err);
        response.status(500).send(err);
    }
});

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
