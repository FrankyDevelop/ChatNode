 const socket= io()

 //elemntos del DOM
 let mensaje=document.getElementById('mensaje');
 let usuario=document.getElementById('usuario');
 let enviar=document.getElementById('enviar');
 let chats=document.getElementById('chats');
 let acciones=document.getElementById('acciones');

 //Enivar datos de los input
 enviar.addEventListener('click',function(){
     socket.emit('chat:mensaje',{
          mensaje:mensaje.value,
          usuario:usuario.value
     });
 });

 mensaje.addEventListener('keypress', function(){
   socket.emit('chat:typing',usuario.value);
 });

 socket.on('chat:mensaje',function(data){
     acciones.innerHTML=''; 
     chats.innerHTML += `<p>
     <strong>${data.usuario}</strong>: ${data.mensaje}
     </p>`
 });

 socket.on('chat:typing',function(data){
    acciones.innerHTML += `<p><em>${data} esta escribiendo </em>
    </p>`
 });
 
 