const { Student } = require('../models');
// const student = require('../models/student');

class StudentController {

    static getRootHandler (req, res) {
        Student.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then((data) => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: data,
                pageName: "Students Data",
                pageParagraph : "Our life-long students:",
                tableHeader : ['ID', 'First Name', 'Last Name', 'Email', 'Gender', 'Birth Date', 'Options']
            });
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddFormHandler (req, res) {
        let errorValidation = req.query.alert;
        res.render('formstudents.ejs', {
            student : {
                first_name: "",
                last_name: "",
                email: "",
                gender: "",
                birth_date: "2000-10-10"
            },
            pageName: "Add Students Data",
            pageParagraph : "Input new student below:",
            buttonName : "Add Student",
            action: "/students/add",
            errorValidation : errorValidation            
        });
    }

    static validate (student) {
        const error = [];
        if (!student.first_name) {
            error.push(' Please fill First Name')
        }
        if (!student.last_name) {
            error.push(' Please fill Last Name');
        }
        if (!student.email) {
            error.push(' Please fill Email');
        } else {
            if (!student.email.includes('@')){
                error.push(' Please input correct email address');
            } else if (!student.email.includes('.')){
            error.push(' Please input correct email address');
            } else if (student.email[0] === '.' || student.email[student.email.length -1] === '.'){
                error.push(' Please input correct email address');
            }
        }
        
        if (!student.gender) {
            error.push(' Please choose a gender');
        }
        if (!student.birth_date) {
            error.push(' Please fill Birth Date');
        }
        return error;
    }

    static postAddFormHandler (req, res) {
        let newStudent = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            birth_date: req.body.birthDate,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        let errorValidation = StudentController.validate(newStudent);

        if (errorValidation.length){
            res.redirect(`/students/add?alert=${errorValidation}`);
        } else {
            Student.create(newStudent, {
                // found a problem if fields is not set,
                // it will automatically try insert to all columns,
                // which includes id properties and try to set with default values,
                // but it seems the feature on postgres still buggy if we use seed data
                // (cant remember last id in db when we insert new data after we run seeder)
                // ref: https://github.com/sequelize/sequelize/issues/9295
                // my workaround:
                // fields need to be written down in order to exclude id fields in raw query
                fields: ['first_name', 'last_name','email','gender','birth_date','createdAt','updatedAt'] 
            })
            .then((obj) => {
                // console.log(obj);
                res.redirect('/students');
            })
            .catch(err => {
                    res.send(err);
            })
        }
    }

    static getEditHandler (req, res) {
        let errorValidation = req.query.alert;
        let idToFind = +req.params.id;
        Student.findByPk(idToFind)
        .then(data =>{
            res.render('formstudents.ejs', {
                student : data, //data is instance
                pageName: "Edit Students Data",
                pageParagraph : "Input new student below:",
                buttonName :"Edit Student",
                action: `/students/${idToFind}/edit`,
                errorValidation : errorValidation   
            })
        })
        .catch(err => { res.send(err)});
    }

    static postEditHandler (req, res) {
        let editedStudent = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            birth_date: req.body.birthDate,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        let errorValidation = StudentController.validate(editedStudent);
        let idToEdit = +req.params.id;

        if (errorValidation.length){
            res.redirect(`/students/${idToEdit}/edit?alert=${errorValidation}`);
        } else {
            Student.update(editedStudent, {
                where: { id: idToEdit }
            })
            .then(()=> {
                res.redirect('/students');
            })
            .catch((err) => {
                    res.send(err);
            })
        }
    }

    static getDelete (req, res) {
        let idToDel = +req.params.id;
        Student.destroy({
            where: { id: idToDel }
        })
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => res.send(err));
    }

    static getByEmailHandler (req, res) {
        let email = req.params.email;
        Student.findOne({
            where: { email: email },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then(data => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: [data],
                pageName: "Students Data",
                pageParagraph : `Filtered by email: ${email}`,
                tableHeader : ['ID', 'First Name', 'Last Name', 'Email', 'Gender', 'Birth Date', 'Options']
            });
        })
        .catch(err => {res.send(err)})
    }
}

module.exports = StudentController;