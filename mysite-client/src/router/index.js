import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { titleController } from '@/utils';

if (!window.VueRouter) {
	// 没有使用传统的方式引入VueRouter (即开发环境中需要这行代码)
	Vue.use(VueRouter);
}

const router = new VueRouter({  //router4中VueRouter书写方式有所改变
	// 配置
	routes,  // 路由匹配规则
	mode: "history",    //在vue3对应的router4中mode书写方式有所改变，具体查阅文档
});

router.afterEach((to, from) => {
	if (to.meta.title) {
		titleController.setRouteTitle(to.meta.title);
	}
});

export default router;
