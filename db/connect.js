const mongoose = require("mongoose");

const url =
  'mongodb+srv://pankaj:pankaj1975@cluster0.nkcpypm.mongodb.net/list?retryWrites=true&w=majority';

  var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 300000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 300000 } }
  };

  mongoose.set('strictQuery', false);

const connectDB = () => {
  mongoose
    .connect(url, { useNewUrlParser: true, 
                  
        useUnifiedTopology: true  },options)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;