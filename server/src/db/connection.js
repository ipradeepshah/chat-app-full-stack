const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try{
        const res =await mongoose.connect('mongodb://127.0.0.1:27017/chatappDb');
        if(res){
           console.log('Database connected');
        } 
    }catch (err) {
        console.log(err);
    }
    
}


module.exports = dbConnect;