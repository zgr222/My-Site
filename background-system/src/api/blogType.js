import request from '@/utils/request'

// 添加文章分类
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

// 获取所有文章分类 
export function getBlogTypes() {
  return request({
    url: '/api/blogtype',
    method: 'get',
  })
}

// 获取一个文章分类 (根据id)
export function getOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}

// 删除分类 (根据id)
export function deleteBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete',
  })
}

// 修改分类 (根据id)
export function editBlogType(params) {
  return request({
    url: `/api/blogtype/${params.id}`,
    method: 'put',
    data: params.data
  })
}