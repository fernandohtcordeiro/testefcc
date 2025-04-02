import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(username, password) {
      // Simulação com dados mockados
      const mockUser = { username: 'admin', password: '123456' };

      if (username === mockUser.username && password === mockUser.password) {
        this.isAuthenticated = true;
        this.user = mockUser;
        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    }
  }
});
