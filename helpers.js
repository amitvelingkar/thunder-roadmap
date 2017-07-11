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
  if (review && review.milestone) {
    if(review.milestone.order === 1) {
      stage = 0;
    } else if (review.rating) {
      stage = review.rating;
    }
  } 
  return stage;
};

exports.reviewTooltip = (workflow, review) => {
  let tooltip = workflow.name;
  if (review) {
    if (review.rating) {
      tooltip = tooltip + ` ~ Rating: ${review.rating} of 5`;
    }
    if(review.milestone && review.milestone) {
      tooltip = tooltip + ` ~ Milestone: ${review.milestone.name}`;
    }
  } else {
    tooltip = tooltip + ' ~ Not Reviewed';
  }
  return tooltip;
};

exports.getSentimentIcon = (sentiment) => {
  let moodIcon = this.icon('sentiment_neutral');
  if (sentiment) {
    switch (sentiment.order) {
      case 1:
        moodIcon = this.icon('sentiment_very_dissatisfied');
        break;
      case 2:
        moodIcon = this.icon('sentiment_dissatisfied');
        break;
      case 3:
        moodIcon = this.icon('sentiment_neutral');
        break;
      case 4:
        moodIcon = this.icon('sentiment_satisfied');
        break;
      case 5:
        moodIcon = this.icon('sentiment_very_satisfied');
        break;
      default:
        moodIcon = this.icon('sentiment_neutral');
    }
  }
  return moodIcon;
};

// Some details about the site
exports.siteName = `Roadmap`;

exports.menu = [
  { slug: '/features', title: 'Features', icon: 'cake' },
  { slug: '/workflows', title: 'Workflows', icon: 'workflow' },
  { slug: '/milestones', title: 'Milestones', icon: 'milestone' },
  { slug: '/growths', title: 'Growth', icon: 'local_florist' },
  { slug: '/sentiments', title: 'Mood', icon: 'mood' }
];

exports.ratings = [
  { value: 1, description: 'does not exist or completely broken 😭' },
  { value: 2, description: 'lots of bugs or huge feature gaps 😞' },
  { value: 3, description: 'incomplete feature - meh 😑' },
  { value: 4, description: 'almost there, couple of things to fix 🙂' },
  { value: 5, description: 'done - works perfectly 😀' }
];
