const express =require('express')
const app = express();
require('./database');




app.use(require('./routes/userRoutes'))



app.listen(4000);
console.log("Server on port", 4000);

