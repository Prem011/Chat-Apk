import React from 'react';

const Loading = () => {
  return (
    <div role="status" aria-live="polite" className='h-screen bg-slate-600 flex justify-center items-center'>
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full" aria-hidden="true"></div>
        <div className="skeleton h-4 w-28" aria-hidden="true"></div>
        <div className="skeleton h-4 w-full" aria-hidden="true"></div>
        <div className="skeleton h-4 w-full" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export default Loading;
