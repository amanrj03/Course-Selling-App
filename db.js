const mongoose = requie("mongoose");
mongoose.connect("mongodb+srv://amanketchum:czUdIvZ1zQnOTcZV@cluster0.nc9fzp4.mongodb.net/course-selling-app")
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.Model("user", userSchema)
const adminModel = mongoose.Model("admin", adminSchema)
const courseModel = mongoose.Model("course", courseSchema)
const purchaseModel = mongoose.Model("purchase", purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}