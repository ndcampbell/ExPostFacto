var massive = require('massive');
var connectionString = "postgres://epfUser:password@localhost/epfDb";
var db = massive.connectSync({connectionString: connectionString});

var createTables = function() {
    db.cardsTable.create_cards_table(function(err, result) {
    console.log("Created Cards Table", err, result)
  });
}

var insertCard = function(newCard) {
  console.log("Inserting New Card", newCard)
  db.cards.save(newCard, function(err,result){
    console.log(result);
  });
}

var getCards = function() {
  console.log('Getting all cards');
  var res = db.runSync("select * from cards");
  return res;
}

var deleteCard = function(deleteCard) {
    console.log("Deleting ", deleteCard);
    db.cards.destroy(deleteCard, function(err, res) {
      console.log("Deleted ", res);
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
  createTables,
  insertCard,
  getCards,
  deleteCard
}
