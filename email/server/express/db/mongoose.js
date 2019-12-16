// How to start the docker volume with 
// https://docs.docker.com/storage/volumes/

const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get("mongoURI");

const useMongo = async function() {
    try {
        const _connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB Connected...');
    } catch(e) {
        console.log(e);
    }
};

module.exports = useMongo
