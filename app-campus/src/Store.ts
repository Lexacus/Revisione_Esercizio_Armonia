import create from "zustand";

interface User {
  id: number;
  name: string;
  birthdate: string;
  articlesIds: Array<number>;
  createdAt: string;
  avatar: string;
}

interface Articles {
  id: number;
  name: string;
  createdAt: string;
  picture: string;
  sellerId: string;
  description: string;
  buyUrl: string;
}

interface ZustandStore {
  users: Array<User>;
  articles: Array<Articles>;
  isAddModalVisible: boolean;
  imageUrl: string;
  userSearchResults: Array<User>;
  articleSearchResults: Array<Articles>;
  setUsers: (newUsers: Array<User>) => void;
  setArticles: (newArticles: Array<Articles>) => void;
  modifyUser: (id: number, user: User) => void;
  setIsAddModalVisible: (bool: boolean) => void;
  setImageUrl: (url: string) => void;
}

export const useStore = create<ZustandStore>((set) => ({
  users: [],
  articles: [],
  isAddModalVisible: false,
  imageUrl: "",
  userSearchResults: [],
  articleSearchResults: [],
  setUsers: (newUsers) => set((state) => ({ users: newUsers })),
  setArticles: (newArticles) => set((state) => ({ articles: newArticles })),
  modifyUser: (id, user) => set((state) => ({ users: [...state.users.filter((x) => x.id !== id), user] })),
  setIsAddModalVisible: (bool) => set((state) => ({ isAddModalVisible: bool })),
  setImageUrl: (url) => set((state) => ({ imageUrl: url })),
}));
