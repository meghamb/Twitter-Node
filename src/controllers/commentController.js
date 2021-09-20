const queue = require('../config/queue');
const Comment = require('../models/comment');
const Tweet = require('../models/tweet');
const commentsEmailWorker = require('../workers/commentMailerWorker');
// const { newCommentMailer } = require('../mailers/comments_mailer');

const create = async function (req, res) {
  try {
    const tweet = await Tweet.findById(req.body.tweet).populate('user');
    const comment = await Comment.create({
      content: req.body.content,
      tweet: req.body.tweet,
      user: req.user._id,
    });
    tweet.comments.push(comment);
    tweet.save();
    /*  from kue docs to queue for emails job */
    let job = queue.create('email', tweet).save(function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('email enqueued', job.id);
    });
    // newCommentMailer(tweet);
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

const destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      comment.remove();
      /* deleting the comment in tweet array */
      const tweet = await Tweet.findByIdAndUpdate(comment.tweet, {
        $pull: { comments: req.params.id },
      });
      tweet.comments.pop(req.params.id);
      // console.log(tweet);
      tweet.save();
    }
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

module.exports = {
  create,
  destroy,
};
