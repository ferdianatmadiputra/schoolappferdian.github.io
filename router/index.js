const router = require('express').Router();

const teachers = require('./teachers.js');
const subjects = require('./subjects.js');
const students = require('./students.js');
const IndexController = require('../controller/controller-index.js');

router.get('/', IndexController.getRootHandler);

router.use('/teachers', teachers);
router.use('/subjects', subjects);
router.use('/students', students);

module.exports = router;