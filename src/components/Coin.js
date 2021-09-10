import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Chart from './Chart';

const Coin = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData =  () => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${state.coin.name.toLowerCase().split(' ').join('-')}/market_chart?vs_currency=aud&days=30&interval=daily`).then((response) => {
        setData(response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))})));
      });
    };
    fetchData();
  }, []);

  return (
    <div class="body-box">
    <h1>{ state.coin.name }</h1>

      <div class="content-sc">
        <div className="stat-container">
          <div className="card-box">
            <span className="stat-box">Coin Tag</span>
            <span className="stat-box"><h2>{state.coin.coin}</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">Name</span>
            <span className="stat-box"><h2>{state.coin.algorithm}</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">USD $</span>
            <span className="stat-box"><h2>{state.coin.price.toFixed(2)}</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">AUD $</span>
            <span className="stat-box"><h2>{(state.coin.price*state.conversion).toFixed(2)}</h2> </span>
          </div>
        </div>
      </div>
      <h2>Chart</h2>
      <div className="chart">
        {!!data ? <Chart data={data}/> : null}
      </div>

    </div>
  );
}

export default Coin;
