const Post = require('../models/postModel'); // Import Post model
const User = require('../models/userModel'); // Import User model
const path = require('path'); // Import path module
const fs = require('fs'); // Import fs module
const HttpError = require('../models/errorModel'); // Import HttpError model
const { v4: uuid } = require('uuid'); // Import uuid module



/* CREATE POST */
// POST: /api/posts & PROTECTED
const postCreate = async (req, res, next) => { 
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError('Please fill all fields and upload a Picture', 422));
        }
        const { image } = req.files;
        //check size of the image
        if (image.size > 5000000) {
            return next(new HttpError('Image size should not exceed 5mb', 422));
        }

        let fileName = image.name;
        let splitName = fileName.split('.');
        let ext = splitName[0] + uuid() + '.' + splitName[splitName.length - 1];
        image.mv(path.join(__dirname, '..', '/uploads', ext), async (error) => {
            if (error) {
                return next(new HttpError('Error uploading image', 500));
            } else {
                const newPost = await Post.create({ title, category, description, image: ext, creator: req.user.id });
                if (!newPost) {
                    return next(new HttpError('Error creating post', 422));
                }
                //find user and update number of posts
                const currentuser = await User.findById(req.user.id);
                console.log(currentuser);
                const usePostCount = currentuser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: usePostCount });

                res.status(201).json({ message: 'Post created successfully', newPost });
            }
        })

    } catch (error) {
        return next(new HttpError(error));
    }
}


/* GET ALL POSTS */
// GET: /api/posts & UNPROTECTED
const postsGet = async (req, res, next) => { 
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(posts);
        

    } catch (error) {
        return next(new HttpError("Error fetching posts", 500));
    }
}


/* CREATE a SINGLE POST */
// GET: /api/posts/:id & UNPROTECTED
const postGet = async (req, res, next) => { 
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError('Post not found', 404));
    }
}

/* GET A POST BY CATEGORY */
// GET: /api/posts & PROTECTED
const postCategoryGet = async (req, res, next) => { 
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(catPosts);


    } catch (error) {
        return next(new HttpError('Post not found', 404));
    }
}

/* GET POSTS FROM AUTHOR */
// GET: /api/posts/users/:id & UNPROTECTED
const userPostsGet = async (req, res, next) => { 
    try { 
        const { id } = req.params;
        const userPosts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        res.status(200).json(userPosts);

    } catch (error) {
        return next(new HttpError('Post not found', 404));
    }
}

/* EDIT POST FOR A USER */
// PATCH: /api/posts/:id & PROTECTED
const editPost = async (req, res, next) => { 
    try {
        let { title, category, description } = req.body;
        let postId = req.params.id;

        let fileName;
        let newFilename;
        let updatedPost;

        if (!title || !category || description < 12) {
            return next(new HttpError('Please fill all fields', 422));
        }
        const oldPost = await Post.findById(postId);
        if (req.user.id == oldPost.creator) {
            
            if (!req.files) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
            } else {
                //get old post from db
                const oldPost = await Post.findById(postId);
                //delete old picture
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.image), (error) => {
                    if (error) {
                        return next(new HttpError('Error deleting picture', 500));
                    }
                });
                const { image } = req.files;
                //check size of the image
                if (image.size > 5000000) {
                    return next(new HttpError('Image size should not exceed 5mb', 422));
                }
                fileName = image.name;
                let splitName = fileName.split('.');
                newFilename = splitName[0] + uuid() + '.' + splitName[splitName.length - 1];
                image.mv(path.join(__dirname, '..', 'uploads', newFilename), async (error) => {
                    if (error) {
                        return next(new HttpError('Error uploading image', 500));
                    }
                })
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, image: newFilename }, { new: true });
            }
        }
        if (!updatedPost) {
            return next(new HttpError('Error updating post', 500));
        }
        res.status(200).json(updatedPost);
       
    } catch (error) {
        return next(new HttpError('Post not found', 404));
    }
}


/* EDIT POST FOR A USER */
// DELETE: /api/posts/:id & PROTECTED
const deletePost = async (req, res, next) => { 
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError('Post Unavailable', 400));
        }
        const post = await Post.findById(postId);
        const fileName = post?.image;
        if (req.user.id == post.creator) {
            // delte piccture if it exists
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (error) => {
                if (error) {
                    return next(new HttpError('Error deleting picture', 500));
                } else {
                    await Post.findByIdAndDelete(postId);
                    //find user and update number of posts
                    const currentuser = await User.findById(req.user.id);
                    const usePostCount = currentuser.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: usePostCount });
                    res.status(200).json(`Post ${postId} deleted successfully` );
                }
            });
            
        } else {
            return next(new HttpError("Post can't be deleted", 403));
        }
    } catch (error) {
        return next(new HttpError('Post not found', 404));
    }
}


module.exports = { postCreate, postsGet, postGet, postCategoryGet, userPostsGet, editPost, deletePost }; // Export the controllers