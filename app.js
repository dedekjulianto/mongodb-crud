const mongodb = require("mongodb");
const assert = require("assert");

// connect
const URL = "mongodb://localhost:27017";

const dbName = "todoapp";

const sampleTodos = [{
    text: "Learn MongoDB"
  },
  {
    text: "Learn typeorm"
  },
  {
    text: "Code Node.js"
  },
  {
    text: "Learn MYSQL"
  }
];

// use connect method to connect server
mongodb.connect(URL, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // insertTodo(db, sampleTodos, () => {
  //   console.log("insert data succes");
  // });
  //
  // findTodo(db, result => {
  //   console.log(result);
  // })

  // updateTodo(db, result => {
  //   // console.log(result);
  // })
  searchTodo(db, result => {
    console.log(result);
  })
  // deleteTodo(db, result => {
  //   // console.log(result);
  // })

  client.close();
});

// function insert with callback
const insertTodo = (db, documents, callback) => {
  db.collection("todos").insert(documents, (err, result) => {
    assert.equal(err, null);
    console.log("Inserted 4 todos");
    callback(result);
  });
};

const findTodo = (db, callback) => {
  db.collection("todos").find().toArray((err, result) => {
    assert.equal(err, null);
    console.log("All todos");
    callback(result);
  });
};

const searchTodo = (db, callback) => {
  db.collection("todos")
    .findOne(
          {text: "Code Node.js"},
      function(err, result) {
        assert.equal(err, null);
        console.log("Search");
        callback(result);
      }
    )
};

const updateTodo = (db, callback) => { // Arrow Function expression
  db.collection("todos")
    .updateOne({
        text: "Learn MongoDB"
      }, {
        $set: {
          text: "Learn Mongoseeee"
        }
      },
      function(err, result) {
        assert.equal(err, null);
        console.log("Updated !!!!");
        callback(result);
      }
    );
};

const deleteTodo = (db, callback) => {
  db.collection("todos")
    .deleteOne({
        text: "Learn MYSQL"
      },
      function(err, result) {
        assert.equal(err, null);
        console.log("delete...");
        callback(result);
      });
};
