import React from 'react'
import { useTasks } from '@/context/taskContext';

function Filters() {
  const {priority, setPriority} = useTasks();
  const priorities = ["All", "High", "Medium", "Low"];
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className='relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md'>
        {priorities.map((priority, index) => (
          <button key={index}
          className={`relative px-1 z-10 font-medium text-sm ${activeIndex  === index ? "text-[#3aafae] bg-blue-500" : "text-gray-500"}`}
          onClick={() => { 
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}>{priority}
          </button>
        ))}
    </div>
  );
}

export default Filters
