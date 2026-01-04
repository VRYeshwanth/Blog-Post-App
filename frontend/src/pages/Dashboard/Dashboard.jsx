import StatisticCard from "./StatisticCard";
import "./Dashboard.css";
import axios from "../../utils/axios.js";
import { formatDate } from "../../utils/formatDate.js";
import { useLoader } from "../../../context/LoaderContext";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                showLoader();

                const { data } = await axios.get("/api/dashboard");

                setDashboardData(data);
            } catch (err) {
                console.error(
                    "Dashboard fetch error:",
                    err.response?.data || err.message
                );
            } finally {
                hideLoader();
            }
        }

        fetchDashboardData();
    }, []);

    if (!dashboardData) return null;

    return (
        <div className="dashboard-container">
            <div className="dashboard-overview">
                <h1>Dashboard Overview</h1>
                <p>Welcome back {dashboardData.user.username}</p>
                <div className="overview-layout">
                    <StatisticCard
                        icon="bx bxs-calendar"
                        statistic="Joined Date"
                        value={formatDate(dashboardData.user?.joinedAt)}
                        color="#3B82F6"
                    />
                    <StatisticCard
                        icon="bx bxs-notepad"
                        statistic="Total Posts"
                        value={dashboardData.stats.posts}
                        color="#10B981"
                    />
                    <StatisticCard
                        icon="bx bxs-message-detail"
                        statistic="Total Comments"
                        value={dashboardData.stats.comments}
                        color="#A855F7"
                    />
                    <StatisticCard
                        icon="bx bxs-heart"
                        statistic="Posts Liked"
                        value={dashboardData.stats.totalLikes}
                        color="#EC4899"
                    />
                </div>
            </div>
        </div>
    );
}
