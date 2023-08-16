const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const { createServer } = require('http');
const socketio = require('./socket');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/user_routes');
const adPostRouter = require('./routes/addPost_routes')


const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());

const server = createServer(app);
const io = socketio.init(server);
const adIo = socketio.initAdIo(server, '/socket/adpage');

// import the model you created
const userInstance = require('./models/userModel');

//Session initialization
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


app.use("/user", userRouter);
app.use("/user/auction", adPostRouter);



// Socket.io setup
const PORT = process.env.PORT || 5000;
io.on('connection', (socket) => {
  // console.log('### Socket IO client connected');
  socket.on('disconnect', (reason) => {
    // console.log('### Socket IO client disconnected');
  });
  socket.on('leaveHome', () => {
    socket.disconnect();
  });
});
adIo.on('connect', (socket) => {
  // socket.join('testroom')
  socket.on('joinAd', ({ ad }) => {
    socket.join(ad.toString());
    // console.log(`User joined room ${ad}`);
  });
  socket.on('leaveAd', ({ ad }) => {
    socket.leave(ad.toString());
    // console.log(`Left room ${ad}`);
  });
  socket.on('disconnect', () => {
    // console.log('User has disconnect from ad');
  });
});


const port = 5000;

app.listen(port, () => { 
    console.log(`Server listening on port ${port}`);
});         