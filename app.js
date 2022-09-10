const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://testAdminMongoDB:Mjc9FNuYu5cDXcN@cluster0.jecsc.mongodb.net/blogDB", {
    useNewUrlParser: true,
});

const blogPostSchema = new mongoose.Schema({
    heading: String,
    content: String,
});

const BlogPost = new mongoose.model("BlogPost", blogPostSchema);

const homeStartingContent =
    "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
    "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
    "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const blogPost1 = new BlogPost({
    heading: "First Post",
    content:
        "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.",
});
const blogPost2 = new BlogPost({
    heading: "Second Post",
    content:
        "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
});
const blogPost3 = new BlogPost({
    heading: "Third Post",
    content:
        "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
});
const blogPost4 = new BlogPost({
    heading: "Fourth Post",
    content:
        "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
});

const defaultPosts = [blogPost1, blogPost2, blogPost3, blogPost4];
//root
app.get("/", (req, res) => {
    BlogPost.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            BlogPost.insertMany(defaultPosts, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully inserted data");
                }
            });
            res.redirect("/");
        } else {
            res.render("home", {
                posts: foundItems,
            });
        }
    });
});
//home
app.get("/home.ejs", (req, res) => {
    res.redirect("/");
});

//About
app.get("/about.ejs", (req, res) => {
    res.render("about", { heading: "About", content: aboutContent });
});

//Contact
app.get("/contact.ejs", (req, res) => {
    res.render("contact", {
        heading: "Contact Us",
        content: contactContent,
    });
});

// compose
app.get("/compose.ejs", (req, res) => {
    res.render("compose", { heading: "Create a Post 🧠" });
});

app.post("/compose.ejs", (req, res) => {
    let heading = req.body.postHeading;
    let content = req.body.postContent;
    const newBlogPost = new BlogPost({
        heading: heading,
        content: content,
    });
    newBlogPost.save();
    res.redirect("/");
});

// custom post rout
app.get("/post/:postId", (req, res) => {
    let requestedPostId = req.params.postId;
    BlogPost.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", {
            heading: post.heading,
            postContent: post.content,
        });
    });
});

//Server listen
app.listen(port, (req, res) => {
    console.log(`The app is running at ${port}`);
});
