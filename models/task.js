const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(  {
    name : { type : String , required: true},
    date : { type : String , required: false},
    time : { type : String,timezone: true, default: () => { return new Date().toISOString();},required: false},
    description : { type : String , required: false},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' }, 
    done : { type : Boolean , default: false}

},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

taskSchema.virtual('categoryName').get(function() {
    if(this.category){
        return this.category.name;
    }
    return null;
});

module.exports = mongoose.model('Task',taskSchema)