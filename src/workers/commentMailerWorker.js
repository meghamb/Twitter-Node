const queue = require('../config/queue');
const { newCommentMailer } = require('../mailers/comments_mailer');

/* you can send messages to phone using firebase */

queue.process('email', function (job, done) {
  console.log('Email worker started', job.data);
  newCommentMailer(job.data);
  done();
});
