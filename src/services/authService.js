import api from './api';

const authService = {
  
  async signup(name, email, password, passwordConfirmation) {
    const response = await api.post('/signup', {
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
    return response.data;
  },

  
  async login(email, password) {
    const response = await api.post('/login', {
      user: { email, password },
    });
    return response.data;
  },

  
  async logout() {
    const response = await api.delete('/logout');
    return response.data;
  },

  
  async me() {
    const response = await api.get('/me');
    return response.data;
  },
};

export default authService;
