const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
require('./middlewares/auth'); // Import passport configuration
const routes_Auth1 = require('./routes/auth1');
const routes = require('./routes/routes');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// connect to database
connectDB();
//check connection server is ready
console.log(mongoose.connection.readyState);


// Body parsers for JSON and URL-encoded data
/* app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  */

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Use routes
app.use(routes);

// auth routes
app.use(routes_Auth1);

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// whene no found routes note: this route it's better to be the last
app.get('*', (request, response) => {
    response.send("not found this route " + request.url)
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// first route
app.get('/api', (req, res) => {
    res.json('Welcome To JobInTech!');
});

// upload image in server
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/upload/logo')
    },
    filename: function (req, file, cb) {
        // Specify the filename for uploaded files
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })
// send name file
app.post('/api/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    console.log(req.file);
    console.log("file has ben save : "+file.filename);
    res.status(200).json(file.filename);
});



// run server
app.listen(process.env.port || 8800, () => {
    console.log(`app listening at http://localhost:8800/`);
});
