var express = require("express");
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');

const app = express();
var api = express.Router();
var auth = express.Router();
//var messages = [{text: 'some text ', owner: 'Sud'}, {text: 'new text ', owner: 'Tez'}, {text: 'Super text ', owner: 'Gpay'}];

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MessageBoard', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text : {
        type : String,
        required: 'Enter message Text'
    },
    owner: {
        type : String,
        required: 'Enter owner name'
    }
})

const userSchema = new Schema({
    firstName : {
        type : String,
        required: 'Enter first Text'
    },
    lastName: {
        type : String,
        required: 'Enter last name'
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const messageModel = mongoose.model('message', messageSchema);
const userModel = mongoose.model('user', userSchema);

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with,Content-Type,Accept');
    next();
})



app.use('/api',api);
app.use('/auth',auth);
api.get('/messages', (req, res) => {
    messageModel.find({}, (err, message) => {   
        if (err) {
            res.send(err);
        }
        res.json(message);
    })
})

api.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    var result;
    messageModel.find({}, (err, messages) => {
        result = messages.filter(message => message.owner == user)
        res.json(result);        
    })
})

api.post('/messages', (req, res) => {
    let newMessage = new messageModel(req.body);
    newMessage.save((err, message) => {
        if (err) {
            res.send(err);
        }
        res.json(message);
    })
})

auth.post('/register', (req, res) => {
    let newUser = new userModel(req.body);
    newUser.save((err, user) => {
        if(err) {
            res.send(err)
        }
        sendToken(user, res);
    })
})

auth.post('/login', (req, res) => {
    var result;
    userModel.find({}, (err, users) => {
        result = users.filter(user => {
            if (user.email == req.body.email) {
                return user;
            }
        })
        if(result.length == 0) {
            sendAuthError(res);
        }else{
            if(result[0].password == req.body.password){
                sendToken(result[0], res)
            }else{
                sendAuthError(res);
            }
        }           
    })
})

function sendToken(user, res){
    var token = jwt.sign(user.id, '123')
    res.json({firstName: user.firstName, token});
};

function sendAuthError(res) {
    return res.json({ success:false, message: 'email or password incorrect'});
};
app.listen(2000);