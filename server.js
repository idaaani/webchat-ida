const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Sajikan file statis dari folder "public"
app.use(express.static('public'));

// Event saat client terkoneksi
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Menerima pesan dari klien berupa objek { username, message }
  socket.on('chat message', (data) => {
    console.log(`${data.username}: ${data.message}`);

    // Kirim pesan ke semua klien dengan format: "nama: pesan"
    io.emit('chat message', `${data.username}: ${data.message}`);
  });

  // Event saat client disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Jalankan server di port 3000
server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
