/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// determine what stage of a feature for a review 
exports.getStage = (review) => {
  let stage = -1;
  if (review) {
    if(review.milestone && review.milestone.order === 1) {
      stage = 0;
    } else if (review.rating) {
      stage = review.rating;
    }
  } 
  return stage;
};


// Some details about the site
exports.siteName = `Roadmap`;

exports.menu = [
  { slug: '/features', title: 'Features', icon: 'cake', },
  { slug: '/workflows', title: 'Workflows', icon: 'workflow', },
  { slug: '/milestones', title: 'Milestones', icon: 'milestone', }
];
