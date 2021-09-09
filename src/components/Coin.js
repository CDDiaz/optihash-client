import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import Chart from './Chart';

// Functional components: good when you don't need state.
// Think of it as just the render method.
// No `this`.

// Access props by creating a parameter for them.
const Coin = () => {
  const { state } = useLocation();
  console.log("STATE", state);

  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    const fetchData =  () => {
      axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=aud&days=30&interval=daily').then((response) => {
        setData(response.data.prices.map(([date, price]) => ({date: new Date(date), name: `name${price+1}`, value: Number(price.toFixed(2))})));
      });
    };
    fetchData();
  }, []);

  // console.log("fact", fact.prices[0]);

  return (
    <div>
    <h1>{ state.coins.name }</h1>

      <div>
        <div>{state.coins.coin}</div>
        <div>{state.coins.algorithm}</div>
        <div>USD $ {state.coins.price.toFixed(2)}</div>
        <div>AUD $ {(state.coins.price*state.conversion).toFixed(2)}</div>
      </div>
      <p>{ "hi"}</p>
      <div className="chart">
        {!!data ? <Chart data={data}/> : null}
      </div>
      
    </div>
  );
}

export default Coin;

      // { props.coins.map( (url) => (<img src={ url } key={ url } alt="Copyright Flickr" />) ) }
