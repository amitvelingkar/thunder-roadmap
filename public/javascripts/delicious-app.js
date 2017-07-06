import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import ajaxStar from './modules/star';
import ajaxComment from './modules/comment';
import ajaxMilestone from './modules/milestone';

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const commentBoxes = $$('.review__comment');
commentBoxes.on('keydown', ajaxComment);

const milestoneSelector = $$('.review__milestone');
milestoneSelector.on('change', ajaxMilestone);
