var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var fs  = require('fs');
Log            = require('../../Modulo 3 - LOG4JS/LogSystem/WriteLog')(),
defined        = require('../../Modulo 3 - LOG4JS/LogSystem/defined')();
ControlLog     = require('../../Modulo 3 - LOG4JS/LogSystem/ControlLog')(),
log4js         = ControlLog.Inicializa(), 
logfile        = log4js.getLogger('file'),
logconsole     = log4js.getLogger ('console'); 
//bodyParser é utilizado para popular req.body com os parâmetros do POST.
//configurando bodyParser para realizar o parse do json e requisições com
// o corpo bodyParser x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//Isso permite acessar os dados da requisição por meio de req.body
app.use(bodyParser.json());

//Retorna index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Insere novo dispositivo
app.post('/device', function(req, res) {
   console.log(req.body);

   // Envia devices.
   io.emit('devices', req.body);
   Log.EscreveMsgInfoLog(logconsole, logfile,"Atualizado");
})

//estabelece conexao com o browser
io.on('connection', function(socket){
  Log.EscreveMsgInfoLog(logconsole, logfile, 'a user connected');

  socket.on('disconnect', function(){
    Log.EscreveMsgInfoLog(logconsole, logfile, 'user disconnected');
  });

});
 

http.listen(3000, function(){
  Log.EscreveMsgInfoLog(logconsole, logfile, 'listening on *:3000');
});
    