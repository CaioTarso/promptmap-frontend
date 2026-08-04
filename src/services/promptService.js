import api from './api';

const promptService = {

  async getAll(params = {}) {
    const response = await api.get('/prompts', { params });
    return response.data;
  },

  async getRecommended(promptId, { promptType, tags = [] } = {}) {
    const params = { sort: 'popular', exclude_id: promptId };
    if (promptType)      params.prompt_type = promptType;
    if (tags.length > 0) params.tag = tags[0]?.name || tags[0]; // filtra pela primeira tag
    const response = await api.get('/prompts', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/prompts/${id}`);
    return response.data;
  },

  async create(data, isMultipart = false) {
    if (isMultipart) {
      const response = await api.post('/prompts', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }

    const response = await api.post('/prompts', {
      prompt: {
        title: data.title,
        description: data.description,
        content: data.content,
        prompt_type: data.prompt_type,
        tag_names: data.tag_names || [],
      },
    });
    return response.data;
  },

  async update(id, data, isMultipart = false) {
    if (isMultipart) {
      const response = await api.patch(`/prompts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }

    const response = await api.patch(`/prompts/${id}`, {
      prompt: {
        title: data.title,
        description: data.description,
        content: data.content,
        prompt_type: data.prompt_type,
        tag_names: data.tag_names || [],
      },
    });
    return response.data;
  },

  async destroy(id) {
    const response = await api.delete(`/prompts/${id}`);
    return response.data;
  },

  async favorite(id) {
    const response = await api.post(`/prompts/${id}/favorite`);
    return response.data;
  },

  async unfavorite(id) {
    const response = await api.delete(`/prompts/${id}/favorite`);
    return response.data;
  },
};

export default promptService;
