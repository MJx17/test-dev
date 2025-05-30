import { useState } from "react";
import '../styles/pdf.scss'

const pressReleasesAndNews = [
    { id: 1, title: "Annual Media Briefing 2024", pdfUrl: "", year: 2024, category: "Media Briefing" },
    { id: 2, title: "Q1 2025 Press Release", pdfUrl: "", year: 2025, category: "Quarterly Update" },
    { id: 3, title: "CSR Highlights in the News", pdfUrl: "", year: 2023, category: "CSR News" },
    { id: 4, title: "CEO Interview with Business Daily", pdfUrl: "", year: 2023, category: "Executive Interview" },
    { id: 5, title: "New Regional Office Opens in Cebu", pdfUrl: "", year: 2023, category: "Company Expansion" },
    { id: 6, title: "Launch of Digital Banking Platform", pdfUrl: "", year: 2025, category: "Product Launch" },
    { id: 7, title: "Company Joins Global Sustainability Pact", pdfUrl: "", year: 2024, category: "Sustainability News" },
    { id: 8, title: "Employee Volunteer Week Recap", pdfUrl: "", year: 2023, category: "Community Engagement" },
    { id: 9, title: "Executive Town Hall Highlights", pdfUrl: "", year: 2025, category: "Internal Communication" },
    { id: 10, title: "Recognition in Top 100 Employers List", pdfUrl: "", year: 2024, category: "Awards & Recognition" },
];





// PDF Icon component (same as before)
const PdfIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
);

export default function DisclosureList() {
    const [filter, setFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [yearFilter, setYearFilter] = useState("All");

    const categories = ["All", ...new Set(pressReleasesAndNews.map((item) => item.category))];
 const years = ["All", ...Array.from(new Set(pressReleasesAndNews.map((item) => item.year))).sort((a, b) => b - a)];



    const filteredPolicies = pressReleasesAndNews.filter(({ title, year, category }) => {
        const search = filter.toLowerCase();
        const matchesText = title.toLowerCase().includes(search) || year.toString().includes(search);
        const matchesCategory = categoryFilter === "All" || category === categoryFilter;
        const matchesYear = yearFilter === "All" || year.toString() === yearFilter;
        return matchesText && matchesCategory && matchesYear;
    });

    const grouped = filteredPolicies.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof pressReleasesAndNews>);

    return (
        <div className="disclosure-container">
            <h1 className="disclosure-header">Press Material / News </h1>

            <div className="disclosure-filters">
                <input
                    type="text"
                    placeholder="Filter by title or year..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="disclosure-input"
                />

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="disclosure-select"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="disclosure-select"
                >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>

            {Object.keys(grouped).length === 0 ? (
                <p className="disclosure-no-match">No matching disclosure policies found.</p>
            ) : (
                Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="disclosure-category-group">
                        <h2 className="disclosure-category-title">{category}</h2>
                        <ul className="disclosure-list">
                            {items.map(({ id, title, pdfUrl, year }) => (
                                <li key={id} className="disclosure-item">
                                    <a
                                      href={pdfUrl} // if you want to include the pdfUrl variable in a hash route string
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="disclosure-link"
                                    >
                                        <div className="disclosure-link-content">
                                            <PdfIcon />
                                            <span className="disclosure-title">{title}</span>
                                        </div>
                                        <span className="disclosure-year">{year}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}
