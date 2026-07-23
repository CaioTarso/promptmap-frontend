import api from './api';

const commentService = {

  async getByPrompt(promptId) {
    const response = await api.get(`/prompts/${promptId}/comments`);
    return response.data;
  },

  async create(promptId, content, parentId = null) {
    const body = { comment: { content } };
    if (parentId) body.comment.parent_id = parentId;
    const response = await api.post(`/prompts/${promptId}/comments`, body);
    return response.data;
  },

  async update(commentId, content) {
    const response = await api.patch(`/comments/${commentId}`, {
      comment: { content },
    });
    return response.data;
  },

  async destroy(commentId) {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },

  async like(commentId) {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  },

  async unlike(commentId) {
    const response = await api.delete(`/comments/${commentId}/like`);
    return response.data;
  },
};

export default commentService;
