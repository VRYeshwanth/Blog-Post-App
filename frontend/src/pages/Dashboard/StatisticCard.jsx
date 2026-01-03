import "./Dashboard.css";
export default function StatisticCard({ icon, statistic, value, color }) {
    return (
        <div className="statistics-card" style={{ color: color }}>
            <i className={icon}></i>
            <span>{statistic}</span>
            <h2>{value}</h2>
        </div>
    );
}
