import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from '../../api/company';
import type { Company } from '../../types';

const CompanyList = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0); // total number of companies
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchCompanies = async () => {
        let params = `limit=${10}&page=${page}`;
        if (search) params += `&search=${search}`;
        const res: any = await getCompanies(params);
        setCompanies(res.data as Company[]);
        setTotal(res.total || 0);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setPage(1);
            if (search.trim()) {
                fetchCompanies();
            } else {
                fetchCompanies();
            }
        }, 500);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const totalPages = Math.ceil(total / 10);

    return (
        <div className="company-container">
            <div className="company-toolbar">
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={search}
                    onChange={handleSearch}
                    className="company-search"
                />
                <button onClick={() => navigate('/add')} className="company-add-btn">
                    Add Company
                </button>
            </div>
            <div className="company-table-wrapper">
                <table className="company-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Website</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="company-empty">No companies found.</td>
                            </tr>
                        ) : (
                            companies.map((c, i) => (
                                <tr key={c.id}>
                                    <td>{i + 1}</td>
                                    <td>{c.companyName}</td>
                                    <td>
                                        <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer">
                                            {c.websiteUrl}
                                        </a>
                                    </td>
                                    <td>{c.email || '-'}</td>
                                    <td>{c.phone || '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="company-pagination">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="company-page-btn"
                    >
                        Prev
                    </button>
                    <span className="company-page-info">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="company-page-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyList;