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