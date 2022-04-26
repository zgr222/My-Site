import request from '@/utils/request'

export function getAboutMeInfo() {
  return request.get('/api/about');
}

export function setAboutMeInfo(data) {
  return request.post('/api/about', data);
}