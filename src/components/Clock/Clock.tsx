import { useEffect, useState } from "react";
import "./Clock.css";
import '@fontsource/fira-code';

export default function Clock() {
  const [time, setTime] = useState(
    new Date()
      .toLocaleTimeString(navigator.language, {
        hour12: false,
      })
      .split(":")
  );

  const interval = setInterval(() => {
    setTime(
      new Date()
        .toLocaleTimeString(navigator.language, {
          hour12: false,
        })
        .split(":")
    );
  }, 1000);

  useEffect(() => {
    return () => clearInterval(interval);
  });

  return (
    <div className="clock">
      <div className="time">
        {`${time[0]}:${time[1]} `}
        <span className="sec">{time[2]}</span>
      </div>
    </div>
  );
}
