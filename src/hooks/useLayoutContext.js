import { LayoutContext } from "@/context/LayoutContext";
import { useContext } from "react";

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;