const ejs = require('ejs');
const Tweet=require('../models/tweet');
const User=require('../models/user');

module.exports.root = function (req, res) {
    Tweet.find({}).populate('user').populate({
        path: 'comments ',
        populate:{
            path:'user'
        }
    }).exec(async function (err, tweets) {
        if (err) {
            console.log(err);
            fetchedTweets=[];
        }
        const users= await User.find({});
        // console.log(tweets[2].comments);
        let fetchedTweets= tweets;
        return res.render('home', {
            title: "Twitter" ,
            tweets:fetchedTweets,
            users: users
        });
    });
}