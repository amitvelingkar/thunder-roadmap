import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import ajaxStar from './modules/star';
import ajaxMilestone from './modules/milestone';

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const milestoneSelector = $$('.review__milestone');
milestoneSelector.on('change', ajaxMilestone);
