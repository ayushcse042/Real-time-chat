// Node server which will handle socket io connection

const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
});

const users={};

//
io.on('connection', socket => {

  // any user joined let other user connected to the server know! 
  socket.on('new-user-joined', name => {
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
    });

    //If someone sends a message broadcast, it to other people
    socket.on('send', message =>{
      console.log(message);
        socket.broadcast.emit('recieve',{message:message, name:users[socket.id]})
    });

    // If someone leaves the chat let other know
    socket.on('disconnect', message =>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id];
  });

});



