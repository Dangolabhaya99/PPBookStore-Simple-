import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosConfig';
import edit from './edit.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        profileImage: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/api/profile');
            setProfile({
                name: response.data.profile.user.name,
                email: response.data.profile.user.email,
                phone: response.data.profile.user.phone || '',
                location: response.data.profile.user.address || '',
                bio: response.data.profile.bio || '',
                profileImage: response.data.profile.profileImage || ''
            });
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to load profile');
            setLoading(false);
            toast.error(err.response?.data?.msg || 'Failed to load profile');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append('bio', profile.bio);
        formData.append('name', profile.name);
        formData.append('email', profile.email);
        formData.append('phone', profile.phone);
        formData.append('location', profile.location);

        if (file) {
            formData.append('profileImage', file);
        }

        try {
            await axiosInstance.patch('/api/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsEditing(false);
            setFile(null);
            toast.success('Profile updated successfully');
            await fetchProfile();
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to save profile');
            toast.error(err.response?.data?.msg || 'Failed to save profile');
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profileImage: fileReader.result,
                }));
            };
            fileReader.readAsDataURL(e.target.files[0]);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center py-12"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505063366573-38928ae5567e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
        >
            <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-8 w-full max-w-2xl">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={profile.profileImage || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute top-0 right-0 opacity-0 w-full h-full cursor-pointer"
                            />
                        )}
                        {!isEditing && (
                            <button
                                onClick={handleEditClick}
                                className="absolute top-0 right-0 bg-gray-500 text-white p-1 rounded-full hover:bg-blue-600"
                            >
                                <img src={edit} alt="Edit" className="h-8" />
                            </button>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="text-3xl font-bold text-gray-800 bg-transparent focus:outline-none w-full text-center"
                            />
                        ) : (
                            profile.name
                        )}
                    </h1>
                    <div className="mt-4 w-full flex items-center justify-center">
                        <p className="text-gray-600 w-full text-center">
                            Bio: {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    className="bg-transparent focus:outline-none w-full text-center h-24 resize-none"
                                />
                            ) : (
                                profile.bio
                            )}
                        </p>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="p-4 flex items-center justify-center">
                        <p className="text-gray-600">
                            Email: {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="bg-transparent focus:outline-none w-full text-center"
                                />
                            ) : (
                                profile.email
                            )}
                        </p>
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <p className="text-gray-600">
                            Phone: {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="bg-transparent focus:outline-none w-full text-center"
                                />
                            ) : (
                                profile.phone
                            )}
                        </p>
                    </div>
                    <div className="p-4 flex items-center justify-center md:col-span-2">
                        <p className="text-gray-600">
                            Location: {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    className="bg-transparent focus:outline-none w-full text-center"
                                />
                            ) : (
                                profile.location
                            )}
                        </p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    {isEditing && (
                        <>
                            <button
                                onClick={handleSaveChanges}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
};

export default ProfilePage;
