const ejs = require('ejs');
const Tweet=require('../models/tweet');

module.exports.root = function (req, res) {
    Tweet.find({}).populate('user').exec(function (err, tweets) {
        // console.log(tweets);
        let fetchedTweets= tweets;
        if (err) {
            console.log(err);
            fetchedTweets=[];
        }
        return res.render('home', { title: "Twitter" ,tweets:fetchedTweets});
    });
}