const User = require('./User.js');
const Post = require('./Post.js');

//----- Users can have many posts, posts belong to one user -----
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});
//---------------------------------------------------------------

module.exports = { User, Post };
