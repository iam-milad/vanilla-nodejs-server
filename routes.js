const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === "/"){
        res.setHeader("Content-Types", "text/html");
        res.write(`<html>
            <head>
                <title>My First Page</title>
            </head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message"/>
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`);
        return res.end();
    } else if (url === "/message" && method === "POST"){
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (error) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    
    res.setHeader("Content-Types", "text/html");
    res.write(`<html>
        <head>
            <title>My First Page</title>
        </head>
        <body>
            <h1>Hello, this is my first node app</h1>
        </body>
    </html>`);
    res.end();
}

module.exports = requestHandler;