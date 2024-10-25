import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import GetallUser from '../../context/GetallUser'; // Importing user context
import { toast } from 'react-toastify';


const Search = () => {
  const [search, setSearch] = useState(""); // State for search input
  const [allUsers] = GetallUser(); // Fetch all users from the context
  const { setSelectedConversation } = useConversation(); // Zustand store for conversation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    // Search for the user based on their fullname (case insensitive)
    const conversation = allUsers.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation); // Set the selected conversation
      setSearch(""); // Reset the search input
    } else {
      // alert("User not found");
      toast.error("User not found")
    }
  };

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <label className="input border border-zinc-950 bg-slate-800 p-3 flex items-center gap-2 w-[80%]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit">
            <FaSearch className="text-5xl p-2 hover:bg-zinc-600 rounded-md duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
