import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';
import ajaxHeart from './modules/heart';
import ajaxStar from './modules/star';
import ajaxMilestone from './modules/milestone';

autocomplete($('#address'), $('#lat'), $('#lng'));
typeAhead( $('.search') );

makeMap( $('#map') );

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const milestoneSelector = $$('.rating__milestone');
milestoneSelector.on('change', ajaxMilestone);
