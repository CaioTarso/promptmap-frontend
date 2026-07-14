import api from './api';

const userService = {

  async updateProfile(data) {
    const response = await api.patch('/me', { user: data });
    return response.data;
  },

  
  async myPrompts() {
    const response = await api.get('/me/prompts');
    return response.data;
  },
};

export default userService;
