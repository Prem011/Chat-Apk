import React, { useEffect } from "react";
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Typesend from "./Typesend.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full h-full  bg-slate-900 text-gray-300">
      <div className="flex flex-col h-full" >
        <div>
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              <Chatuser />
              <div
                  className="flex-1 overflow-y-auto"
                  style={{
                      maxHeight: "calc(92vh - 8vh - 1.5rem)",
                      // Apply different maxHeight values based on screen size
                      '@media (min-width: 768px)': { maxHeight: "calc(92vh - 8vh)" }, // md and above
                      '@media (max-width: 767px)': { maxHeight: "calc(92vh - 8vh - 1.5rem)" } // sm and below
                  }}
              >
                <Messages />
              </div>
              <Typesend />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white ml-[-2vw] text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className=" w-80 text-center mx-auto">
            Welcome{" "}
            <span className=" font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br className="my-2" />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
}