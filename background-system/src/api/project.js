import request from '@/utils/request'

// 获取所有项目
export function getProjects() {
  return request.get('/api/project');
}

// 修改项目
export function editProject(id, data) {
  return request({
    url: `/api/project/${id}`,
    method: 'put',
    data
  });
}

// 新增项目
export function addProject(data) {
  return request.post('/api/project', data);
}

// 删除项目
export function deleteProject(id) {
  return request.delete(`/api/project/${id}`);
}