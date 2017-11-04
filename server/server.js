const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from : 'Admin',
		text : 'Welcome to the chat app',
		createdAt : new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from : 'Admin',
		text : 'New user joined',
		createdAt : new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('message', message);

		// socket.broadcast.emit('newMessage', {
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : new Date().getTime()
		// });

		io.emit('newMessage', {
			from : message.from,
			text : message.text,
			createdAt : new Date().getTime()
		});
	});

	// socket.emit('newEmail', {
	// 	from : 'mike@example.com',
	// 	text : 'heyyyyyuuu',
	// 	createdAt : new Date().getTime()
	// });
	//
	// socket.on('createEmail', (newEmail) => {
	// 	console.log('newEmail', newEmail);
	// });

	socket.on('disconnect', () => {
		console.log('Disconneted from server');
	});
});

server.listen(port, () => {
	console.log(`Server up on ${port}`);
});
