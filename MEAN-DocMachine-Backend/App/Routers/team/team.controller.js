const TeamModel = require('./team.model');

function addTeam(newPackage, callback) {
    console.log(newPackage);
    TeamModel.addTeam(newPackage, (err, res) => {

        console.log("hello22");
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}