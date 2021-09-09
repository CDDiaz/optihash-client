import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';

const Card = () => {
  const { state } = useLocation();
  const thisCard = state;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getCard = () => {
      axios.get(SERVERURL+'/cards/'+thisCard.card.id).then((response) => {
        setInfo(response.data.info);
      });
    };
    getCard();
  }, []);

  console.log("STATE", state);
  console.log("thisCard", thisCard);
  console.log("info", info);
  // console.log("PROPS", props);
  const name = thisCard.card.model.split(' ').join('+');
  console.log("name", name);
  // if (!!input) {
  //   const price = Number(info.price.split('$')[1]);
  // }

  // console.log("price", price);

  return (
    <div>
    <h1><span className={`maker ${ thisCard.card.gpu_maker === "NVIDIA" ? "green" : "red" }`}>{ thisCard.card.gpu_maker }</span> {thisCard.card.model}</h1>

      <div>
        <div>Power { thisCard.card.power }</div>
        <div>Efficiency { thisCard.card.efficiency }</div>
        <div>Cost $ { thisCard.card.powerCost }</div>
        <div>Revenue $ { thisCard.card.revenue }</div>
        <div>Profit $ { thisCard.card.profit }</div>
      </div>
      <h2>Price</h2>
      <div>
        <div>{!!info ? info.price : "not available"}</div>
        <div><a href={!!info ? info.url : null}>Buy</a></div>
        <div><a href={`https://staticice.com.au/cgi-bin/search.cgi?q=${name}+price:500`}>Other Options</a></div>

      </div>
      <h2>Return of Investment</h2>
      <div>
        <div>Days to break even: { Math.ceil((!!info ? Number(info.price.split('$')[1]) : 9999)/(thisCard.card.revenue))}</div>
        <div></div>
      </div>


    </div>
  );
}

export default Card;
