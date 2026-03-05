import { useState, useEffect } from "react";

function Timer() {
  const [sec, setsec] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setsec((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);   
  }, []);

  useEffect(() => {
    document.title = "Seconds" + sec
  });

  return(
    <div>
        <h2>Seconds {sec}</h2>
    </div>
  )
}

export default Timer;
