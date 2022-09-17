import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000', {})
    .then(res => setData(res.data))
    .catch(err => console.log(err));    
  }, []);

  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
