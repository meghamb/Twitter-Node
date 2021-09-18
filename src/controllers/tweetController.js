const Tweet = require('../models/tweet');
const Comment = require('../models/comment');

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

const destroy= function (req, res){
    Tweet.findById(req.params.id, function(err, tweet){
        /* console.log(req.user._id, typeof(tweet,req.user._id),req.user.id, typeof(tweet,req.user.id));
        req.user._id is object while req.user.id is string 
        check when to use _id and id */

        if (err) {
            console.log('err in deleting tweet');
            return res.redirect('/');
        } 
        if(tweet.user == req.user.id){
            tweet.remove();
            Comment.deleteMany({tweet: req.params.id},function(err, comments){
                console.log(comments);
                if (err) {
                    console.log('err in deleting tweet comments');
                }
            });
        }
        return res.redirect('back');
    });
}

module.exports = {
    create ,destroy
}