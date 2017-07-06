const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const workflowController = require('../controllers/WorkflowController');
const milestoneController = require('../controllers/MilestoneController');
const featureController = require('../controllers/FeatureController');
const reviewController = require('../controllers/ReviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(featureController.getFeatures));
router.get('/workflows', catchErrors(workflowController.getWorkflows));
router.get('/workflow/add',
    authController.isLoggedIn,
    workflowController.addWorkflow
);
router.post('/workflow/add',
    catchErrors(workflowController.createWorkflow)
);
router.post('/workflow/add/:id',
    catchErrors(workflowController.updateWorkflow)
);
router.get('/workflows/:id/edit', catchErrors(workflowController.editWorkflow));
router.post('/workflow/add/:id',
    catchErrors(workflowController.updateWorkflow)
);
router.post('/workflow/:id/moveup',
    catchErrors(workflowController.moveUp),
    catchErrors(workflowController.reorderAll)
);
router.post('/workflow/:id/movedown',
    catchErrors(workflowController.moveDown),
    catchErrors(workflowController.reorderAll)
);
router.get('/features', catchErrors(featureController.getFeatures));
router.get('/feature/:slug', 
    authController.isLoggedIn,
    catchErrors(featureController.getFeatureBySlug)
);
router.get('/feature/add',
    authController.isLoggedIn,
    featureController.addFeature
);
router.post('/feature/add',
    catchErrors(featureController.createFeature)
);
router.post('/feature/add/:id',
    catchErrors(featureController.updateFeature)
);
router.get('/features/:id/edit',
    authController.isLoggedIn,
    catchErrors(featureController.editFeature)
);
router.post('/feature/add/:id',
    catchErrors(featureController.updateFeature)
);
/*
router.post('/feature/:id/rank',
    catchErrors(featureController.updateRank)
);
*/

router.get('/milestones', catchErrors(milestoneController.getMilestones));
router.get('/milestone/add',
    authController.isLoggedIn,
    milestoneController.addMilestone
);
router.post('/milestone/add',
    catchErrors(milestoneController.createMilestone)
);
router.post('/milestone/add/:id',
    catchErrors(milestoneController.updateMilestone)
);
router.get('/milestones/:id/edit',
    authController.isLoggedIn,
    catchErrors(milestoneController.editMilestone)
);
router.post('/milestone/add/:id',
    catchErrors(milestoneController.updateMilestone)
);
router.post('/milestone/:id/moveup',
    catchErrors(milestoneController.moveUp),
    catchErrors(milestoneController.reorderAll)
);
router.post('/milestone/:id/movedown',
    catchErrors(milestoneController.moveDown),
    catchErrors(milestoneController.reorderAll)
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);


router.get('/register', userController.registerForm);
// 1. validate the data
// 2. register the user
// 3. log the user in
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/logout', authController.logout);

router.get('/account', userController.account);
router.post('/account',
    authController.isLoggedIn,
    catchErrors(userController.updateAccount)
);

router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
    authController.confirmPasswords,
    catchErrors(authController.update)
);

/*
    API
*/
router.post('/api/v1/feature/:id/review/rating', catchErrors(reviewController.rating));
router.post('/api/v1/feature/:id/review/comment', catchErrors(reviewController.comment));
router.post('/api/v1/feature/:id/review/milestone', catchErrors(reviewController.milestone));
router.post('/api/v1/feature/:id/rank', catchErrors(featureController.updateRank));

module.exports = router;
