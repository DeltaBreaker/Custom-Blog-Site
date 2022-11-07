const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

//----- Users can have many posts, posts belong to one user -----
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});
//---------------------------------------------------------------

//----- Comments belong to one post and one user, posts and users can have many comments -----
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
})

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});
//---------------------------------------------------------------------------------------------

module.exports = { User, Post, Comment };
