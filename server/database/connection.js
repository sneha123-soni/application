const mongoose = require('mongoose');

/*
const connectDB = async () => {
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI,{
              //  useNewUrlParser: true,
              //  useUnifiedTopology: true,
                // useFindAndModify: false,
                // useCreateIndex: true
        })
      //  console.log('MongoDB connected : ${con.connection.host}');
     } catch(err){
        console.log(err);
        process.exit(1);
    }   
}*/


const connectDB = async () => {
    try{
       const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );

     } catch(err) {
       console.log(err);
       process.exit(1);

    }
};


module.exports = connectDB