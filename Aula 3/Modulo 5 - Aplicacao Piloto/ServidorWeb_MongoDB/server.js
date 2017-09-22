var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var fs  = require('fs');
require('../mongoose/database.js')('mongodb://localhost/Devices');
var controller = require('../mongoose/controller')();

//bodyParser é utilizado para popular req.body com os parâmetros do POST.
//configurando bodyParser para realizar o parse do json e requisições com
// o corpo bodyParser x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//Isso permite acessar os dados da requisição por meio de req.body
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/device', function(req, res) {
   console.log(req.body);

   if( req.body.id_device != undefined && req.body.name_device != undefined  && req.body.device_value != undefined ){
      io.emit('devices', req.body); 
      controller.save(req.body.id_device, req.body.name_device, req.body.device_value);
   }else{
      console.log("Error ao inserir dados");
   }
   console.log("Atualizado");
})


app.get('/devices', function(req, res){
  controller.listatodos(req, res);
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
 

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    