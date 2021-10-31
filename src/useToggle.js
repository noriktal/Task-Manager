import { useState, useCallback, useMemo } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState("closed");

  const toggleMode = useCallback(() => {
    setToggle((prev) => prev === "closed" ? "open" : "closed");
  }, []);
  

  const values = useMemo(() => (
    {toggle, toggleMode}
  ), [toggle, toggleMode]);

 
  return values;
};

export default useToggle;