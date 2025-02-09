const postTeam = require("../../models/teams.model").TeamModel;
const postUser = require("../../models/users.model").UserModel;

function addTeam(project, callback) {
    console.log(project.team);
    console.log(project.team);
    console.log("hiii");
    postTeam.create(project.team, (err, res) => {
      if (err) {
        console.log("error while adding product:", err);
        callback(err, null);
      } else if (res) {
        postUser.updateOne(
          {
            _id: project.team.userId
          },
          { $set: { "companyId": res._id, "companyName": project.team.teamName } }, function (err, user) {
            console.log(user);
            if (err) {
              console.log("error while adding product:", err);
              callback(err, null);
            } else if (user) {
              console.log("Bene getting successfully:", user);
              //callback(null, user);
            } else {
              callback(null, null);
            }
  
          });
        console.log("project added successfully:", res);
        callback(null, res);
      } else {
        callback(null, null);
      }
    });
  }
  