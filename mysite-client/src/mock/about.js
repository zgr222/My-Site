import Mock from 'mockjs';

Mock.mock('/api/about', 'get', {
  code: 0,
  msg: '',
  data: 'https://alteredqualia.com/xg/examples/nebula_artefact.html'
})