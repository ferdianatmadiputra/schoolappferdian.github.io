const router = require('express').Router();
const TeacherController = require('../controller/controller-teachers');


router.get('/', TeacherController.getRootHandler);

router.get('/:id', TeacherController.getById);

module.exports = router;