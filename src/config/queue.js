const kue = require('kue');
/* https://www.npmjs.com/package/kue */

/* we need a kue.workers, which focuses on 1 type of kue to give coresponiding message */
const queue = kue.createQueue();

/*  to open kue dashboard  ./node_modules/kue/bin/kue-dashboard -p 3050 */
module.exports = queue;
