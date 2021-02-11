const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Teacher = mongoose.model('Teacher', new mongoose.Schema({
  staffnumber: String,
  firstname: String,
  lastname: String,
  level: String,
  classheld: String,

}));

const Student = mongoose.model('Student', new mongoose.Schema({
    studentnumber: String,
    firstname: String,
    lastname: String,
    classheld: String
}));

//const Everyone = mongoose.model('everyone', new mongoose.Schema({
  
 //}));


async function createTeacher( staffnumber,firstname, lastname, level, classheld ) { 
  const teacher = new Teacher({
  staffnumber,
  firstname,
  lastname,
  level,
  classheld
  
  });

  const result = await teacher.save();
  console.log(result);
}

async function createStudent( studentnumber, firstname, lastname, classheld ) {
  const course = new Student({
    studentnumber,
    firstname,
    lastname,
    classheld
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}



/*async function teacherStudent() { 
  const everyone = await Student.aggregate().lookup
    ({
    from: "teachers",
    localField: "classheld",
    foreignField: "classheld",
    as: "teacher"
    })
    res.send(everyone)
  }
*/


//const data = mongoose.Collection('every').find()

/*const Teacherstudent = mongoose.Aggregate([
  {
  $lookup: {
  from: "Teacher",
  localField: "classheld",
  foreignField: "classheld",
  as: "Teacherstudent"
  }
  },
  {
  $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
  },
  { $project: { fromItems: 0 } }
  ]) */

//createTeacher('staff009', 'Monday', 'Joseph', 'level 8', 'SSS 1');

//createStudent('Stud020', 'Isiaq', 'Kayode', 'JSS 1')

//listCourses();

//teacherStudent();


exports.Teacher = Teacher;
exports.Student = Student;

// exports.Teacherstudent = Teacherstudent;