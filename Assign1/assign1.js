const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;

if(url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Santa\'s Site</title><head>');
    res.write('<body><h1>Santa\'s Site</h1>');
    res.write('<form action="/Wishlist" method="POST">First Name:<input type="text" name="First_Name"></input><br>');
    res.write('Last Name:<input type="text" name="Last_Name"></input><br>');
    res.write('Christmas Wish:<input type="text" name="Wish"></input><br>');
    res.write('<button type="submit">Send To Santa</submit></form></body></html>')
    return res.end;
}

if(url === '/Wishlist' && method === 'POST'){
    const unparsedBody = [];
    req.on('data', (chunk) => {
        unparsedBody.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(unparsedBody).toString();
        // Note to self: Later on reduce lines of code through iterating.
        const unparsed_First_Name = parsedBody.split('=')[1];
        const First_Name = unparsed_First_Name.split('&')[0];
        const unparsed_Last_Name = parsedBody.split('=')[2];
        const Last_Name = unparsed_Last_Name.split('&')[0];
        const unparsed_Wish = parsedBody.split('=')[3];
        const Wish = unparsed_Wish.split('&')[0];
        const Letter = `Dear Santa,\nI would like a brand new ${Wish} for Christmas. I've been really good, and I want this most of all.\nThank you very much,\n${First_Name} ${Last_Name}`;
        fs.writeFileSync(`${First_Name} ${Last_Name}'s Letter To Santa`, Letter);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Santa\'s Site</title></head>');
        res.write('<body><h1>Letter Sent!</h1>');
        res.write('<h2>Your Letter Reads:</h2>');
        res.write(`<p>Dear Santa,\nI would like a brand new ${Wish} for Christmas. I've been really good, and I want this most of all.\nThank you very much,\n${First_Name} ${Last_Name}</p></body>`);
    });
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/html');
        //res.write('<html><head><title>Santa\'s Site</title></head>');
        //res.write('<body><h1>Letter Sent!</h1>');
        //res.write('<h2>Your Letter Reads:</h2>');
        //res.write(`<p>Dear Santa,\nI would Like a brand new ${Wish} for Christmas. I've been really good, and I want this most of all.\nThank you very much,\n${First_Name} ${Last_Name}</p></body>`);
        return res.end;
}

//default code
res.end;
});
server.listen(3000);
