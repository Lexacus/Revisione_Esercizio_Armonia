const apiUrl = "https://62c96230d9ead251e8baf02e.mockapi.io/campus/";
export default class Api {
  /*METODI USERS*/

  public static getUsers = async () => {
    try {
      const response = await fetch(apiUrl + "users");
      const result = await response.json();
      //console.log(result);
      return result;
    } catch (e) {
      /*ciao*/
      console.log(e);
    }
  };

  public static addUser = async (user) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      fetch(apiUrl + "users", options);
    } catch (e) {
      console.log(e);
    }
  };

  public static modifyUser = async (id, row) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      };
      await fetch(apiUrl + "users/" + id, options);
    } catch (e) {
      console.log(e);
    }
  };

  public static deleteUser = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      await fetch(apiUrl + "users/" + id, options);
    } catch (e) {
      console.log(e);
    }
  };

  /*METODI ARTICLES*/

  public static getArticles = async () => {
    try {
      const response = await fetch(apiUrl + "articles");
      const result = await response.json();
      //console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  public static addArticle = async (article) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      };
      fetch(apiUrl + "articles", options);
    } catch (e) {
      console.log(e);
    }
  };

  public static modifyArticle = async (id, row) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      };
      await fetch(apiUrl + "articles/" + id, options);
    } catch (e) {
      console.log(e);
    }
  };

  public static deleteArticle = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      await fetch(apiUrl + "articles/" + id, options);
    } catch (e) {
      console.log(e);
    }
  };
}
