import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {
    const [read,setRead] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setRead(response.data)
            } catch (error) {
                console.error("Error fetching user data:", error);

            }
        };

        fetchUserData();
    }, []);
    if (!read) {  // Loading state
        return <div>Loading...</div>; // Or a more elaborate loading indicator
    }
  return (
    <div className='w-full h-screen bg-zinc-100 flex items-center justify-center'>
            <div className='w-[50vw] h-[50vh] bg-white shadow-xl p-6'> {/* Added padding */}
                <span className='text-center text-2xl font-bold mb-4 block'>Details of user</span> {/* Added margin bottom and block display */}
                <div className='mt-5'>
                    <strong>Name: {read.username} </strong> 
                </div >
                <div className='mt-5'>
                    <strong>Email:</strong> {read.email}
                </div>
                <div className='mt-5'>
                    <strong>Phone:</strong> {read.phone}
                </div>
                <Link to={`/update/${id}`} className='p-2 bg-green-500 mt-5 inline-block'>Edit</Link> {/* Added margin top and made it inline-block */}
                <Link to="/" className="p-2 bg-blue-500 ml-2 mt-4 inline-block text-white">Back to Home</Link> {/* Added Back button */}

            </div>
        </div>  
  )
}

export default Read
