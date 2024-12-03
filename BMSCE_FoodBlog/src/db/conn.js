const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Shravanth_J:Jaga1979@cluster0.gtnryvj.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("connection succesful");
}).catch((e) => {
  console.log("not succesful");
})
