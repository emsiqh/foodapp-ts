import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: String,
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    logo: String,
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;