import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    logo: String,
    userId: [String],
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;