const Course = require('../models/Course');
const Professor = require('../models/Professor');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

module.exports.getAllCourses = (req, res) => {

    Course.find({ published: true })
        .then(courses => {
            res.status(200).json({ courses })
        })
        .catch(err => res.status(404).send({ err }));

}

module.exports.getCoursesByInstructorId = (req, res) => {

    const { instructorId } = req.body;

    /* var id = mongoose.Types.ObjectId(instructorId); */
    Course.find({ published: true }).where(instructor.instructorId == instructorId)
        .then(courses => {
            res.status(200).json({courses})
        })
        .catch(err => res.status(404).send({ err }));

}

module.exports.createNewCourse = (req, res) => {

    const { title } = req.body;
    const newCourse = new Course({ title });
    newCourse.save()
        .then(newCourse => {
            res.status(201).json({ newCourse })
        })
        .catch(err => res.status(422).json({ err }));
}

module.exports.getCourseById = (req, res) => {
    console.log('ok');
    console.log(req.params.id);
    Course.findById(req.params.id)
        .then(course => {
            res.status(200).json({ course })
        })
        .catch(err => res.status(404).send({ err }));

}