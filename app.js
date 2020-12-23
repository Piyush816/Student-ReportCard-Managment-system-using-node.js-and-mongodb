const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Reportcard = require("./models/schema");
const { Router } = require("express");

// setting port
const port = process.env.PORT || 3000;
// configure app
const app = express();

app.use(express.urlencoded({ extended: false }));

// setting the veiw engine
app.set("view engine", "hbs");

// routing

// home route
app.get("/", async (req, res) => {
  try {
    const data = await Reportcard.find();
    res.render("index", { array: data });
  } catch (error) {
    res.send(error)
  }
});

// search Route
app.post("/search", async (req, res) => {
  try {
    const data = await Reportcard.find({ rollno: req.body.rollno });
    if (data == "") {
      res.render("index", { err: "No result Found !" });
    } else {
      res.render("index", { array: data });
    }
  } catch (error) {
    res.render("index", { err: "Invalid Roll no" });
  }
});

// adding Route
app.post("/add", (req, res) => {
  const user = new Reportcard(req.body);
  user
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
});


// delete Route
app.get("/delete/:userid", async (req, res) => {
  try {
    const id = req.params.userid;
    const data = await Reportcard.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

// finding id to update Route
app.get("/update/:userid", async (req, res) => {
  try {
    const id = req.params.userid;
    const data = await Reportcard.findById({ _id: id });
    res.render("edit", { array: data });
  } catch (error) {
    res.send(error);
  }
});

// finnally update Route
app.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const data = await Reportcard.findByIdAndUpdate(id,req.body,{useFindAndModify:false});
    res.redirect('/')
  } catch (error) {
    res.send(error)
  }
});

// 404 error Route
app.get('*',(req,res)=>{
  res.render('error')
})


app.listen(port, () => {
  console.log("server is running on " + port);
});
