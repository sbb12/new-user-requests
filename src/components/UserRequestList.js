import React, { useState, useContext } from 'react';
import DataContext from '../data/DataContext';

export default function UserRequestList(){

    const { requests, setRequests } = useContext(DataContext);
    const [filterIncomplete, setFilterIncomplete] = useState(false);
    const [filterBusinessArea, setFilterBusinessArea] = useState("All");

    // mark request as complete
    const handleComplete = (index) => {
        requests[index].completed = !requests[index].completed
        setRequests([...requests])
    }

    const handleDelete = (index) => {
        // highlight the row to be deleted
        document.querySelectorAll('.grid-listing')[index].classList.add("outline", "outline-1", "outline-red-500");
        setRequests([...requests]) 

        // ask for confirmation, delay is to allow the highlight to render
        setTimeout(() => {
            const confirmed = window.confirm("Are you sure you want to delete this request?");
            
            // remove the highlight
            document.querySelectorAll('.grid-listing', '.outline')?.forEach(el=> {
                el.classList.remove("outline", "outline-1", "outline-red-500");
            });

            // return if not confirmed
            if (!confirmed) {
                return;
            };
            // delete the row
            const newRequests = requests.filter((request, i) => i !== index);
            setRequests(newRequests);
        }, 50);
    }

    // check if the request matches the filter options
    const matchFilter = (request) => {
        if ( filterIncomplete && request.completed ) return false;
        if ( filterBusinessArea !== "All" && request.businessArea !== filterBusinessArea ) return false;
        return true;
    }

    

    return (
        <div className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left'>
            <h1 className='text-center text-xl font-semibold mb-3'>Requests</h1>

            <div className='filters grid grid-cols-2 text-left max-w-[400px] mx-auto border border-1 rounded p-4'>
                <h2 className="col-span-2 text-center text-lg">Filters</h2>
                <label className="block text-gray-700 text-sm font-semibold mb-2 mt-3">Show only incomplete</label>
                <input type="checkbox" checked={filterIncomplete} onChange={() => {setFilterIncomplete(!filterIncomplete)}} className='ml-auto' aria-label="filter by complete"/>
                <label className="block text-gray-700 text-sm mb-2 font-semibold mt-3">filter by business Area:</label>
                <select value={filterBusinessArea} onChange={e => setFilterBusinessArea(e.target.value)} className='text-right w-30 ml-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' aria-label="business area filter options">
                    <option value="All">All</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Housing">Housing</option>
                    <option value="Care">Care</option>
                </select>
            </div>
            
            <div className='text-left w-full'>
                <div className='headers grid grid-cols-7 auto-cols-min font-semibold gap-4'>
                    <p>Name</p>
                    <p>Line Manager</p>
                    <p>Start Date</p>
                    <p>Job Title</p>
                    <p>Business Area</p>
                    <p className='text-center'>Complete</p>
                    <p className='text-center'>Delete</p>
                </div>
                <ul className='bg-gray-50 [&>*:nth-child(even)]:bg-gray-100 w-full'>
                    {requests.map((request, index) => {
                        if (matchFilter(request)) {
                            return (
                                <li key={index} className='grid-listing grid grid-flow-row grid-cols-7 gap-4 w-full'>
                                <h2>{request.firstName + ' ' + request.lastName}</h2>
                                <p>{request.lineManager}</p>
                                <p>{request.startDate}</p>
                                <p>{request.jobTitle}</p>
                                <p>{request.businessArea}</p>
                                <input type="checkbox" checked={request.completed} onChange={()=>{ handleComplete(index) }} className='h-4 m-auto' aria-label="mark (in)complete"/>
                                <button type="button" onClick={() => { handleDelete(index) }} className='m-auto' aria-label="delete entry">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </li>)
                        }
                    })}
                </ul>
            </div>
        </div>
    )

}
