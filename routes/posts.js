const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");

//CREATE NEW POST
router.post("/createpost", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("user not found");
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(200).json("post has been deleted");
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ONE POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
