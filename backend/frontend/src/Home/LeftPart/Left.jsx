import React from 'react'
import Search from "./Search"
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <div className="flex flex-col text-zinc-100 w-full h-screen bg-zinc-900">
      <Search />
      <div className="flex-1 overflow-hidden">
        <Users />
      </div>
      <hr />
      <Logout />
    </div>
  );
}

export default Left


