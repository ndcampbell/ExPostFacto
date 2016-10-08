var massive = require('massive');
var connectionString = "postgres://epfUser:password@localhost/epfDb";
var db = massive.connectSync({connectionString: connectionString});

function createTables() {
    db.cardsTable.create_cards_table(function(err, result) {
    console.log("Created Cards Table", err, result)
  });
}

function insertCard(newCard) {
  console.log("Inserting New Card", newCard)
  db.cards.save(newCard, function(err,result){
    console.log(result);
  });
}
//test function to show massive usage
//function makeNewUser() {
//    var newUser = {
//      email : "test2@test.com",
//      first : "Joe",
//      last : "Test"
//    };

//    db.users.save(newUser, function(err,result){
 //     console.log(result);
//    });
//}

module.exports = {
  createTables: createTables(),
  insertCard: insertCard(),
}
