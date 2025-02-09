const express = require('express');
const router = express.Router();
module.exports = router;

router.post("/getUser", async (req, res, next) => {
    res.status(200)
        .json({
            message: "User Details",
            data: req.user
        })

});

router.post("/post", async (req, res, next) => {
    console.log('inside ',req.user);
    console.log('inside ',req.body);
    req.body.team.userId = req.user[0]._id;
    console.log(req.body);
    postTeam.addTeam(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res
            .status(400)
            .json({
              message: "Some error",

            })
          } else if (resp) {
            console.log("inside resp");
            res.status(200)
            .json({
              message: "Team Added Successfully",
              data: resp
            })
          } else {
            res
            .status(400)
            .json({
              message: "Some error",

            })
          }
    });

 });
