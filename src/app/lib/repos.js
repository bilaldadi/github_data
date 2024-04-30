'use client';
import { useState, useEffect } from 'react';

export default function Repos() {
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRepo, setSelectedRepo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.github.com/users/bilaldadi/repos');
            const json = await res.json();
            setRepos(json);
        };
        fetchData();
    }, []);

    
    const indexOfLastRepo = currentPage * perPage;
    const indexOfFirstRepo = indexOfLastRepo - perPage;
    const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    const filteredRepos = currentRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const handleRepoClick = (repo) => {
        setSelectedRepo(repo);
    };

    return (
        <div className="container mx-auto">
            <div className="mt-10">
                <input
                    type="text"
                    placeholder="Search repositories"
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black focus:outline-none"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                <h2 className="text-center text-2xl font-semibold mt-5">Repositories: click to see more details</h2>
            </div>
            <div className="grid grid-cols-3 gap-5 mx-5 mt-5">
                {filteredRepos.map(repo => (
                    <div key={repo.id} className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => handleRepoClick(repo)}>
                        <h3 className="text-xl font-medium text-black">{repo.name}</h3>
                    </div>
                ))}
            </div>
            <Pagination
                itemsPerPage={perPage}
                totalItems={repos.length}
                paginate={paginate}
            />
            {selectedRepo && <RepoDetails repo={selectedRepo} />}
        </div>
    );
}

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-5">
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#" className="px-3 py-1 bg-gray-200 text-black rounded-md mx-1">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


const RepoDetails = ({ repo }) => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-2">{repo.name}</h2>
            <p className="text-lg text-gray-600">Description: {repo.description}</p>
            <p className="text-lg text-gray-600">Language: {repo.language}</p>
            <p className="text-lg text-gray-600">Stars: {repo.stargazers_count}</p>
            <p className="text-lg text-gray-600">Forks: {repo.forks}</p>
            <p className="text-lg text-gray-600">URL: <a href={repo.html_url} target="_blank" className="text-blue-500 hover:underline">{repo.html_url}</a></p>
        </div>
    );
};

