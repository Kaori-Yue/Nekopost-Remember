const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonfile = require('jsonfile')


app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://www.nekopost.net");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/nekopost', (req, res) => {
    let file = './nekopost.json'
    jsonfile.readFile(file, (err, obj) => {
        try {
            res.send(obj.nekopost[req.query.type][req.query.id])
        }
        catch (err) {
            res.send({ "status": "fail" })
        }
    })
})
//
app.post('/nekopost', bodyParser.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    let file = './nekopost.json'
    // console.log(req.body.id)
    jsonfile.readFile(file, (err, obj) => {
        if (err) return res.send('{"status": "read error"}')
        obj.nekopost[req.body.type][req.body.id] = { "title": req.body.title, "chapter": req.body.chapter }
        jsonfile.writeFile(file, obj, { spaces: 4 }, (err, obj) => {
            if (err) {
                res.send('{"status": "write error"}')
            }
            res.send('{"status": "success"}')
        })
    })
})
//
app.delete('/nekopost', bodyParser.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    let file = './nekopost.json'
    // console.log(req.body.id)
    jsonfile.readFile(file, (err, obj) => {
        if (err) return res.send('{"status": "read error"}')
        delete obj.nekopost[req.body.type][req.body.id]
        jsonfile.writeFile(file, obj, { spaces: 4 }, (err, obj) => {
            if (err) {
                res.send('{"status": "write error"}')
            }
            res.send('{"status": "success"}')
        })
    })
})
// ================================================================================================
app.listen(3000, () => {
    console.log('express-js start..')
})