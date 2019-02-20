const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/')
    {
        res.write('<html>');
        res.write('<head><title>Enter Note</title></head>');
        res.write('<body><form action="/note" method="POST"><input type="text" name="note"><button type="submit">Send</button></form></body>');
        res.write('<html>');
        return res.end();
    }
    if(url === '/note' && method=== 'POST')
    {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const note = parsedBody.split('=')[1];
            console.log(note);
            fs.writeFile('note.txt', note, err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });          
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First App</title></head>');
    res.write('<body><h1>Hallo Node Server</h1></body>');
    res.write('<html>');
    res.end;
};
exports.handler = requestHandler;
exports.addText = 'Learn JS';