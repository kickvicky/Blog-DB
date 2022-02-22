//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require("lodash");

const homeStartingContent = "Welcome To your personal blog, use the `/compose` route to compose a new blog and publish it. \n Click on the read more links for an separate daily blog page";
const aboutContent = "This is a Full Stack application made with Express and Mongoose, At kickvicky corporations we belive the ease of use of the users and provide a minimalistic, simple and easy to use applications. If you like our works, contact us and let's work together in any of your fututre projects and make them come to fruition";
const companyName = ' Company Name : Kickvicky corporations';
const linkedIn = " LinkedIn : https://www.linkedin.com/in/vignesh-a-318757199/ ";
const mail = "Mail ID :   vigneshsweg123@gmail.com"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-vicky:test123@cluster0.lsb39.mongodb.net/blogDB");

var postSchema = {
  title: String,
  content: String
}

var Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

  Post.find({}, function (err, posts) {
    if (!err) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    }
  });


});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { name: companyName, linkedIn: linkedIn, mail: mail });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {


  var post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

app.get("/posts/:postID", function (req, res) {
  const requestedID = req.params.postID;

  // posts.forEach(function (post) {
  //   const storedTitle = post.title;

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

  Post.findById(requestedID, function (err, post) {
    if (!err) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started succesfully");
});   
