import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import ajaxStar from './modules/star';
import ajaxRank from './modules/rank';
import ajaxComment from './modules/comment';
import ajaxMilestone from './modules/milestone';

import ajaxFeatureName from './modules/feature-name';
import ajaxFeatureDesc from './modules/feature-description';
import ajaxFeatureCost from './modules/feature-cost';
import ajaxFeatureDependency from './modules/feature-dependency';
import ajaxFeatureTargetMilestone from './modules/feature-target-milestone';
import ajaxFeatureGrowth from './modules/feature-growth';
import ajaxFeatureSentiment from './modules/feature-sentiment';

const starForms = $$('form.star');
starForms.on('submit', ajaxStar);

const rankBoxes = $$('.feature__rank');
rankBoxes.on('keydown', ajaxRank);
rankBoxes.on('blur', ajaxRank);

const commentBoxes = $$('.review__comment');
commentBoxes.on('keydown', ajaxComment);
commentBoxes.on('blur', ajaxComment);

const inputName = $$('.feature__name');
inputName.on('keydown', ajaxFeatureName);
inputName.on('blur', ajaxFeatureName);

const inputDesc = $$('.feature__description');
inputDesc.on('keydown', ajaxFeatureDesc);
inputDesc.on('blur', ajaxFeatureDesc);

const milestoneSelector = $$('.review__milestone');
milestoneSelector.on('change', ajaxMilestone);

const growthSelector = $$('.feature__growth');
growthSelector.on('change', ajaxFeatureGrowth);

const sentimentSelector = $$('.feature__sentiment');
sentimentSelector.on('change', ajaxFeatureSentiment);

const costSelector = $$('.feature__cost');
costSelector.on('change', ajaxFeatureCost);

const targetMilestoneSelector = $$('.feature__targetMilestone');
targetMilestoneSelector.on('change', ajaxFeatureTargetMilestone);

const dependencyToggles = $$('.feature__dependency');
dependencyToggles.on('change', ajaxFeatureDependency);
