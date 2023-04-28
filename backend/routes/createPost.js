const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requirelogin");
const { route } = require("./auth");
const POST = mongoose.model("POST")


// get all post for the home page
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photo")
        //.populate("comments.postedBy", "_id name")
        //.sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

//for craeting the post in the create post page
router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

//for profile page update 
router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        // .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})

//update likes in the db
router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).then((result) => {
        res.json(result);
    })
    .catch(err => {console.log(err)})
})

router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).then((result) => {
        res.json(result);
    })
    .catch(err => {console.log(err)})
})

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name Photo")
        .then((result) => {
            res.json(result);
        })
        .catch(err => {console.log(err)})
})

//Api to delete post
router.delete("/deletePost/:postId", requireLogin, (req, res) => {

    console.log(req.params.postId);
    // POST.findOne({ _id: req.params.postId })
    //     .populate("postedBy", "_id")
    //     .then((post) => {
    //         if(post){
    //             if (post.postedBy._id.toString() == req.user._id.toString()) {

    //                 post.remove()
    //                     .then(result => {
    //                         return res.json({ message: "Successfully deleted" })
    //                     }).catch((err) => {
    //                         console.log(err)
    //                     })
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         return res.status(422).json({error : err})
    //     })
        
        // .exec((err, post) => {
        //     if (err || !post) {
        //         return res.status(422).json({ error: err })
        //     }

        //     if (post.postedBy._id.toString() == req.user._id.toString()) {

        //         post.remove()
        //             .then(result => {
        //                 return res.json({ message: "Successfully deleted" })
        //             }).catch((err) => {
        //                 console.log(err)
        //             })
        //     }
        // })
})

// to show following post
// router.get("/myfollwingpost", requireLogin, (req, res) => {
//     POST.find({ postedBy: { $in: req.user.following } })
//         .populate("postedBy", "_id name")
//         .populate("comments.postedBy", "_id name")
//         .then(posts => {
//             res.json(posts)
//         })
//         .catch(err => { console.log(err) })
// })

module.exports = router
