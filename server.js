const express = require('express');


const app = express();



app.get('/' , (req,res) => {
    res.send('hello from the main page')
})





app.listen(8000 , () => {
    console.log('app running on port 8000');
})