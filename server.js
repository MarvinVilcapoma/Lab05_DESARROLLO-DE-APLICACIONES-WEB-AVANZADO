var http=require('http');
var fs=require('fs')
var port=8080

var server = http.createServer(function(request,response){
    console.log(request)
    if(request.url === '/' || request.url === '/index.html'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/index.html').pipe(response);
    } else if(request.url ==='/nosotros.html'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/nosotros.html').pipe(response);
    } else if(request.url =='/servicios.html'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/servicios.html').pipe(response);
    } else if(request.url =='/contacto.html'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/contacto.html').pipe(response);  
    } else{
        response.writeHead(404,{'Content-type':'text/html'});
        fs.createReadStream(__dirname+'/404.html').pipe(response);
    }
})



server.listen(port,function(error){
    if(error){
        console.log('Ocurrió un error al llamado del servidor')
    }else{
        console.log('Server escuchado en el puerto'+port)
    }
})