const Category = require('../models/Category');

module.exports.getAllCategories = (req, res) => {
    Category.find()
        .then((categories) => res.status(200).json({categories}))
        .catch(err => res.json({ err }));
}

module.exports.getCategory = (req, res) => {
    Category.findById(req.params.id)
        .then((category) => {
            if (category) {
                res.status(200).json({category});
            } else {
                res.status(404);
            }


        }).catch((err) => {
            if (err) {
                throw (err);
            }
        })
}

module.exports.createCategory = (req, res) => {

    const { title, picture } = req.body;

    const category = new Category(
        {
            title,
            picture
        }
    )

    category.save()
        .then((category) => res.status(201).json({
            "category": category, "message": "New Category created"
        }))
        .catch(err => res.json({ err }))

    

}

module.exports.updateCategory = (req, res) =>  {
    
}

module.exports.deleteCategory = (req, res) => {

    Category.findOneAndRemove(req.params.id).then((category) => {
        if (category) {
            res.json({
                "category": category, "message": "Category deleted"
            });
        } else {
            res.sendStatus(404);
        }


    }).catch((err) => {
        if (err) {
            throw (err);
        }
    })
}
