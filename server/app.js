import express from 'express'
import path, {dirname} from "path"
import { fileURLToPath } from 'url';
import 'dotenv/config'
import mongoose from 'mongoose'
import authRouter from "./routes/userRoute.js"
import questionRouter from "./routes/questionRoute.js"
import categoryRouter from "./routes/categoryRoute.js"
import programRouter from "./routes/programRoute.js"
import cors from "cors"
import solutionRouter from "./routes/solutionRoute.js"
import { createServer } from "http"
import  {Server} from "socket.io"
import { addUser, checkUsernameAlreadyInRoom, getUser, getUsersInRoom, removeUser } from './utils/userSocket.js'
const app = express()

const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));

const dbURL = `mongodb+srv://jayeshk118:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.qgq3dkm.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  app.use((req, res, next) => {
    res.status(500).send('Internal Server Error');
  })
})

db.once('open', () => {
    console.log('Connected to MongoDB');    
});

app.get('/dummy', (req,res) => {
  res.json({connected: true})
})

app.use('/user',authRouter)
app.use('/question', questionRouter)
app.use('/category', categoryRouter)
app.use('/solution', solutionRouter)
app.use('/program', programRouter)


const server = createServer(app)
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "https://letscode-1.netlify.app", // Replace with your frontend's origins
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({userName, session}, errorCallback, successCallBack) => {

    const userInRoom = checkUsernameAlreadyInRoom(userName, session)

    if(userInRoom){
      socket.emit("duplicateEntry", {message: "You're already in this room"})
      return;
    }
    const {user,error} = addUser(session, userName,socket.id)
    if(error){
      errorCallback(error)
      return;
    }
    successCallBack()

    socket.join(user?.room)    //adding user(socket) to given room
    const users = getUsersInRoom(user.room)
    io.to(user?.room).emit('roomMembers', {users, room : user.room})
    socket.broadcast.to(user?.room).emit('joined', {
      userName,
      socketId: socket.id
    })
  })

  socket.on('sendCode', (code) => {
    const user = getUser(socket.id)
    socket.broadcast.to(user?.room).emit('receiveCode', code)
  })

  socket.on('sync-code', ({code, languageSelected, socketId}) => {
    io.to(socketId).emit('receiveLanguage', languageSelected)
    io.to(socketId).emit('receiveCode', code)
  })

  socket.on('sendLanguage', (language) => {
    const user = getUser(socket.id)
    socket.broadcast.to(user?.room).emit('receiveLanguage', language)
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if(user){
      const users = getUsersInRoom(user.room)
      io.to(user.room).emit('roomMembers', {users, room : user.room})
      io.to(user.room).emit('leaveMessage', {username: user.username})
    }
  })
})
    
server.listen(PORT, () => {
    console.log('app running at port ', PORT)
})