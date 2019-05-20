const express = require('express');
const router = express.Router();

const server = 'http://localhost:8094/';
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