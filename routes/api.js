var express = require('express');
var mongoose = require('mongoose')
var request = require('request');
const Weather = require('../model/weather');
cookie = require('cookie');
var router = express.Router();
var Users = require('../model/users');
var urlMongo = 'mongodb+srv://Odaya:0548517176@cluster0.y2biv.mongodb.net/test?retryWrites=true&w=majority';
//'mongodb://Odaya:0548517176@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true'


router.post('/logup/:email/:password/:username', async function (req, res, next) {
    const data = req.params;
    console.log(data, 'data')

    res.clearCookie('user');
    try {
        const connection =
            await mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true });
        // mongoose.connection.on('connected', () => console.log('user logup connected'))
        const w1 = new Users({
            password: data.password,
            userName: data.username,
            email: data.email
        });
        await w1.save();
        const contactItems = await Users.find({});
        console.log(contactItems, 'all')
        mongoose.disconnect();
        console.log('user save in mongoo')
        res.cookie('user', data.email).send({ ok: 'Cookie-Parser' });
    }
    catch (err) {
        console.log(err, 'error user save in mongoo');
        res.send(err);
    }
})

router.post('/login/:email/:pwp', async function (req, res, next) {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    res.clearCookie('user');
    const uid = req.params.email;
    const password = req.params.pwp;
    console.log('uid email', uid, password)
    {
        try {
            const connection =
                await mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
            // mongoose.connection.on('connected', () => console.log('user login connected'))
            // await Users.deleteMany({})
            console.log('uid email', uid, password)
            const contactItems = await Users.findOne({ email: uid });
            console.log(contactItems)
            const password1Ok = contactItems ? await contactItems.checkPassword(password) : false

            console.log(password1Ok, 'contactItems')
            if (password1Ok == true) {
                const user = contactItems.email;
                console.log(user, 'user ')
                res.cookie('user', user).send({ ok: 'Cookie-Parser' });
            }
            else res.sendStatus(400)
            mongoose.disconnect();
        }
        catch (err) {
            console.log('err', err);   
            res.status(401).send("loginError")
        }
    }
});

router.get('/history', async function (req, res, next) {
    if (!req.cookies.user) {
        console.log(req.cookies, '//////history')
        res.sendStatus(400)
    }
    else {
        console.log(req.cookies.user, '/history true')
        const userid = req.cookies.user;
        console.log('history')
        try {
            const connection =
                await mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true });
            // mongoose.connection.on('connected', () => console.log(' history connected'))
            const contactItems = await Weather.find({ uid: userid });
            // console.log(contactItems);
            mongoose.disconnect();
            res.send(contactItems.reverse())
        }
        catch (err) {
            console.log(err);
        }
    }
});


async function saveToHistory(userid, wetherToSave) {
    console.log('saveToHistory')
    try {
        const connection =
            await mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true });
        // mongoose.connection.on('connected', () => console.log('connected save to history'))
        const w1 = new Weather(wetherToSave);
        await w1.save();
        const contactItems = await Weather.find({ uid: userid });
        console.log(contactItems);
        mongoose.disconnect();
    }
    catch (err) {
        console.log(err);
    }
}

router.get('/search/:city', async function (req, res, next) {
    const uid = req.cookies.user;
    console.log('/search/:city')
    const city = req.params.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e537bba30453a82c25db3b162d50e00&units=metric`
    var wetherToSave = {};
    try {
        request(url, { json: true }, async function (err, response, body) {
            if (err) { console.log('errr'); res.send(err); }
            if (response && response.statusCode == 200) {
                const r = response.body
                wetherToSave = {
                    averaged: r.main.temp,
                    min: r.main.temp_min,
                    max: r.main.temp_max,
                    iconCode: r.weather[0].icon,
                    descraption: r.weather[0].description,
                    city: city,
                    uid: uid,
                    date: new Date()
                }
                saveToHistory(uid, wetherToSave);
                res.send(wetherToSave);
                wetherToSave = [];
            }
            else {
                res.status(400)
                res.send(response.body)
            }
        });
    }
    catch (err) {
        res.send(err)
    }
}
);

module.exports = router;