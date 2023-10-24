const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/medDatabase',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(db => console.log('Database connected succesfully'))
.catch(err => console.log('Error to try estabilished connecion', err))