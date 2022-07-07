//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://canyonzhang:Link2270$$@firstcluster.zku5s.mongodb.net/BlogDB?retryWrites=true&w=majority");


// let posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose schemas
const postSchema = {
  title: String,
  body: String
}

//mongoose models
const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, foundPosts){ //foundPosts is an array Post objects
      // if(err){
      //   console.log(err);
      // }
        res.render("home", {
          startingContent: homeStartingContent,
          postsArray : foundPosts
        });
        // res.redirect("/");

  })

});

app.get("/about", function(req, res){
  res.render("about", {startingContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {startingContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){ //to create and insert a new item into the database, create a new instance of the mongoose model we defined, and save it. 
  const newPost = new Post({
    title: req.body.postTitle,
    body: req.body.postContent
  })
  // posts.push(post);
  newPost.save(function(err){
    if (!err){
        res.redirect("/");
    }
  console.log("Successfully inserted new post into DB");
  res.redirect("/");
});
});


app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){ //used the find method to find a post with the given postId which we extracted from home.ejs, then we rendered the appropriate fields in post.ejsß
    res.render("post", {
      postTitle: post.title,
      postContent: post.body
    });
  });

});


// app.get("posts/:postID", function(req, res){
//   const postID = req.body.post._id; //gets the name of the post from the search bar
//   Post.findOne({_id: postID}, (err, foundPost) => {
//       res.render("post", {
//         postTitle: foundPost.title,
//         postContent: foundPost.body
//       })
//        res.redirect("/post/" + postName);
//   });
//
//         console.log("Match Found");
//       });







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
