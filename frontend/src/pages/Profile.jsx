import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Avatar from "../components/Avatar";

export default function Profile() {
    const [profileDetails, setProfileDetails] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { auth, updateUser } = useAuth();

    useEffect(() => {
        async function fetchDetails() {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(
                    "http://localhost:3000/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProfileDetails(response.data.details);
                setFormData({
                    username: response.data.details.username,
                    email: response.data.details.email,
                });
            } catch (err) {
                console.error("Failed to fetch profile details:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, []);

    async function handleSave() {
        try {
            setSaving(true);
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                "http://localhost:3000/api/profile",
                {
                    username: formData.username,
                    email: formData.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfileDetails(response.data.details);

            updateUser({
                ...auth.user,
                username: response.data.details.username,
                email: response.data.details.email,
            });

            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        } finally {
            setSaving(false);
        }
    }

    function handleCancel() {
        setFormData({
            username: profileDetails.username,
            email: profileDetails.email,
        });
        setIsEditing(false);
    }

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile Settings</h1>
                <p>Manage your account details and preferences</p>
            </div>

            <div className="profile-card">
                <div className="profile-avatar">
                    <Avatar username={profileDetails.username} size="5rem" />
                </div>

                <div className="profile-field">
                    <label>Username</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <p>{profileDetails.username}</p>
                    )}
                </div>

                <div className="profile-field">
                    <label>Email address</label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <p>{profileDetails.email}</p>
                    )}
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="secondary"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
