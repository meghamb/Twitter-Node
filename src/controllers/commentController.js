const Comment = require('../models/comment');
const Tweet=require('../models/tweet'); 

const create = function(req, res) {
    console.log(req.body);
    Tweet.findById(req.body.tweet,function(err,tweet){
        if (err) {
            console.log('err in finding tweet');
            return;
        }
        if(tweet){
            // console.log(tweet);
            Comment.create({
                content:req.body.content,
                tweet: req.body.tweet,
                user:req.user._id
            },function(err,comment){
                if (err) {
                    console.log('err in creating comment');
                    return res.redirect('/');
                }
                tweet.comments.push(comment);
                tweet.save();
                return res.redirect('/');
            })
        }
    });
}
module.exports = {
    create 
};