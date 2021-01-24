const router = require('express').Router();
const SubjectController = require('../controller/controller-subjects');


router.get('/', SubjectController.getRootHandler);

router.get('/:id', SubjectController.getById);

module.exports = router;