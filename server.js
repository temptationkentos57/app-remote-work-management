import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Kết nối tới MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/remote-work-management';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log(`Kết nối đến MongoDB thành công: ${mongoURI}`))
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