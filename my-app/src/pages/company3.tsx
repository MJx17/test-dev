import React, { useState } from "react";
import '../styles/pdf.scss'


const disclosurePolicies = [
  { id: 1, title: "Amended General Information Sheet for the year 2024 as of December 2, 2024", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/Amended%20General%20Information%20Sheet%20for%20the%20year%202024%20as%20of%20December%202%2C%202024.pdf", year: 2024, category: "General Information Sheet" },
  { id: 2, title: "General Information Sheet for the year 2024", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/General%20Information%20Sheet%20for%20the%20year%202024.pdf", year: 2024, category: "General Information Sheet" },
  { id: 3, title: "Initial Statement of Beneficial Ownership of Securities (SEC Form 23-A) dated April 1, 2024", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/Initial%20Statement%20of%20Beneficial%20Ownership%20of%20Securities%20%28SEC%20Form%2023-A%29%20dated%20April%201%2C%202024.pdf", year: 2024, category: "SEC Form 23-A/B (Statement of Beneficial Ownership)" },
  { id: 4, title: "Initial Statement of Beneficial Ownership of Securities (SEC Form 23-B) dated April 4, 2024", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/Initial%20Statement%20of%20Beneficial%20Ownership%20of%20Securities%20%28SEC%20Form%2023-A%29%20dated%20April%204%2C%202024.pdf", year: 2024, category: "SEC Form 23-A/B (Statement of Beneficial Ownership)" },
  { id: 5, title: "107th-ANNUAL REPORT", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/107th%20ANNUAL%20REPORT.pdf", year: 2024, category: "General Company Disclosures" },
  { id: 6, title: "2002 Preliminary Information Statement", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/2024%20Preliminary%20Information%20Statement.pdf", year: 2024, category: "SEC Form IS-20 (Information Statement)" },
  { id: 7, title: "2002 Definitive Information Statement", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/2024%20Definitive%20Information%20Statement.pdf", year: 2024, category: "SEC Form IS-20 (Information Statement)" },
  { id: 8, title: "Audited Financial Statement - 2023", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/AFS-2023.pdf", year: 2024, category: "Audited Financial Statement" },
  { id: 9, title: "Annual Report for the year ended December 31, 2023", pdfUrl: "https://www.philtrustbank.com/sites/default/files/company-disclosure/Annual%20Report%20%28SEC%20Form%2017-A%29%20for%20the%20year%20ended%20December%2031%2C%202023.pdf", year: 2024, category: "Annual Report (SEC 17-A)" },
  { id: 10, title: "Setting of the Bank XXIV Annual Stockholders' Meeting", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 11, title: "Promotion and Appointment of Officers", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 12, title: "Results of the Bank XXIV Annual Stockholders' Meeting", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 13, title: "Re-appointment of External Auditor for the year 2024", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 14, title: "Results of the Bank's Organizational Meeting", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 15, title: "Re-appointment of External Auditor for the year 2024", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 16, title: "Appointment of Chief Risk Officer", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 17, title: "Revision/Correction on Membership of the Management Committees", pdfUrl: "", year: 2024, category: "Current Reports (SEC 17-C)" },
  { id: 18, title: "Quarterly Report Q1", pdfUrl: "", year: 2024, category: "Quarterly Report (SEC-Q)" },
  { id: 19, title: "Notice of the Annual Stockholders Meeting", pdfUrl: "", year: 2024, category: "Notice of Stockholder's Meetings" },
  { id: 20, title: "Proxy Form", pdfUrl: "", year: 2024, category: "Notice of Stockholder's Meetings" },
  { id: 21, title: "2024 Minutes of Annual Stockholders' Meeting", pdfUrl: "", year: 2024, category: "Annual Stockholder's Meetings" }
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
            <h1 className="disclosure-header">Company Disclosures </h1>

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
