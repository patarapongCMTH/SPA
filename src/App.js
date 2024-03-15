import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [count, setCount] = useState(0);

  const callApi = async () => {
    try {
      const res = await axios.get("https://3ofwrsst8j.execute-api.ap-southeast-1.amazonaws.com/patarapong_spa_dev/koiking");
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const callApi0 = async () => {
    try {
      const res = await axios.get("https://3ofwrsst8j.execute-api.ap-southeast-1.amazonaws.com/patarapong_spa_dev/koiking?sendSecondResponse=true");
      setData([...data, ...res.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const callApi1 = async () => {
    try {
      const res = await axios.get("https://3ofwrsst8j.execute-api.ap-southeast-1.amazonaws.com/patarapong_spa_dev/koiking?sendThirdResponse=true");
      setData([...data, ...res.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const initialCount = 3;
  const totalCount = showMore ? data.length : initialCount;
  const chunkedData = [];
  const chunkSize = 3;
  for (let i = 0; i < totalCount; i += chunkSize) {
    chunkedData.push(data.slice(i, i + chunkSize));
  }

  const onButtonClick = async () => {
    if (count === 0) {
      callApi0();
    } else if (count === 1) {
      callApi1();
    }
    setCount(count + 1);
    setShowMore(true);
  };



  return (
    <div className="image-container">
      {chunkedData.map((row, rowIndex) => (
        <div key={rowIndex} className="image-row">
          {row.map((item, index) => (
            <div key={index} className="image-item">
              <img src={item.url} alt={item.description} />
              <div className="description">{item.description}</div>
            </div>
          ))}
        </div>
      ))}
      <button onClick={onButtonClick}>Show More</button>
    </div>
  );
}

export default App;
