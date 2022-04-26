import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';
// 导出指令的配置对象
// export default {
//     bind(el, binding) { },
//     update(el, binding) { }
// }

// 如果这两个钩子函数实现的功能相同，
// 可以直接把指令配置简化为一个单独的函数：
export default function (el, binding) {
	// 根据binding.value 的值，决定创建还是删除img元素
	const curImg = getLoadingImage(el);
	if (binding.value) {
		if (!curImg) {
			const img = createLoadingImg();
			el.appendChild(img);
		}
	} else {
		if (curImg) {
			curImg.remove();
		}
	}
}

function getLoadingImage(el) {
	return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
	const img = document.createElement('img');
	img.dataset.role = 'loading';
	img.src = loadingUrl;
	img.className = styles.loading;
	return img;
}