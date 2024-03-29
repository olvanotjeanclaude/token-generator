import { MainContext } from "@/context/MainContext";
import { useContext } from "react";

const useMainContext = () => useContext(MainContext);

export default useMainContext;