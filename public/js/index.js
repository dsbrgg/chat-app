var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from : 'jen',
		text : 'hey hey hey'
	});

	// socket.emit('createEmail', {
	// 	to : 'jen@example.com',
	// 	text : 'heyeeeeee'
	// });
});

socket.on('newMessage', function(message) {
	console.log(message);
});

// socket.on('newEmail', function(email) {
// 	console.log(JSON.stringify(email));
// });

socket.on('disconnect', function() {
	console.log('Disconnected from server client');
});
 
