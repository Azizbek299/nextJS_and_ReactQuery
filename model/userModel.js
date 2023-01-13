import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
    name:String,
    avatar:String,
    email:String,
    salary:String,
    date:String,
    status:String
})

const UserModels = mongoose.models.user || mongoose.model('user', userSchema)

export default UserModels