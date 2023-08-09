require('dotenv').config();

const uri = "mongodb+srv://Meettrivedi:meet1234@cluster0.yogt7.mongodb.net/humberdb";
const config = {
  db: {
    uri: uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};

module.exports = config;