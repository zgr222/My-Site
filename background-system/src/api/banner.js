import request from '@/utils/request'

// 获取首页标语
export function getBanners() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

// 设置首页标语
export function setBanners(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
