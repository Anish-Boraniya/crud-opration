import React, { useState ,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function Update() {
    const [add,setadd] = useState({
        username: '',
        email: '',
        phone: '',
      })

    const {id} = useParams()
    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                const users = response.data
                if (users) {
                    setadd(users);
                    console.log(users);
                } else {
                    console.error("User not found!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);

            }
        };

        fetchUserData();
    }, [id]);
  
      const navigate = useNavigate();
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/${id}`, add);
            navigate('/');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
  return (
    <div className='w-full h-screen bg-zinc-50 p-1'>
        
      <form 
      onSubmit={handleUpdate}
      className='flex flex-col w-full max-w-md mx-auto m-15 bg-white rounded-xl p-5 w-[150vw] shadow-xl'>
        <span className='text-center  text-3xl font-bold text-gray-800'>
          Update the record
        </span>
        <input
          className='w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-7'
          type='text'
          placeholder='Name'
          value={add.username}
          onChange={(e) => setadd({...add, username: e.target.value })}
        />
        <input
          className='w-full mt-4 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='email'
          placeholder='Email'
          value={add.email}
          onChange={(e) => setadd({...add, email: e.target.value })}
        />
        <input
          className='w-full mt-4 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='text'
          placeholder='Phone'
          value={add.phone}
          onChange={(e) => setadd({...add, phone: e.target.value })}
        />
         <button className='w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 '>
          Update  
        </button>
         <button className='w-full mt-3 px-3 py-2 text-gray-800 hover:text-gray-600'>
           <Link to='/' > Back</Link>
        </button>
      </form>
    </div>
  )
}

export default Update
