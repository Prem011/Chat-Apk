import React from 'react'
import User from './User'
import GetallUser from '../../context/GetallUser'

const Users = () => {

  const[allUsers, loading] = GetallUser()
  // console.log(allUsers);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(allUsers)) {
    return <p>Error: Data format is incorrect.</p>;
  }

  if (allUsers.length === 0) {
    return <p>No users found.</p>;
  }
  

  return (
    <div className='' >
        <h1 className='bg-slate-800 p-2 mt-3 px-5 rounded-lg text-white text-2xl  '  >Messages</h1>
        <div className='overflow-y-auto ' style={{maxHeight:"calc(80vh - 1vh)"}} >

        {allUsers.map((user, index) =>{
          return  <User key={index} user={user}/>
        })}   
{/*     
        {allUsers.map(user => (
          <User key={user} user={user} />
        ))}    */}

        </div>
    </div>
  )
}

export default Users

