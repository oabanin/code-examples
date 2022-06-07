import React, { useEffect } from 'react';

export default function Countdown({ value, setValue }) {
  useEffect(() => {
    const timer = value > 0 && setInterval(() => setValue(value - 1), 1000);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{value}</span>;
}
