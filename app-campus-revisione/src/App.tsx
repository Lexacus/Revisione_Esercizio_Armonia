import "./App.css";
import Api from "./Api.ts";
import { useStore } from "./Store.ts";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyLayout from "./components/Layout.tsx";
import Libri from "./pages/Libri.tsx";
import Utenti from "./pages/Utenti.tsx";
import Risultati from "./pages/Risultati.tsx";

const App: React.FC = () => {
  const { setUsers, setArticles } = useStore();

  const fetchData = async () => {
    try {
      const [newUsers, newArticles] = await Promise.all([Api.getUsers(), Api.getArticles()]);
      setUsers(newUsers);
      setArticles(newArticles);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyLayout />}>
            <Route index element={<Utenti />} />
            <Route path="Libri" element={<Libri />} />
            <Route path="Risultati" element={<Risultati />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
