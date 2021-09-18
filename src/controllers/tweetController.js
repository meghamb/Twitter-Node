const Tweet = require('../models/tweet');
const Comment = require('../models/comment');

const create = async function(req, res) {
    try {
        await Tweet.create({
            content:req.body.content,
            user:req.user._id
        }) ;
        req.flash ('info', 'Tweet created');
        return res.redirect('back');
    } catch(err) {
        console.log(err);
        return;
    }
}

const destroy= async function (req, res){
    try {
        const tweet= await Tweet.findById(req.params.id);
        /* console.log(req.user._id, typeof(tweet,req.user._id),req.user.id, typeof(tweet,req.user.id));
        req.user._id is object while req.user.id is string 
        check when to use _id and id */
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
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

module.exports = {
    create ,destroy
}