import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

// Functional components: good when you don't need state.
// Think of it as just the render method.
// No `this`.

// Access props by creating a parameter for them.
const Coin = () => {
  const { state } = useLocation();
  console.log("STATE", state);

  const [fact, setFact] = useState(null);

  useEffect(() => {
    axios.get('http://numbersapi.com/random/trivia').then((response) => {
      setFact(response.data);
    });
  }, []);

  return (
    <div>
    <h1>{ state.coins.name }</h1>

      <div>
        <div>{state.coins.coin}</div>
        <div>{state.coins.algorithm}</div>
        <div>USD $ {state.coins.price.toFixed(2)}</div>
        <div>AUD $ {(state.coins.price*state.conversion).toFixed(2)}</div>
      </div>
      <p>{ fact }</p>
    </div>
  );
}

export default Coin;

      // { props.coins.map( (url) => (<img src={ url } key={ url } alt="Copyright Flickr" />) ) }
