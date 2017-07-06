import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import ajaxStar from './modules/star';
import ajaxRank from './modules/rank';
import ajaxComment from './modules/comment';
import ajaxMilestone from './modules/milestone';

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const rankForms = $$('form.rank');
rankForms.on('submit', ajaxRank);

const commentBoxes = $$('.review__comment');
commentBoxes.on('keydown', ajaxComment);

const milestoneSelector = $$('.review__milestone');
milestoneSelector.on('change', ajaxMilestone);
