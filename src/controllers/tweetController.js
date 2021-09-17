const Tweet = require('../models/tweet');

const create = function(req, res) {
    // console.log(req);
    Tweet.create({
        content:req.body.content,
        user:req.user._id
    },function(err){
        if (err) {
            console.log('err in creating tweet');
            return;
        }
        return res.redirect('back');
    })
}

module.exports = {
    create 
}