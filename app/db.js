var massive = require('massive');
var connectionString = "postgres://epfUser:password@localhost/epfDb";
var db = massive.connectSync({connectionString: connectionString});

//test function to show massive usage
function makeNewUser() {
    var newUser = {
      email : "test2@test.com",
      first : "Joe",
      last : "Test"
    };

    db.users.save(newUser, function(err,result){
      console.log(result);
    });
}

module.exports = {
  makeNewUser: makeNewUser()
}
