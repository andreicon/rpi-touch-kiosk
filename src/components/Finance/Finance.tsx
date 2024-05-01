import { useEffect, useState } from "react";
import "./Finance.css";

export default function Finance() {
  const [loaded, setLoaded] = useState(false);
  const [finance, setFinance] = useState({
    price: 0,
    change: 0,
  });

  const getFinance = async () => {
    const response = await fetch(
      `https://coinpaprika1.p.rapidapi.com/tickers`,
      {
        headers: {
          'X-RapidAPI-Key': '28c58a83fcmsh1105f2ace981da5p1813b5jsn22adc3e5734d',
          'X-RapidAPI-Host': 'coinpaprika1.p.rapidapi.com'
        }
      }
    )
    const data = await response.json()
    
    const btc = data.find((coin: {symbol: string}) => coin.symbol === "BTC");

    setFinance({
      price: btc.quotes.USD.price,
      change: btc.quotes.USD.percent_change_24h,
    });
  };

  useEffect(() => {
    if (loaded) return;
    getFinance().then(() => setLoaded(true));
  }, []);

  const interval = setInterval(getFinance, 1000 * 60 * 30);  

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="finance">
      <div className="left-side">
        <div>${finance.price.toFixed(2)}</div>
        <div>{finance.change}%</div>
      </div>
      
      <img
        className="finance-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
        alt="finance icon"
      />
    </div>
  );
}
