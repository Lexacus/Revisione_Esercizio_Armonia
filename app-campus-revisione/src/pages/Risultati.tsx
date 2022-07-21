import React from "react";
import { useSearchParams } from "react-router-dom";
import ArticlesTable from "../components/ArticlesTable.tsx";
import UsersTable from "../components/UsersTable.tsx";
import { useStore } from "../Store.ts";

function Risultati() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, articles } = useStore();
  return (
    <>
      <div className="site-layout-content">
        <strong>Utenti</strong>
        <UsersTable users={users.filter((user) => user.name.toLowerCase().includes(searchParams.get("searchresults")?.toLowerCase()))}></UsersTable>
        <strong>Libri</strong>
        <ArticlesTable
          articles={articles.filter((article) => article.name.toLowerCase().includes(searchParams.get("searchresults")?.toLowerCase()))}
        ></ArticlesTable>
      </div>
    </>
  );
}

export default Risultati;
