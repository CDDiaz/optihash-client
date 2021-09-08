// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const Coins2 = () => {
  console.log('<Coins /> rendering');

  const [coins, setCoins] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get('https://api.minerstat.com/v2/coins?list=BTC,BCH,BSV');
      setCoins([response.data]);
      console.log("Response",response.data);
    };
    fetchCoins();
  }, []); // empty array means "run this function only once"

  // async axios.get('https://api.minerstat.com/v2/coins?list=BTC,BCH,BSV').then((response) => {
  //   console.log("Response",response.data);
  //   setCoins([response.data]);
  // });
  // }, []); /
  // <div>
  //   <h2>Coins:</h2>
  //   { coins.map((coin) => {
  //     <li key={ coin.id }>
  //
  //     </li>
  //   })}
  //
  // </div>

  return (
    <div>
      <h2>Coins:</h2>


    </div>

  );
}

export default Coins2;
