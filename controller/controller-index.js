
class IndexController {
    static getRootHandler (req, res) {
        let link = ['/teachers','/subjects','/students'];
        let dir = ['Teachers Page','Subjects Page','Students Page'];
        res.render('home.ejs',{
            dir: dir,
            link: link
        });
    }
}

module.exports = IndexController;