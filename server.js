const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/remote-work-management', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Kết nối tới MongoDB thành công'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Chào mừng đến với Ứng Dụng Quản Lý Công Việc Từ Xa');
});

io.on('connection', (socket) => {
    console.log('Một người dùng mới đã kết nối');
    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
