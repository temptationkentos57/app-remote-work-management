import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/remote-work-management';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log(`Successfully connected to MongoDB: ${mongoURI}`))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Remote Work Management Application');
});

io.on('connection', (socket) => {
    console.log('A new user has connected');
    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});