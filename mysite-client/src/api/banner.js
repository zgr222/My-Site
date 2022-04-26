// import axios from 'axios';

// 学习代理解决跨域
// async function getNews() {
//     const resp = await axios.get('/task/api/getmytasklist?popFlag=1&status=done&_=1647225699866');
//     console.log(resp);
// }

// getNews();

/*
async function getBanners() {
    const resp = await axios.get('/api/banner');
    console.log(resp.data);

    // 一般来说，返回的数据体data都有固定的格式，包含类似code，data，msg,
    // 其中若没有错误，msg为空，则业务数据data不为空
    // 我们往往需要对很多的请求做一些处理，错误提示，正确获取业务数据
    // 所以需要封装出来，如request.js, 其中使用了axios的拦截器
}
getBanners();
*/

import request from './request';
export async function getBanners() {
    return await request.get('/api/banner');
}
// getBanners();