const express = require('express');
require('./db/config');
const User = require('./db/user');
const Finance = require('./db/Finance');



const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result)
})

app.post('/login', async (req, resp) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after some time..." })
                }
                resp.send({ user, auth: token })
            })
        } else {
            resp.send({ result: "No user found" })
        }
    }
});


app.get('/finances', async (req, resp) => {
    let finance = await Finance.find();
    if (finance.length > 0) {
        resp.send(finance)
    } else {
        resp.send({ result: "No product found" })
    }
});


app.post('/finance', async (req, resp) => {
    let finance = new Finance(req.body);
    let result = await finance.save();
    resp.send(result);
});

app.delete('/finances/:id', async (req, resp) => {
    const result = await Finance.deleteOne({ _id: req.params.id })
    resp.send(result);
});

app.get('/:id', async (req, resp) => {
    console.log(req.params.id.trim());
    let results = await Finance.findOne({ _id: req.params.id.trim() })
    if (results) {
        resp.send(results);
    } else {
        resp.send({ result: "No Record found" })
    }
});


app.put('/finances/:id', async (req, resp) => {
    let result = await Finance.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});



app.listen(5000);