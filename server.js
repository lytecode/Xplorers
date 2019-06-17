const express =  require('express');
const mongoose = require('mongoose');

const app = express(),
	 	  
//Requiring routes
const router = require('./app/routes/route');
const User = require('./app/models/User');

const mongodb = require('./config/mongoDB');


const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
	res.status(404).json({ msg: 'Page not found'});
})

// app.use(router);

app.listen(PORT, () =>{
	console.log(`app started on port ${PORT}`);
});
