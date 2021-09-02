const express =require('express');
const socket =require('socket.io');
const app = express();

const {generateMessage,generateLocationMessage}  =require('./util/message');

const {addUser,removeUser,getUser,getUserInRoom} = require('./util/Users');

const PORT = process.env.PORT || 3000;

const server =app.listen(PORT,()=>{
    console.log('Listing on the port 3000');
})

const io = socket(server);


app.use(express.static('public'));

    // let count = 0 ;
io.on('connection',(socket)=>{


   

    socket.on('join',({username,room},callback)=>{

        const {error ,user} = addUser({id:socket.id,username,room});

        if(error){

           return callback(error);
        }


        socket.join(user.room);

        socket.emit("message",generateMessage("Welcome","Admin"));


        socket.broadcast.to(user.room).emit("message",generateMessage(`${user.username} has joined!`,user.username));



        io.to(user.room).emit('roomData',{

            room:user.room,
            users:getUserInRoom(user.room)
        });

        callback();

    });







    socket.on('sendMessage',(message,callback)=>{
        
        const user = getUser(socket.id);

        io.to(user.room).emit("message",generateMessage(message,user.username));

        callback("Delivered");
    });




    socket.on("sendLocation",(location,callback)=>{

        const user = getUser(socket.id);
        io.to(user.room).emit("locationMessage",generateLocationMessage(`https://google.com/maps?q=${location.lati},${location.long}`,user.username));

        callback("Location Shared");
    });

    socket.on("disconnect",()=>{

        const user =removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit("message",generateMessage(`${user.username} Has left!`,"Admin"));


            io.to(user.room).emit('roomData',{

            room:user.room,
            users:getUserInRoom(user.room)

            });
        }

       
    });
})

