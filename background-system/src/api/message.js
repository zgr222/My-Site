import request from '@/utils/request'

// 分页获取留言
export function getMessages(page = 1, limit = 10) {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

// 删除评论
export function deleteMessage(id) {
  return request.delete(`/api/message/${id}`);
}