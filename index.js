const http = require('http');
const path = require('path');
const fs = require('fs');

// Port
const PORT = process.env.PORT || 5000;

// Create a new server object
const server = http.createServer((req, res) => {
    console.log(`URL: ${req.url}`);

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
        'index.html' : req.url); // ? is then, : is else

    // Extension of file
    let extName = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // check ext and check set content type
    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read files to serve
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });

});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));