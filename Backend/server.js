var express = require("express");
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express();
var api = express.Router();
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

const messageModel = mongoose.model('message', messageSchema);

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with,Content-Type,Accept');
    next();
})



app.use('/api',api);
api.get('/messages', (req, res) => {
    messageModel.find({}, (err, message) => {
        if (err) {
            res.send(err);
        }
        res.json(message);
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
app.listen(2000);