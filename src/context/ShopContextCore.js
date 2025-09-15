import { createContext } from "react";

// Create and export ShopContext from a small module so that
// ShopContext.jsx can export only a React component (fixes react-refresh rule).
export const ShopContext = createContext();
