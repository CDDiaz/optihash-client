import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = (props) => {
const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
return (

    <div class="body-box">
      <h1>Optimal Hashing</h1>

      <div className="home1">
        <h2>What is GPU mining?</h2>
        <p>Crypto mining remains one of the most viable ways to participate in the upside of digital currencies without buying them directly. In practice, miners' computers compete by solving complex mathematical equations that help verify digital currency transactions and update the shared ledger called the blockchain.</p>
        <p>GPU mining involves the use of a gaming computer's graphics processing unit to solve complex math problems to verify electronic transactions on a blockchain. Normally, to mine a cryptocurrency, digital coins must be built on a blockchain architecture that supports proof-of-work (PoW) mining.</p>
      </div>

      <div className="home2">
        <h2>What coins are mineable?</h2>
        <p>A mineable digital coin (cryptocurrency) is a coin that is created and can be acquired through the mining process. Proof of work (PoW) is a decentralized consensus mechanism that requires members of a network to expend effort solving an arbitrary mathematical puzzle to prevent anybody from gaming the system. Proof of work is used widely in cryptocurrency mining, for validating transactions and mining new tokens.</p>
        <p>By mining, you can earn cryptocurrency without having to put down money for it. Bitcoin miners receive Bitcoin as a reward for completing "blocks" of verified transactions, which are added to the blockchain. Mining rewards are paid to the miner who discovers a solution to a complex hashing puzzle first, and the probability that a participant will be the one to discover the solution is related to the portion of the total mining power on the network. You need either a GPU (graphics processing unit) or an application-specific integrated circuit (ASIC) in order to set up a mining rig.</p>
      </div>

      <div className="home3">
        <h2>Which GPU is better for mining?</h2>
        <p>The number of correct guesses a device makes per unit of time is its hash rate. Therefore, the best GPUs for mining are those with high hash rates! GPUs have become important tools for doing intense rendering work as seen in video production and playing the latest video games.</p>

      </div>


    </div>
  );
};
export default Home;
