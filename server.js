const express = require('express'); //getting express
const mongoose = require('mongoose'); //getting mongoose

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express(); //setting app to express
//DB config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));




//making simple get route
app.get('/', (req, res) => {
    res.send('Hello')
})
// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//setting up port
const port = process.env.PORT || 5000;
//getting server started
app.listen(port, () => console.log(`All systems running on port ${port}`))