const router = require('express').Router();
const StudentController = require('../controller/controller-students')


router.get('/', StudentController.getRootHandler);

router.get('/add', StudentController.getAddFormHandler);

router.post('/add', StudentController.postAddFormHandler);

router.get('/:id/edit', StudentController.getEditHandler);

router.post('/:id/edit', StudentController.postEditHandler);

router.get('/:id/delete',StudentController.getDelete)

router.get('/:email', StudentController.getByEmailHandler);

module.exports = router;