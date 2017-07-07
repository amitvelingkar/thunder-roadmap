import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import ajaxStar from './modules/star';
import ajaxRank from './modules/rank';
import ajaxComment from './modules/comment';
import ajaxMilestone from './modules/milestone';

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const rankBoxes = $$('.feature__rank');
rankBoxes.on('keydown', ajaxRank);
rankBoxes.on('blur', ajaxRank);

const commentBoxes = $$('.review__comment');
commentBoxes.on('keydown', ajaxComment);
commentBoxes.on('blur', ajaxComment);

const milestoneSelector = $$('.review__milestone');
milestoneSelector.on('change', ajaxMilestone);
