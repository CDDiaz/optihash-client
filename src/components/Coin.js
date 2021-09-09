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
    <div>
    <h1>{ state.coin.name }</h1>

      <div>
        <div>{state.coin.coin}</div>
        <div>{state.coin.algorithm}</div>
        <div>USD $ {state.coin.price.toFixed(2)}</div>
        <div>AUD $ {(state.coin.price*state.conversion).toFixed(2)}</div>
      </div>
      <h2>Chart</h2>
      <div className="chart">
        {!!data ? <Chart data={data}/> : null}
      </div>

    </div>
  );
}

export default Coin;
