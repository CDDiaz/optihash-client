import React, { Component } from 'react';
import axios from 'axios';
import './css/Coins.scss';

// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';


class Coins extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      exchange: ''
    }
    // bindings here
  };

  componentDidMount() {
    axios.get('https://api.minerstat.com/v2/coins?list=BTC,ETH,BCH,ETC,ERG,FIRO,RVN,CFX,XMR,DOGE,LTC,KDA,CTXC').then((response) => {
      console.log("Response", response);
      this.setState({ coins: response.data });
    });

    axios.get('https://api.frankfurter.app/latest?amount=1&from=USD&to=AUD').then((result) =>
    {
      console.log("Exchange", result.data.rates.AUD);
      this.setState({ exchange: result.data.rates.AUD });
    });
  };



  render() {
    const header = ["Coin", "Tag", "Algorithm", "Price in USD", "Price in AUD"];
    return (
      <div>
        <h2>Coins:</h2>
        <ul>
          {this.state.coins.map(coin => (
            <li key={coin.id}>
            <a href={coin.name}>{coin.coin}</a>
            </li>
          ))}
        </ul>
        <h2>Coins:</h2>
        <table>
          <thead>
            <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {Object.keys(this.state.coins).map((k, i) => {
              let data = this.state.coins[k];
              return (
                <tr key={i}>
                  <td><a href={data.coin}>{data.name}</a></td>
                  <td>{data.coin}</td>
                  <td>{data.algorithm}</td>
                  <td>$ {data.price.toFixed(2)}</td>
                  <td>$ {(data.price*this.state.exchange).toFixed(2)}</td>
                </tr>
              );
            })}
            </tbody>
          </table>

      </div>


    );
  };
};

export default Coins;
