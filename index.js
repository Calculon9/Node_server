const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req,res) => {
    /* if(req.url === '/') { // if url = /, then the request is for the index/main page
        fs.readFile(path.join(__dirname,"public","index.html"), (err,content) => {
            if(err){
                console.log(err)
                return;
            } else {
                res.writeHead(200,{'Content-type': 'text/html'})
                res.end(content) // ends response by sending 'content'
            }  
        }) 
    }

    if(req.url === '/about') {
        fs.readFile(path.join(__dirname,"public","about.html"), (err,content) => {
            if(err){
                console.log(err)
                return;
            } else {
                res.writeHead(200,{'Content-type': 'text/html'})
                res.end(content) // ends response by sending 'content'
            }
        })
    }

    if(req.url === '/api/users') {
        const users = [
            {name: "John Smith", age: 48},
            {name: "Chris Jones", age: 37},
        ];
        res.writeHead(200,{'Content-type': 'application/json'});
        res.end(JSON.stringify(users));
    }*/


    // Build file path
    let filePath = path.join(__dirname,"public",req.url === '/' ? 'index.html': req.url);

    // Get extension of file
    let ext = path.extname(filePath);

    // Initial content type (default type is text/html)
    let contentType = 'text/html';

    // Check ext and set content type
    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/js'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;    
        case '.jpg':
            contentType = 'image/jpg'
            break;
        default: contentType = 'text/html'
            break;
    }

    // Read file
    fs.readFile(filePath,(err,content) => {
        if(err){
            if(err.code == "ENOENT"){ 
                // Page isn't found
                fs.readFile(path.join(__dirname,"public","404.html"), (err,content) => {
                    res.writeHead(200,{'Content-type':'text/html'})
                    res.end(content)
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200,{'Content-type':contentType});
            res.end(content);
        }
    })
})
const PORT = process.env.PORT || 5000;


server.listen(PORT, console.log(`Server running on port ${PORT}`));

