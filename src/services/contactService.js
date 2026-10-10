import { api } from '../lib/api.js'

export const contactService = {
  async sendMessage({ name, email, subject, message }) {
    return api.post('/api/contact', { name, email, subject, message })
  }
}
