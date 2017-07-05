const express = require('express');
const router = express.Router();
const storeController = require('../controllers/StoreController');
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const reviewController = require('../controllers/ReviewController');
const workflowController = require('../controllers/WorkflowController');
const milestoneController = require('../controllers/MilestoneController');
const featureController = require('../controllers/FeatureController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/add',
    authController.isLoggedIn,
    storeController.addStore
);
router.post('/add',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore)
);
router.post('/add/:id',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore)
);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/hearts', authController.isLoggedIn,catchErrors(storeController.getHearts));

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
router.get('/features/:id/edit', catchErrors(featureController.editFeature));
router.post('/feature/add/:id',
    catchErrors(featureController.updateFeature)
);
router.post('/feature/:id/rank',
    catchErrors(featureController.updateRank)
);


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
router.get('/milestones/:id/edit', catchErrors(milestoneController.editMilestone));
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

router.get('/map',storeController.showMap);

router.post('/reviews/:id',
    authController.isLoggedIn,
    catchErrors(reviewController.addReview)
);

router.get('/top', catchErrors(storeController.getTopStores));

/*
    API
*/

router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));
router.post('/api/v1/store/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
