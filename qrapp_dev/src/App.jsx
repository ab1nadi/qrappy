import { useEffect, useState } from 'react';
import { GettingHacked } from './components/GETTINGHACKED';
import { HaHaFunny } from './components/hahahfunny';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [showHaha, setShowHaHa] = useState(false);

  useEffect(() => {
    let uuid = getUUID();
    let location = getLocation();
    
    fetch('/api/connected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: uuid, location:  location}),
    })
    .catch(error => console.error('Error:', error));

    const timer = setTimeout(() => {
      setShowHaHa(true);
    }, 10000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run once on mount

  const showStats = () => {
    const queryParams = new URLSearchParams(window.location.search);
    // Get the 'stats' parameter value
    const stats = queryParams.get('stats');
  
    console.log(stats);  // This will log the string value of 'stats'
  
    // Check if stats is the string 'true'
    return stats === 'true';
  };

  return (
    <>
      {showHaha ? <HaHaFunny /> : <GettingHacked />}
    </>
  );
}

export default App;

// Store the uuid in the browser
function getUUID() {
  let uuid = localStorage.getItem('uuid');

  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem('uuid', uuid);
  }

  return uuid;
}

function getLocation()
{
  let stuff = document.location.pathname.split("/").slice(1, 2).toString();

  console.log(stuff)
  return stuff
}
