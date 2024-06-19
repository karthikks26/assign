import { create } from "zustand";

const useNewsStore = create((set) => ({
  newsData: [],
  loading: false,
  error: null,
  category: "",
  searchTerm: "",

  setCategory: (category) => set({ category, searchTerm: "" }),
  setSearchTerm: (searchTerm) => set({ searchTerm, category: "" }),

  fetchNewsData: async (category, searchTerm) => {
    set({ loading: true, error: null });

    try {
      const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${
        import.meta.env.VITE_GNEW
      }`;
      const categoryParam = category ? `&topic=${category}` : "";
      const searchParam = searchTerm ? `&q=${searchTerm}` : "";
      const url = apiUrl + categoryParam + searchParam;

      const response = await fetch(url);
      const data = await response.json();

      set({ newsData: data.articles, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useNewsStore;
