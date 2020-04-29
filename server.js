let http = require('http');
let fs = require('fs');
let port = '8080';
const {parse} = require ('querystring'); 

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectData(req, result => {
            console.log(result);
            res.end(`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Empresa - Vilcapoma</title>   
            <link rel="icon" type="image/png" href="https://image.flaticon.com/icons/png/512/625/625169.png"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
    form {
        margin: 0 auto;
        width: 400px;
        padding: 2em;
        border: 1px solid #CCC;
        border-radius: 1em;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      form li + li {
        margin-top: 1em;
      }
      
      input, 
      textarea {

        font: 1em sans-serif;
      
        width: 300px;
        box-sizing: border-box;
        border: 1px solid #999;
      }
      
      input:focus, 
      textarea:focus {
        border-color: #000;
      }
      
      textarea {
        vertical-align: top;
      
        height: 5em;
      }
      
      </style>
        </head>
        <body>
        <nav class="navbar navbar-dark bg-dark">
        <a href="index.html" class="navbar-brand">INICIO</a>
        <a href="nosotros.html" class="navbar-brand">NOSOTROS</a>
        <a href="servicios.html" class="navbar-brand">SERVICIOS QUE OFRECEMOS</a>
        <a href="contacto.html" class="navbar-brand">CONTACTO</a>
        </nav>
        <div class="card-body" align="center"><h5 class="card-title">Datos del formulario rellenado</h5>
        <hr>
        <div class="container my-4" align="center">
        <form>
                <div class="card" >
                          <p class="card-text"><b>Nombres:</b> ${result.name} </p>
                          <p class="card-text"> <b>Correo Electrónico: </b> ${result.mail} </p>
                          <p class="card-text"><b>Celular: </b>${result.number} </p>
                          <p class="card-text"><b>Fecha de nacimiento:</b> ${result.date}  </p>
                          <p class="card-text"><b>Mensaje:</b> ${result.msg} </p>
                          <h2>Pronto nos pondremos en contacto</h2>
                          </div>
                          <a href="/contacto.html" class="btn btn-primary btn-block">Regresar</a>
                        </div>
                      </div>
                      
                </div>
                </form>
        </body>
        </html>`);
        });
    } 
    else {
        let url = req.url;
        if(url == "/index.html"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
            fs.readFile('./index.html',function(error, html){
                res.write(html);
                res.end();
            });
        }else if(url == "/nosotros.html"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
                fs.readFile('./nosotros.html',function(error, html){
                    res.write(html);
                    res.end();
                });
            }else if(url == "/servicios.html"){
                res.writeHead(200,{'Content-Type' : 'text/html'});
    
            fs.readFile('./servicios.html',function(error, html){
                res.write(html);
                res.end();
            });
        }else if(url == "/contacto.html"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
        
                fs.readFile('./contacto.html',function(error, html){
                    res.write(html);
                    res.end();
                });
        }else {
            url == "/404.html"
            res.writeHead(404,{'Content-Type' : 'text/html'});
                fs.readFile('/404.html',function(error, html){
                    res.write(html);
                    res.end();
                    });
                }
    }
});
server.listen(port,()=>{
    console.log("Este server está corriendo en: "+port);
});

function collectData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}