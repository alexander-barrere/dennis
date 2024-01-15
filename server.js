const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const initialize = require('./database/initialize');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const dnsRoute = require('./routes/dnsRoute');
const baseRoute = require('./routes/baseRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', baseRoute);
app.use('/dns', dnsRoute);

// Serve index.html from the React app for all other requests not caught by routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Initialize the database and then start the server
initialize().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to initialize the database:', error);
});
