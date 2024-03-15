import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;

  const callApi = async () => {
    try {
      const res = await axios.get("https://3ofwrsst8j.execute-api.ap-southeast-1.amazonaws.com/patarapong_spa_dev/koiking",
        {
          params: {
            page: currentPage + 1,
            perPage,
          }
        });
      setData([...data, ...res.data]);
      setCurrentPage(currentPage + 1)
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
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

  const onButtonClick = async () => {
    callApi()
  };

  return (
    <div>
      <Container>
        <Row>
          {data.map((item, index) => (
            <Col xs={4} key={index} className="">
              <img src={item.url} alt={item.description} />
              <div className="description">{item.description}</div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Button onClick={onButtonClick}>Show More</Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
