import { useState } from "react";
import Clock from "./Clock";
import Weather from "./Weather";
import Finance from "./Finance";
import "./Main.css";

export default function Main() {
  const [currentTab, setCurrentTab] = useState(1);
  const [timeout, settimeout] = useState(null);
  const tabs = [
    <Weather />,
    <Clock />,
    <Finance />,
];

  const navigateLeft = () => {
    if (currentTab === 0) {
      setCurrentTab(tabs.length - 1);
      return;
    }
    setCurrentTab((currentTab - 1 + tabs.length) % tabs.length);
    clearTimeout(timeout)
    const latestTimeout = setTimeout(() => {
      setCurrentTab(1)
    }, 10000)
    settimeout(latestTimeout)
  };

  const navigateRight = () => {
    if (currentTab === tabs.length - 1) {
      setCurrentTab(0);
      return;
    }
    setCurrentTab((currentTab + 1) % tabs.length);
    clearTimeout(timeout)
    const latestTimeout = setTimeout(() => {
      setCurrentTab(1)
    }, 10000)
    settimeout(latestTimeout)
  };

  return (
    <>
      <div className="main">{tabs[currentTab]}</div>
      <div className="navigation">
        <button className="navigationButton" onClick={navigateLeft}></button>
        <button className="navigationButton" onClick={navigateRight}></button>
      </div>
    </>
  );
}
