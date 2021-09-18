const Comment = require('../models/comment');
const Tweet=require('../models/tweet'); 

const create = function(req, res) {
    // console.log(req.body);
    Tweet.findById(req.body.tweet,function(err,tweet){
        if (err) {
            console.log('err in finding tweet');
            return;
        }
        if(tweet){
            // console.log(tweet);
            Comment.create({
                content: req.body.content,
                tweet: req.body.tweet,
                user: req.user._id
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

const destroy= function (req, res){
    Comment.findById(req.params.id, function(err, comment){
        // console.log(comment);
        if (err) {
            console.log('err in deleting comment');
            return res.redirect('/');
        } 
        if(comment.user == req.user.id){
            comment.remove();
            /* deleting the comment in tweet array */
            Tweet.findByIdAndUpdate(comment.tweet,{ $pull:{ comments: req.params.id }},function(err,tweet){
                if (err) {
                    console.log('err in finding tweet of comment');
                    return res.redirect('/');
                }
                // console.log(tweet);
                tweet.comments.pop(req.params.id);
                // console.log(tweet);
                tweet.save();
            })

        }
        return res.redirect('back');
    });
}

module.exports = {
    create ,destroy
};