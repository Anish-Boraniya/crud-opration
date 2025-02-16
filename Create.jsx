import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function Create() {
  const [add, setadd] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [nextId, setNextId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing data to determine the next ID
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
        const lastId = res.data.length > 0 ? Math.max(...res.data.map(user =>  parseInt(user.id, 10))) : 0;
        setNextId((lastId + 1).toString( ));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nextId === null) return; // Ensure nextId is set

    const newRecord = { ...add, id: nextId };

    try {
      await axios.post('http://localhost:3000/users', newRecord);
      navigate('/'); // Redirect after successful creation
    } catch (error) {
      console.error(error);
    }
};
  return (
    <div className='w-full h-screen bg-zinc-50 p-1'>
        
      <form 
       onSubmit={handleSubmit}
      className='flex flex-col w-full max-w-md mx-auto m-15 bg-white rounded-xl p-5 w-[150vw] shadow-xl'>
        <span className='text-center  text-3xl font-bold text-gray-800'>
          Create a new record
        </span>
        <input
          className='w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-7'
          type='text'
          placeholder='Name'
          onChange={(e) => setadd({...add, username: e.target.value })}
        />
        <input
          className='w-full mt-4 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='email'
          placeholder='Email'
          onChange={(e) => setadd({...add, email: e.target.value })}
        />
        <input
          className='w-full mt-4 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='number'
          placeholder='Phone'
          onChange={(e) => setadd({...add, phone: e.target.value })}
        />
         <button className='w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 '>
          Create  
        </button>
         <button className='w-full mt-3 px-3 py-2 text-gray-800 hover:text-gray-600'>
           <Link to='/' > Back</Link>
        </button>
      </form>
    </div>
  )
}

export default Create
