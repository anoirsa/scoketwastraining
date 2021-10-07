// Import components
const express = require("express");
const cors = require('cors');

// Initilize variables 
const app = express();
const PORT = process.env.PORT || 4000

var server = app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`)
})
let io = require('socket.io')(server,{
    cors: { origin: "http://localhost:3000"}
});

app.get('/', (req, res) => {
    res.send({message : 'This is the main route'})
})
app.use(cors());
app.use('/chatapp',require('./router.js')(io))




