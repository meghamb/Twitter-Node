const mongoose=require('mongoose');

const CommentSchema= mongoose.Schema({
    content:{
        type:String,
        required:true,
        maxLength: 300,
        minLength: 5
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweet',
        required:true
    }
},{timestamps:true});

const Comment=mongoose.model('Comment',CommentSchema);
module.exports= Comment;