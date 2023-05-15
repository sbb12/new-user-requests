import React, { useContext, useState } from 'react';
import DataContext from '../data/DataContext';

export default function UserRequestForm(){

    // user request context
    const { requests, setRequests } = useContext(DataContext);
  
    // set up state variables
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState('hello');

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);

    const [jobTitle, setJobTitle] = useState("");
    const [jobTitleError, setJobTitleError] = useState(false);

    const [lineManager, setLineManager] = useState("");
    const [lineManagerError, setLineManagerError] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [startDateError, setStartDateError] = useState(false);

    const [businessArea, setBusinessArea] = useState("");
    const [businessAreaError, setBusinessAreaError] = useState(false);
    
    // handle form submission
    const handleSubmit = (e) => {
        
        e.preventDefault();

        if (!validateForm()) return false;

        // get the next id for the new request
        const nextID = requests.length > 0 ? requests.reduce((acc, curr) => { return Math.max(acc, curr.id) }, 0) + 1 : 1;
        
        const formData = {
            id: nextID,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            lineManager: lineManager,
            startDate: startDate,
            businessArea: businessArea,
            completed: false
        }
        setRequests([...requests, formData]);
    }

    // handle form validation
    const validateForm = (e) => {
        console.log('validating form')

        let pass = true

        if (!firstName.match(/^[a-zA-Z-'À-ÖØ-öø-ÿ]{2,30}$/)){
            setFirstNameError('Please enter a valid first name')
            document.querySelector('#firstNameError').classList.remove('hidden')
            pass = false
        }
        if (!lastName.match(/^[a-zA-Z-'À-ÖØ-öø-ÿ]{2,30}$/)){
            setLastNameError('Please enter a valid last name')
            document.querySelector('#lastNameError').classList.remove('hidden')
            pass = false
        }
        if (jobTitle.length < 2){
            setJobTitleError('Please enter a valid job title')
            document.querySelector('#jobTitleError').classList.remove('hidden')
            pass = false
        }
        if (!lineManager.match(/^[a-zA-Z-'À-ÖØ-öø-ÿ]{2,30}$/)){
            setLineManagerError('Please enter a valid line manager name')
            document.querySelector('#lineManagerError').classList.remove('hidden')  
            pass = false
        }
        if (!startDate){ // or other validation 
            setStartDateError('Please enter a valid start date')
            document.querySelector('#startDateError').classList.remove('hidden')  
            pass = false
        }
        if (!businessArea){ 
            setBusinessAreaError('Please select a business area')
            document.querySelector('#businessAreaError').classList.remove('hidden')
            pass = false
        }

        return pass;
    }

    // remove error messages
    const clearErrors = () => {        
        firstNameError && setFirstNameError(false)
        lastNameError && setLastNameError(false)
        jobTitleError && setJobTitleError(false)
        lineManagerError && setLineManagerError(false)
        startDateError && setStartDateError(false)
        businessAreaError && setBusinessAreaError(false)

        document.querySelectorAll('p.text-red-500').forEach((el) => {
            el.classList.add('hidden')
        })
    }

    return (
        <>
          <form onSubmit={handleSubmit} className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left max-h-fit'>
            <h1 className='text-center text-xl font-semibold mb-3'>Add new request</h1>

            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > First Name: </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="text" placeholder="Fist Name" name='firstName' value={firstName} onChange={(e) => {setFirstName(e.target.value); clearErrors()}} aria-label="first name"/>
            <p id="firstNameError" className='text-red-500 text-xs p-1 hidden'>{firstNameError}</p>
            
            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > Last Name: </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="text" placeholder="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value); clearErrors()}} aria-label="last name"/>
            <p id="lastNameError" className='text-red-500 text-xs hidden'>{lastNameError}</p>

            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > Job Title: </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => {setJobTitle(e.target.value); clearErrors()}} aria-label="job title"/>
            <p id="jobTitleError" className='text-red-500 text-xs hidden'>{jobTitleError}</p>
            
            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > Line Manager: </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="text" placeholder="Line Manager" value={lineManager} onChange={(e) => {setLineManager(e.target.value); clearErrors()}} aria-label="line manager name"/>
            <p id="lineManagerError" className='text-red-500 text-xs hidden'>{lineManagerError}</p>
            
            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > Start Date: </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); clearErrors()}} aria-label='start date'/>
            <p id="startDateError" className='text-red-500 text-xs hidden'>{startDateError}</p>
            
            <label className='block text-gray-700 text-sm font-bold mb-2 mt-3' > Business Area: </label>
            <select className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={businessArea} onChange={(e) => {setBusinessArea(e.target.value); clearErrors()}} aria-label="business area option" >
              <option value="">Select...</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Housing">Housing</option>
              <option value="Care">Care</option>
            </select>
            <p id="businessAreaError" className='text-red-500 text-xs hidden'>{businessAreaError}</p>
            
            <input type="submit" value="Submit" className='col-span-2 bg-green-500 rounded py-1 px-3 my-4 cursor-pointer active:bg-green-600'/>
        </form>
      </>
    )
}