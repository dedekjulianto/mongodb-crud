const personSchema = require("./person.js");
const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
const url = "mongodb://localhost:27017/sample";

let person = new personSchema({
  nama: "dedek julianto",
  email: "dedekproject@gmail.com",
  username: "dedekproject"
});


MongoClient.connect(url, function(err, db){
  err ? console.log(err) :  console.log("Koneksi ke MONGODB OK!");

  db.collection("persons").insertOne(person, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Simpan data person ok!");

      // update data
      let personUpdate = {
        nama: "Dedek Julianto"
      }
      db.collection("persons").updateOne({nama: person.nama}, personUpdate, function(err, result){
        if (err) {
          console.log(err);
        } else {
          console.log('Data person berhasil dimodifikasi!');
        }
        db.close();
      })
    }

  })

});
