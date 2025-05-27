import  { useState } from "react";
import '../styles/pdf.scss'


const disclosurePolicies = [
    { id: 1, title: "Philtrust Bank_1-ACGR 2023", pdfUrl: "https://www.philtrustbank.com/sites/default/files/corporate-governance/Philtrust%20Bank_I-ACGR%202023.pdf", year: 2024, category: "Corporate Governance Report" },
    { id: 2, title: "Charter of the Corporate Governance Committee", pdfUrl: "https://www.philtrustbank.com/sites/default/files/corporate-governance/CHARTER%20OF%20THE%20CORPORATE%20GOVERNANCE%20COMMITTEE.pdf", year: 2022, category: "Board Committees" },
    { id: 3, title: "Charter of the Relaxed Party Transactions Commitee", pdfUrl: "https://www.philtrustbank.com/sites/default/files/corporate-governance/CHARTER%20OF%20THE%20RELATED%20PARTY%20TRANSACTIONS%20COMMITTEE.pdf", year: 2024, category: "Board Committees" },
    { id: 4, title: "Charter of the Executive Committee", pdfUrl: "https://www.philtrustbank.com/sites/default/files/corporate-governance/CHARTER%20OF%20THE%20EXECUTIVE%20COMMITTEE.pdf", year: 2021, category: "Board Committees" },
    { id: 5, title: "Charter of the Audit Committee", pdfUrl: "https://www.philtrustbank.com/sites/default/files/corporate-governance/CHARTER%20OF%20THE%20AUDIT%20COMMITTEE.pdf", year: 2023, category: "Board Committees" },
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

    const categories = ["All", ...new Set(disclosurePolicies.map((item) => item.category))];
 const years = ["All", ...Array.from(new Set(disclosurePolicies.map((item) => item.year))).sort((a, b) => b - a)];



    const filteredPolicies = disclosurePolicies.filter(({ title, year, category }) => {
        const search = filter.toLowerCase();
        const matchesText = title.toLowerCase().includes(search) || year.toString().includes(search);
        const matchesCategory = categoryFilter === "All" || category === categoryFilter;
        const matchesYear = yearFilter === "All" || year.toString() === yearFilter;
        return matchesText && matchesCategory && matchesYear;
    });

    const grouped = filteredPolicies.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof disclosurePolicies>);

    return (
        <div className="disclosure-container">
            <h1 className="disclosure-header">Company Governance</h1>

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
