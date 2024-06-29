import Header from "./Components/Header/Header";
import CartList from "./Components/Cart/CartList";
import Products from "./Components/Products/Products";
import { createContext } from "react";
export const HomeContext = createContext();
export default function Home() {
    return (
        <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
            <Header />
            <Products />
        </div>
    );
}
