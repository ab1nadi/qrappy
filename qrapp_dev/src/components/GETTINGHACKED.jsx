import { useState, useEffect } from 'react';
import svg from '../assets/skull.svg';

let timeToWait = 0

export function GettingHacked() {
  let [percent, setPercent] = useState(1);  // Start as a number, not a string

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prevPercent => {
        // Stop at 100%
        if (prevPercent >= 100) {
          clearInterval(interval);
          return 100;
        }
        if(timeToWait > 500)
        {
          return prevPercent + 1;  // Increment by 1
        }
        else 
        {
          timeToWait+= 50
          return prevPercent
        }

      });
    }, 100);

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center -z-10'>
      <div className='w-full flex justify-center'>
        <img className='w-80 h-80' src={svg} alt="Skull" />
      </div>
      <div className='w-full flex justify-center'>
        <h1 className="text-red-600">DOWNLOADING TROJAN</h1>
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-[500px] h-10 border-black border-2'>
          <div
            style={{ width: `${percent}%` }}
            className='h-full bg-red-600'
          ></div>
        </div>     
      </div>
    </div>
  );
}
