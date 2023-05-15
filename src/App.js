import React, { useState } from 'react';
import UserRequestForm from './components/UserRequestForm';
import UserRequestList from './components/UserRequestList';
import DataContext from './data/DataContext';
import data from './data/data';

import './App.css';

function App() {

  const [requests, setRequests] = useState([...data])

  return (
      <DataContext.Provider value={{ requests, setRequests }}>
        <div className="app">
        {/* ... */}
          <main className='flex flex-col lg:flex-row md:space-x-10 md:justify-between'>
            {/* New User Request Form */}
            <UserRequestForm />

            {/* New User Request List  */}
            <UserRequestList />
          </main>
        </div>
      </DataContext.Provider>
  );
}

export default App;
