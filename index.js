const path=require('path');
const express=require('express');
const app= express();

//herramientas

//puerto
app.set('port',process.env.PORT || 3000);

//Configuracion de rutas
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), ()=> {
   console.log('server on port',app.get('port'));
});

const SocketIO=require('socket.io');

const io=SocketIO.listen(server);

io.on('connection',(socket)=>{

    socket.on('chat:mensaje', (data)=>{
        io.sockets.emit('chat:mensaje', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing',data);
    });

});