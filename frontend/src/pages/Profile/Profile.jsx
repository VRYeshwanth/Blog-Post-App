import "./Profile.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useLoader } from "../../../context/LoaderContext.jsx";
import axios from "../../utils/axios.js";
import Avatar from "../../components/Avatar/Avatar.jsx";

export default function Profile() {
    const [profileDetails, setProfileDetails] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const { auth, updateUser } = useAuth();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        let isMounted = true;

        async function fetchDetails() {
            try {
                showLoader();

                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get("/api/profile");

                if (!isMounted) return;

                setProfileDetails(response.data.details);
                setFormData({
                    username: response.data.details.username,
                    email: response.data.details.email,
                });
            } catch (err) {
                console.error("Failed to fetch profile details:", err);
            } finally {
                hideLoader();
            }
        }

        fetchDetails();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleSave() {
        if (!formData.username.trim() || !formData.email.trim()) {
            alert("Username and email cannot be empty");
            return;
        }

        try {
            setSaving(true);
            showLoader();

            const token = localStorage.getItem("token");

            const response = await axios.patch("/api/profile", {
                username: formData.username,
                email: formData.email,
            });

            setProfileDetails(response.data.details);

            if (auth?.user) {
                updateUser({
                    ...auth.user,
                    username: response.data.details.username,
                    email: response.data.details.email,
                });
            }

            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        } finally {
            setSaving(false);
            hideLoader();
        }
    }

    function handleCancel() {
        if (!profileDetails) return;

        setFormData({
            username: profileDetails.username,
            email: profileDetails.email,
        });
        setIsEditing(false);
    }

    if (!profileDetails) {
        return null;
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
