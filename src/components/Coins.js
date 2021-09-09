import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Coins.scss';

// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';


class Coins extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      usdToAud: '',
      search: ''
    }
    this.searchInput = React.createRef();
    this._handleChange = this._handleChange.bind(this);
  };

  componentDidMount() {
    axios.get('https://api.minerstat.com/v2/coins?list=BTC,ETH,BCH,ETC,ERG,FIRO,RVN,CFX,XMR,DOGE,LTC,KDA,CTXC').then((response) => {
      console.log("Response", response);
      this.setState({ coins: response.data });
    });

    axios.get('https://api.frankfurter.app/latest?amount=1&from=USD&to=AUD').then((result) =>
    {
      console.log("USD to AUD", result.data.rates.AUD);
      this.setState({ usdToAud: result.data.rates.AUD });
    });
  };

  _handleChange() {
    console.log("_handleChange", this.searchInput.current.value);
    this.setState({ search: this.searchInput.current.value })
  };

  compareByAsc(key) {
     return function(a, b) {
       if (a[key] < b[key]) return -1;
       if (a[key] > b[key]) return 1;
       return 0;
     };
   }

   compareByDesc(key) {
     return function(a, b) {
       if (a[key] < b[key]) return 1;
       if (a[key] > b[key]) return -1;
       return 0;
     };
   }

   sortBy(key) {
     console.log("SORT");
     let arrayCopy = [...this.state.coins];
     const arrInStr = JSON.stringify(arrayCopy);
     arrayCopy.sort(this.compareByAsc(key));
     const arrInStr1 = JSON.stringify(arrayCopy);
     if (arrInStr === arrInStr1) {
       arrayCopy.sort(this.compareByDesc(key));
     }
     this.setState({ coins: arrayCopy });
   }

  render() {
    const { coins } = this.state;

    return (
      <div>
        <h2>Coins:</h2>
        <ul>
          {coins.map(coin => (
            <li key={coin.id}>
            <a href={coin.name}>{coin.coin}</a>
            </li>
          ))}
        </ul>

        <h2>Coins Search:</h2>
        <label>
          Search:
        </label>
        <input onChange={this._handleChange} type="text" defaultValue="" ref={this.searchInput}/>
        <table>
        <thead>
          <tr>
            <th onClick={() => this.sortBy("name")}>Coin</th>
            <th onClick={() => this.sortBy("coin")}>Tag</th>
            <th onClick={() => this.sortBy("algorithm")}>Algorithm</th>
            <th onClick={() => this.sortBy("price")}>Price in USD</th>
            <th onClick={() => this.sortBy("price")}>Price in AUD</th>
          </tr>
        </thead>
          <tbody>
            { coins.filter(coin => coin.name.toLowerCase().includes(this.state.search) || coin.coin.toLowerCase().includes(this.state.search)).map((filteredCoin, i) => (
              <tr key={i}>
                <td>
                  <Link
                    to={{
                      pathname: `/coin/${filteredCoin.coin}`,
                      state: { coin: filteredCoin, conversion: this.state.usdToAud }
                    }}
                  >
                    <a href={filteredCoin.coin}>{filteredCoin.name}</a>
                  </Link>
                </td>
                <td>{filteredCoin.coin}</td>
                <td>{filteredCoin.algorithm}</td>
                <td>$ {filteredCoin.price.toFixed(2)}</td>
                <td>$ {(filteredCoin.price*this.state.usdToAud).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    );
  };
};

export default Coins;
