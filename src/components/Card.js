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
    <div class="body-box">
    <h1><span className={`maker ${ thisCard.card.gpu_maker === "NVIDIA" ? "green" : "red" }`}>{ thisCard.card.gpu_maker }</span> {thisCard.card.model}</h1>

      <div class="content-sc">
        <div className="stat-container">
          <div className="card-box">
            <span className="stat-box">Hashrate</span>
            <span className="stat-box"><h2>{ thisCard.card.hashrate } Mh/s</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">Power</span>
            <span className="stat-box"><h2>{ thisCard.card.power } W</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">Efficiency</span>
            <span className="stat-box"><h2>{ thisCard.card.efficiency } Mh/W</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">Cost</span>
            <span className="stat-box"><h2>$ { thisCard.card.powerCost }</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box">Profit</span>
            <span className="stat-box"><h2>$ { thisCard.card.profit }</h2></span>
          </div>
        </div>
      </div>
      <h2>Price Tracker</h2>
      <div class="content-sc">
        <div className="stat-container">
          <div className="card-box">
            <span className="stat-box"><h2>AUD {!!info ? info.price : "not available"}</h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box"><h2><a href={!!info ? info.url : null}>Buy</a></h2></span>
          </div>
          <div className="card-box">
            <span className="stat-box"><h2><a href={`https://staticice.com.au/cgi-bin/search.cgi?q=${name}+price:500`}>Other Options</a></h2></span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <h2>Return of Investment</h2>
        <div>
          <div>Days to break even: { Math.ceil((!!info ? Number(info.price.split('$')[1]) : 9999)/(thisCard.card.revenue))}</div>
          <div></div>
        </div>
      </div>



    </div>
  );
}

export default Card;
