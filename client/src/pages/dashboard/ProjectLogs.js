import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

const ProjectLogs = () => {
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [currentPageLogs, setCurrentPageLogs] = useState([]);
    const { projectLogs, getProjectLogs } = useAppContext();
    const [logMessageFilter, setLogMessageFilter] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        getProjectLogs();
    }, []);

    useEffect(() => {
        const filteredList = projectLogs.filter((log) => (
            logMessageFilter === "" ||
            log.message.toLowerCase().includes(logMessageFilter.toLowerCase())));

        setFilteredLogs(filteredList);
        setCurrentPageLogs(filteredList.slice(((page - 1) * 10), ((page - 1) * 10) + 10));
    }, [projectLogs, logMessageFilter, page]);

    const handleOnPageChange = (action) => {
        if (action === 'down') {
            if (page !== 1) {
                setPage(page-1);
            }
        }

        if (action === 'up') {
            if ((projectLogs.length + 1) / 10 > page) {
                setPage(page + 1);
            }
        }
    }
    return (
    <div>
        <div className="row">
            <input placeholder="Message" onChange={(e) => setLogMessageFilter(e.target.value)}/>
        </div>
        <div className="row mt-5">
        <table class="table table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Timestamp</th>
                <th scope='col'>Action</th>
                <th scope="col">Message</th>
                
                </tr>
            </thead>
            <tbody>
                {currentPageLogs.length > 0 && currentPageLogs.map(({ _id, message, action, date}, index) => (
                    <tr key={_id}>
                        <th scope="row">{((page - 1) * 10 )+ index + 1}</th>
                        <td>{date}</td>
                        <td>{action}</td>
                        <td>{message}</td>
                    </tr>
                ))}
                {filteredLogs.length === 0 &&
                    <div>No logs found</div>
                }
            </tbody>
            </table>
            {filteredLogs.length > 10 &&
                <nav aria-label="Page navigation example">
                    <ul class="pagination d-flex justify-content-end">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" onClick={() => handleOnPageChange('down')}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" onClick={() => handleOnPageChange('up')}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            }
        </div>
    </div>)
}

export default ProjectLogs;