import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("Signup successful!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Login successful!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null, checkingAuth: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

 checkAuth: async () => {
  set({ checkingAuth: true });

  try {
    const res = await axios.get("/auth/profile");
    set({ user: res.data, checkingAuth: false });
  } catch (error) {
    if (error.response?.status === 401) {
      // try refresh
      try {
        await axios.post("/auth/refresh-token");
        const p = await axios.get("/auth/profile");
        set({ user: p.data, checkingAuth: false });
        return;
      } catch (_) {}
    }
    set({ user: null, checkingAuth: false });
  }
},

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      console.error("Token refresh failed:", error.message);
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);




// Authenticated User: <!doctype html>
// <html lang="en">
//   <head>
//     <script type="module">
// import RefreshRuntime from "/@react-refresh"
// RefreshRuntime.injectIntoGlobalHook(window)
// window.$RefreshReg$ = () => {}
// window.$RefreshSig$ = () => (type) => type
// window.__vite_plugin_react_preamble_installed__ = true
// </script>

//     <script type="module" src="/@vite/client"></script>

//     <meta charset="UTF-8" />
//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Vite + React</title>
//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.jsx?t=1742199184725"></script>
//   </body>
// </html>

// useUserStore.js:55 [Intervention] Images loaded lazily and replaced with placeholders. Load events are deferred. See 