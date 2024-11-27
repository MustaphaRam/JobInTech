// app.js or server.js
const express = require('express');

const app = express();

app.get('/', (request, response) => {
    const crypto = require('crypto');
    const generateRandomSecret = () => {
        return crypto.randomBytes(64).toString('hex');
    };

    const jwtSecret = generateRandomSecret();
    response.json({code: jwtSecret});
    console.log("Random JWT Secret Key:", jwtSecret);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// test method get & post
app.get('/form', (request, response) => {
  response.sendFile(__dirname + '/views/form.html');
});

app.post('/send', (request, response) => {
    console.log(request.body);
    response.json({"name": request.body.name})
});

// whene have get data parameter in url
app.get('/offer/:name/:id', (request, response) => {
    console.log(request.params);
    response.send({parameters: request.params})
});


// templet view in node 
app.set('view engine', 'ejs');
app.use(express.static('viwes'));
app.get('/home', (request, response) => {
    response.render('home', {title: 'Home page', message: 'this is great day'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
