import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Jury from "./components/jury";
import Dispute from "./components/dispute";
import AmountSubmit from "./components/stake";
import BuyToken from "./components/buyToken";
import { SEPOLIA_ID } from "./config";

function App() {
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        window.alert("Connect to Metamask");
        window.location = "https://metamask.io/";
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain:' + chainId);
      const sepoliaChainId = SEPOLIA_ID;

      if (chainId !== sepoliaChainId) {
        alert('You are not connected to the Sepolia Testnet!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Found account', accounts[0]);
      setCurrentAccount(accounts[0]);

    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log('Connected to chain:' + chainId);
  };

  useEffect(() => {
    if (currentAccount) {
      checkCorrectNetwork();
    }
  }, [currentAccount]);

  useEffect(()=>{
    connectWallet();
  },[])

  return (
    <Router>
      <div>
        <Navbar account={currentAccount}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/dispute" element={<Dispute />} />
          <Route path="/stake" element={<AmountSubmit />} />
          <Route path="/buytoken" element={<BuyToken />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;