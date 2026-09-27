const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { attachClassroomSocket } = require('./sockets/classroom');

connectDB();

const httpServer = http.createServer(app);
attachClassroomSocket(httpServer, process.env.CLIENT_ORIGIN || 'http://localhost:5173');

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`[Server] Running on port ${PORT}`));
