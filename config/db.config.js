 require("dotenv").config();
 const mongoDBURL = process.env.MONDB_URI || 'mongodb://127.0.0.1:27017/crmApp'; 

 module.exports = {mongoDBURL};