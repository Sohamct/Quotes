const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://abhishekjamkar29:E0Hj6IBYIkiXJ3Co@quotes.by4t4gn.mongodb.net/?retryWrites=true&w=majority&appName=Quotes";

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoUri);
        console.log("successfully connected to mongodb");
    }catch(error){  
        console.log("Failed to connect with mongodb");
    }
}
module.exports = connectToMongo;