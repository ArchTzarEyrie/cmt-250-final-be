var express = require('express');
var router = express.Router();

router.post('/send-message', function(req, res, next) {
    console.log('[HTTP]: POST received from FE');
    console.log(req.body);
    res.send({text: `[RESPONSE]: Successful receipt of message: ${req.body.text}`});
});

module.exports = router;
