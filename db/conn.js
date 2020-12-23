const mongoose = require("mongoose");

// connecting mongoose
mongoose
  .connect("mongodb://localhost:27017/Studentdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .then(() => {
    console.log("connected successfully...");
  }).catch(err=>{
      console.log(err);
  });
