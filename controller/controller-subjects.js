const { Subject } = require('../models');

class SubjectController {

    static getRootHandler (req, res) {
        Subject.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then( data => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: data,
                pageName: "Subjects Data",
                pageParagraph : "Our most-in-demand subjects:",
                tableHeader : ['ID', 'Subject Name']
            });
        })
        .catch(err => {
            res.send(err);
        })
    }

    static getById (req, res) {
        let id = +req.params.id;
        Subject.findByPk( id,
            { attributes: { exclude: ['createdAt', 'updatedAt'] }}
        )
        .then(data => {
            data = JSON.stringify(data,null,2);
            data = JSON.parse(data);
            res.render('datapage.ejs', {
                data: [data],
                pageName: "Subjects Data",
                pageParagraph : `Fitered by ID : ${id}`,
                tableHeader : ['ID', 'Subject Name']
            });
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = SubjectController;