const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express()
const port = 5000;
connectToMongo();

//middleware
app.use(cors());
app.use(express.json());

//Available Routes 
app.get('/', (req, res) => {   
    res.send('Hello RAKESH!')
})
app.listen(port, () => {    
    console.log(`iNotebook app listening on port ${port}`);
})

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes'));
// app.use('/api/blogs', require('./routes/blogs'));



