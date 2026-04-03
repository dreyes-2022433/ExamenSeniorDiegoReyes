import mongoose,{Schema, model} from "mongoose"

const userSchema = new Schema({
    name: {
         type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Name is required']
    },
    lastname: {
        type: String,
        maxLength: [50, `Can´t be overcome 50 characters`],
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password is not strong enough']
        }
})

export default model('User', userSchema)