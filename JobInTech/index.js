const http = require('http'); // Import the built-in `http` module

const hostname = 'localhost'; // Localhost address
const port = 3000; // Port number

const server = http.createServer((request, response) => {
  // console.log(request);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html;charset=utf-8');
  response.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
