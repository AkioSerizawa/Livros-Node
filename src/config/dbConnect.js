import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://AkioSerizawa:serizawa12@livros-node.ldf1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

let db = mongoose.connection;

export default db;
