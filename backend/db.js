const mongoose = require('mongoose');
//   create data base i notebook in for user modles data save 
const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
}
module.exports = connectToMongo;