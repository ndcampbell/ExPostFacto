var massive = require('massive');
var connectionString = "postgres://epfUser:password@localhost/epfDb";
var db = massive.connectSync({connectionString: connectionString});

var createTables = function() {
    db.boardsTable.create_boards_table(function(err, result) {
    console.log("Created Boards Table", err, result)
  });
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

var getCards = function(columnid) {
  console.log('Getting all cards');
  var res = db.cards.findSync({columnid: columnid});
  return res;
}

var deleteCard = function(deleteCard) {
    console.log("Deleting ", deleteCard);
    db.cards.destroy(deleteCard, function(err, res) {
      console.log("Deleted ", res);
    });
}

var voteCard = function(cardData) {
  db.cards.find(cardData.cardId ,function(err,res) {
    if (!cardData.voted){
      db.cards.save({id: cardData.cardId, votes: res.votes-1 }, function(err, res) {
        console.log("Removed Vote", res);
      });
    } else {
      db.cards.save({id: cardData.cardId, votes: res.votes+1 }, function(err, res) {
        console.log("Added Voted", res);
      });
    }
  });
}

var addBoard = function(boardData) {
  console.log("Adding Board")
  db.boards.save(boardData, function(err,result){
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
  createTables,
  insertCard,
  getCards,
  deleteCard,
  voteCard,
  addBoard
}
