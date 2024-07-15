import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput/currencyImput"
import imgDireita from "./assets/undraw_make_it_rain_re_w9pc.svg"
import imgEsquerda from "./assets/undraw_savings_re_eq4w.svg"
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const [firstCoin, setFirstCoin] = useState(1);
  const [secondCoin, setSecondCoin] = useState(1);

  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  const [rates, setRates] = useState(null);
  const [convertedValue, setConvertedValue] = useState({ value: null, currency: "" });

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setRates(response.data.rates);
        console.log("api", response);
      })
      .catch((error) => {
        console.error("Erro ao buscar taxas de câmbio:", error);
        setRates({});
      });
  }, []);

  function format(number) {
    return number.toFixed(2);
  }

  const handleAmount1Change = useCallback(
    (firstCoin) => {
      if (rates) {
        const secondCoin = format(
          (firstCoin * rates[currency2]) / rates[currency1]
        );
        setFirstCoin(firstCoin);
        setSecondCoin(secondCoin);
        setConvertedValue({ value: secondCoin, currency: currency2 });
      }
    },
    [rates, currency1, currency2]
  );

  useEffect(() => {
    if (rates) {
      const secondCoin = format(
        (firstCoin * rates[currency2]) / rates[currency1]
      );
      setSecondCoin(secondCoin);
      setConvertedValue({ value: secondCoin, currency: currency2 });
    }
  }, [rates, firstCoin, currency1, currency2]);

  function handleCurrency1Change(currency1) {
    if (rates) {
      const secondCoin = format(
        (firstCoin * rates[currency2]) / rates[currency1]
      );
      setCurrency1(currency1);
      setSecondCoin(secondCoin);
      setConvertedValue({ value: secondCoin, currency: currency2 });
    }
  }

  function handleAmount2Change(secondCoin) {
    if (rates) {
      const firstCoin = format(
        (secondCoin * rates[currency1]) / rates[currency2]
      );
      setSecondCoin(secondCoin);
      setFirstCoin(firstCoin);
      setConvertedValue({ value: secondCoin, currency: currency2 });
    }
  }

  function handleCurrency2Change(currency2) {
    if (rates) {
      const firstCoin = format(
        (secondCoin * rates[currency1]) / rates[currency2]
      );
      setCurrency2(currency2);
      setFirstCoin(firstCoin);
      setConvertedValue({ value: firstCoin, currency: currency2 });
    }
  }

  if (!rates) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="Container">
      <Header/>
      <div className="content">
      
        <h1>Conversor de moedas</h1>

        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={firstCoin}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={secondCoin}
          currency={currency2}
        />

        <h2>O valor convertido é: {convertedValue.value} {convertedValue.currency}</h2>
      </div>

      <div className="img-text-container">
        <img src={imgEsquerda} alt="Imagem Esquerda" className="img-esquerda" />
        <p className="img-text">
          Viajar para um país estrangeiro é uma experiência emocionante, cheia de novas culturas, paisagens e aventuras. No entanto, é crucial ter noção da diferença de valor entre a moeda local e a moeda do destino. Essa compreensão pode fazer uma grande diferença no seu planejamento financeiro e na forma como você gasta durante a viagem.
        </p>
      </div>

      {/* Imagem na parte inferior direita */}
      <img src={imgDireita} alt="Imagem Direita" className="img-direita" />
      
      <Footer/>
    </div>
    
  );
}

export default App;