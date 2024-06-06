const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const url= process.env.DB_URL

mongoose.connect(url)
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });
    

module.exports = mongoose;