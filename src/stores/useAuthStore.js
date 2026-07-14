import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '../services/authService';
import router from '../router';
import { handleApiErrors } from '../lib/apiErrorHandler';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(
    JSON.parse(localStorage.getItem('auth_user') || 'null')
  );
  const loading = ref(false);
  const error = ref([]);

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);

  function _persist(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  }

  function _clear() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  async function signup(name, email, password, passwordConfirmation) {
    loading.value = true;
    error.value = [];
    try {
      const data = await authService.signup(name, email, password, passwordConfirmation);
      if (data.token) {
        _persist(data.token, data.data || data.user || { name, email });
        router.push('/home');
      }
      return data;
    } catch (err) {
      error.value = handleApiErrors(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(email, password) {
    loading.value = true;
    error.value = [];
    try {
      const data = await authService.login(email, password);
      const authToken = data.token || data.data?.token;
      const userData = data.data || data.user || { email };
      _persist(authToken, userData);
      router.push('/home');
      return data;
    } catch (err) {
      error.value = handleApiErrors(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    error.value = [];
    try {
      await authService.logout();
    } catch {
    } finally {
      _clear();
      loading.value = false;
      router.push('/');
    }
  }

  async function fetchMe() {
    if (!token.value) return;
    loading.value = true;
    try {
      const data = await authService.me();
      user.value = data.data || data.user || data;
      localStorage.setItem('auth_user', JSON.stringify(user.value));
    } catch (err) {
      if (err.response?.status === 401) _clear();
    } finally {
      loading.value = false;
    }
  }

  function updateUserLocally(updatedFields) {
    if (!user.value) return;
    user.value = { ...user.value, ...updatedFields };
    localStorage.setItem('auth_user', JSON.stringify(user.value));
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    currentUser,
    signup,
    login,
    logout,
    fetchMe,
    updateUserLocally,
  };
});
