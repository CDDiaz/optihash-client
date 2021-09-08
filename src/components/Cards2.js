import React, { Component } from 'react';
import axios from 'axios';
import './css/Coins.scss';

// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';


class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      selectedCurrency: 'aud',
      currency: '',
      ethToAud: '',
      ethToUsd: '',
      electricity: 0.34,
      miningReward: ''
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this.electricityInput = React.createRef();
    this.currencySelect = React.createRef();
  };

  componentDidMount() {
    console.log("componentDidMount");
    axios.get(SERVERURL+'/cards').then((response) => {
      console.log("Response", response.data.cards);
      this.setState({ cards: response.data.cards });
    });

    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=AUD').then((result) =>
    {
      console.log("ETH to AUD", result.data.ethereum.aud);
      this.setState({ ethToAud: result.data.ethereum.aud});
      this.setState({ currency: result.data.ethereum.aud});
    });

    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD').then((result) =>
    {
      console.log("ETH to USD", result.data.ethereum.usd);
      this.setState({ ethToUsd: result.data.ethereum.usd});
    });

    axios.get(`https://api.minerstat.com/v2/coins?list=ETH`).then((result) =>
    {
      console.log("Mining Reward", result.data[0].reward);
      this.setState({ miningReward: result.data[0].reward});
    });
  };

  fetchMiningEstimates(hashrate) {
    let gross = (1000000 * this.state.miningReward * hashrate * 24 * this.state.currency);
    return gross;
  }

  electricityCost(power) {
    let cost = ((power*24)/1000)*this.state.electricity;
    return cost;
  }

  _handleSubmit(event) {
    event.preventDefault();
    console.log("_handleSubmit " + this.electricityInput.current.value);
    this.setState({electricity: Number(this.electricityInput.current.value)});

    console.log("_handleSubmit " + this.currencySelect.current.value);
    this.setState({selectedCurrency: this.currencySelect.current.value});

    if (this.currencySelect.current.value === "aud") {
      this.setState({currency: this.state.ethToAud});
    } else {
      this.setState({currency: this.state.ethToUsd});
    };
  }

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
    let arrayCopy = [...this.state.cards];
    const arrInStr = JSON.stringify(arrayCopy);
    arrayCopy.sort(this.compareByAsc(key));
    const arrInStr1 = JSON.stringify(arrayCopy);
    if (arrInStr === arrInStr1) {
      arrayCopy.sort(this.compareByDesc(key));
    }
    this.setState({ cards: arrayCopy });
  }

  render() {
    const header = [ "GPU", "Model", "Hashrate", "Power", "Efficiency", "Cost / Day", "Revenue / Day", "Profit / Day"];
    const { cards } = this.state;
    return (
      <div>
        <h2>Cards:</h2>
        <ul>
          {cards.map(card => (
            <li key={card.id}>
            <a href={card.model}>{card.model}</a>
            </li>
          ))}
        </ul>

        <h2>Cards:</h2>

        <div>
          <form onSubmit={this._handleSubmit}>
            <label>
              Currency:
            </label>
            <select defaultValue={this.state.selectedCurrency} ref={this.currencySelect}>
              <option value="aud" >Australian Dollars - AUD</option>
              <option value="usd" >US Dollars - USD</option>
            </select>

            <label>
              Electricity Cost per kWh:
            </label>
            <input type="text" defaultValue={this.state.electricity} ref={this.electricityInput}/>
            <span>$/kWh</span>
            <input type="submit" value="Set" />
            <button name="button" type="submit">Set</button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => this.sortBy("gpu_maker")}>GPU</th>
              <th onClick={() => this.sortBy("model")}>Model</th>
              <th onClick={() => this.sortBy("hashrate")}>Hashrate</th>
              <th onClick={() => this.sortBy("power")}>Power</th>
              <th>Efficiency</th>
              <th>Cost / Day</th>
              <th>Revenue / Day</th>
              <th>Profit / Day</th>
            </tr>
          </thead>
          <tbody>
            { cards.map((k, i) => (
                <tr key={i}>
                  <td className={`maker ${ k.gpu_maker === "NVIDIA" ? "green" : "red" }`}>{k.gpu_maker}</td>
                  <td><a href={k.id}>{k.model}</a></td>
                  <td>{k.hashrate} Mh/s</td>
                  <td>{k.power} W</td>
                  <td>{(k.hashrate/k.power).toFixed(3)} Mh/W</td>
                  <td>$ {(this.electricityCost(k.power)).toFixed(2)}</td>
                  <td>$ {(this.fetchMiningEstimates(k.hashrate)).toFixed(2)}</td>
                  <td>$ {(this.fetchMiningEstimates(k.hashrate)-this.electricityCost(k.power)).toFixed(2)}</td>
                </tr>
          ))}
          </tbody>
        </table>

      </div>


    );
  };
};

export default Cards;
