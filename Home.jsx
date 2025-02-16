import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
   const [data,setdata] = useState()
   useEffect(()=>{
     axios.get('http://localhost:3000/users')
    .then(res=>{
      setdata(res.data)
      console.log(res.data)
    })
    .catch(error=>console.log(error))
   },[])

   const handleDelete = async (id,username)=>{
     const comform = window.confirm(`Are you sure you want to delete data of "  ${username} "`)
      if (comform){
        try{
          await axios.delete(`http://localhost:3000/users/${id}`)
          const res = await axios.get('http://localhost:3000/users')
          const redata = res.data
          const seqData = redata.map((data,index)=>({
            ...data, id: (index + 1).toString()
          }))
  
          setdata(seqData)
        } catch (error){
          console.error(error)
        }
      }
   }
  return (
    <div className='w-full flex items-center flex-col gap-5  bg-zinc-100'>
        <h1 className='text-4xl pt-5 text-center font-bold'>USERS DETAILS</h1>
        <div className='w-[160vh]  text-md p-5 bg-white shadow '  >
            <Link to={ `/create `} >
                <button   className='bg-lime-600 hover:bg-lime-700 text-white p-2 rounded w-[15vw]'>Add User</button>
            </Link>
            <table className='w-full  border-collapse table-auto border-separate border-spacing-2'>
                <thead>
                    <tr className=' text-left text-md text-gray-700'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                  {
                    data?.map((item,index)=>
                        <tr key={index} className=''>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className='flex gap-3 '>
                            <Link to={`/read/${item.id}`} className='bg-teal-500 hover:bg-teal-600 text-center p-1 rounded w-[5vw]'>Read</Link>  | 
                              <Link to={`/Update/${item.id}`} className='bg-blue-600 text-center hover:bg-blue-700 p-1 rounded w-[5vw]'>Edit</Link> | <button onClick={()=>handleDelete(item.id,item.username)} className='bg-red-600 hover:bg-red-700 rounded w-[5vw]'>Delete</button>
                            </td>
                        </tr>
                    )
                  }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home
