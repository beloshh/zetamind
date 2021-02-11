
const { Teacher, Student} = require("./populate");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/teacher', async (req, res, next) => {
    const teacher = await Teacher.find()
    .select("-__v -_id")
    .sort("staffnumber");
  res.send(teacher);
})

app.post("/teacher", async (req, res) => {
    
    let teacher = new Teacher({
        staffnumber: req.body.staffnumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        level: req.body.level,
        classheld: req.body.classheld,
    });
    teacher = await teacher.save();
  
    res.send(teacher);
});



app.get('/student', async (req, res, next) => {
    const student = await Student.find()
    .select("-__v -_id")
    .sort("studentnumber");
  res.send(student);
})

app.post("/student", async (req, res) => {
    
    let student = new Student({
        studentnumber: req.body.staffnumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        classheld: req.body.classheld,
    });
    student = await student.save();
  
    res.send(teacher);
  });


app.get('/teacherstudent', async (req, res, next) => {
    
    const everyone = await Student.aggregate().lookup
    ({
    from: "teachers",
    localField: "classheld",
    foreignField: "classheld",
    as: "teacher"
    })
    res.send(everyone)
  
})

app.get('/:staffnumber', async (req, res, next) => {
    
    const heroes = await Teacher.aggregate().lookup
    ({
    from: "students",
    localField: "classheld",
    foreignField: "classheld",
    as: "students"
    })

   const unique = heroes.filter(function (hero) {
       return hero.staffnumber == `${req.params.staffnumber}`
   }) 

   if (!hero.staffnumber)
    return res
      .status(404)
      .send("The teacher with the given staffnumber was not found.");
  res.send(unique)
})

port = process.env.PORT || 8080

app.listen(port, function(){
   console.log('app is running')
});