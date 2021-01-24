const { Teacher } = require('../models');

class TeacherController {

    static getRootHandler (req, res) {
        Teacher.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then( data => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: data,
                pageName: "Teachers Data",
                pageParagraph : "Our determined teachers:",
                tableHeader : ['ID', 'First Name', 'Last Name', 'Email', 'Gender']
            });
        })
        .catch(err => {
            res.send(err);
        })
    }

    static getById (req, res) {
        let id = +req.params.id;
        Teacher.findByPk( id,
            { attributes: { exclude: ['createdAt', 'updatedAt'] }}
        )
        .then(data => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: [data],
                pageName: "Teachers Data",
                pageParagraph : `Filtered by ID: ${id}`,
                tableHeader : ['ID', 'First Name', 'Last Name', 'Email', 'Gender']
            });
        })
        .catch(err => {
            res.send(err);
        })

    }
}

module.exports = TeacherController;