const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, '../public');

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/', (req, res) => {
	res.render('index.html')
});

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
