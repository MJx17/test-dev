import React, { useState, ChangeEvent} from "react";
import '../styles/pdf.scss';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Pagination from '@mui/material/Pagination'; // import MUI Pagination

// Define the shape of a job object
interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
}

const jobOpenings: Job[] = [
    { id: 1, title: "Frontend Developer", department: "Engineering", location: "Remote" },
    { id: 2, title: "Backend Developer", department: "Engineering", location: "New York" },
    { id: 3, title: "Product Manager", department: "Product", location: "San Francisco" },
    { id: 4, title: "UX Designer", department: "Design", location: "Remote" },
    { id: 5, title: "QA Engineer", department: "Engineering", location: "Austin" },
    { id: 6, title: "DevOps Engineer", department: "Engineering", location: "Seattle" },
    { id: 7, title: "Data Scientist", department: "Data", location: "Boston" },
    { id: 8, title: "Marketing Specialist", department: "Marketing", location: "Chicago" },
    { id: 9, title: "HR Manager", department: "Human Resources", location: "New York" },
    { id: 10, title: "Customer Support Lead", department: "Support", location: "Remote" },
    { id: 11, title: "Business Analyst", department: "Product", location: "Denver" },
    { id: 12, title: "Full Stack Developer", department: "Engineering", location: "Remote" },
    { id: 13, title: "Content Strategist", department: "Marketing", location: "San Francisco" },
    { id: 14, title: "Technical Writer", department: "Engineering", location: "Austin" },
    { id: 15, title: "Sales Manager", department: "Sales", location: "Chicago" },
];


const CareerPage: React.FC = () => {
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const [locationFilter, setLocationFilter] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const jobsPerPage = 8;

    const departments: string[] = ["All", ...Array.from(new Set(jobOpenings.map(job => job.department)))];
    const locations: string[] = ["All", ...Array.from(new Set(jobOpenings.map(job => job.location)))];

    const filteredJobs = jobOpenings.filter(job => {
        const matchDept = departmentFilter === "All" || job.department === departmentFilter;
        const matchLoc = locationFilter === "All" || job.location === locationFilter;
        const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchDept && matchLoc && matchSearch;
    });

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

   const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
};



    return (
        <div className="career-page">
            <div className="banner">
                <h2>Join Our Team</h2>
                <p>Discover exciting career opportunities and grow with us.</p>
            </div>

            <h1>Careers</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search job titles..."
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    aria-label="Search job titles"
                />
            </div>

            <div className="filters">
                <select
                    value={departmentFilter}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDepartmentFilter(e.target.value)}
                    aria-label="Filter by department"
                >
                    {departments.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>

                <select
                    value={locationFilter}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocationFilter(e.target.value)}
                    aria-label="Filter by location"
                >
                    {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            <div className="job-list">
                {currentJobs.length === 0 ? (
                    <p className="no-results">No job openings match your criteria.</p>
                ) : (
                    currentJobs.map(({ id, title, department, location }) => (
                        <div key={id} className="job-card">
                            <HomeRepairServiceIcon className="icon" />
                            <h3>{title}</h3>
                            <p><strong>Department:</strong> {department}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <button onClick={() => alert(`Apply for ${title}`)}>Apply</button>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                />
            )}
        </div>
    );
};

export default CareerPage;
