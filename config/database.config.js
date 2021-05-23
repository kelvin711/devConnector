// module.exports = {
//     mongoURI: 'mongodb+srv://Kelvin:password321@devconnector.dgyil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// }
const db = require('./keys').mongoURI;
const mongoose = require("mongoose"),//importing mongoose 
    uri = db; //setting our database name

mongoose.connect( uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
    
//Note: The useNewUrlParser and useUnifiedTopology are options we pass to get rid of deprecation 
//messages in our terminal.

//Note: If you connect to a database that doesn't exist, Mongoose will create the 
//DB for you as soon as you create your first document!