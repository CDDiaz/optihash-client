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
    const header = ["Coin", "Tag", "Algorithm", "Price in USD", "Price in AUD"];
    const { coins } = this.state;

    return (
      <div>

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
            { coins.map((k, i) => (
              <tr key={i}>
                <td><a href={k.coin}>{k.name}</a></td>
                <td>{k.coin}</td>
                <td>{k.algorithm}</td>
                <td>$ {k.price.toFixed(2)}</td>
                <td>$ {(k.price*this.state.usdToAud).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>{header.map((h, i) => <th key={i} onClick={() => this.sortBy(h)}>{h}</th>)}</tr>
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
                  <td>$ {(data.price*this.state.usdToAud).toFixed(2)}</td>
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
