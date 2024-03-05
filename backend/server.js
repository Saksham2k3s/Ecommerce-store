const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./db/database');
const error = require('./middleware/error');
const cloudinary = require('cloudinary')

// handling uncaught exception

process.on('uncaughtException', (err) => {
    console.log("Error : ", err.message);
    console.log('Shutting down the server due to uncaught promose rejection');
    process.exit(1)
})

// Load environment variables from config file
dotenv.config({ path: 'backend/config/config.env' });

//connect to database
connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})

// Start the server on the specified port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
});


//unhandled promise Rejection

process.on('unhandledRejection', error => {
    console.log("Error : ", error.message);
    console.log("Shuttinh down the server due to inhandle promise rejection");
    server.close(() => {
        process.exit(1);
    })
});