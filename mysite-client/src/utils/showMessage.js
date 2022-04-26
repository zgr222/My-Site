import getComponentRootDom from './getComponentRootDom';
import Icon from '@/components/Icon';
import styles from './showMessage.module.less';

/**
 * 
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info, success, info, error
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该浏览器的正中间
 * @param {Function} callback 回调函数
 */
export default function (options = {}) {
    // content, type = 'info', duration = 2000, container, callback
    const content = options.content || '';
    const type = options.type || 'info';
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    // 创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, {
        type
    });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;

    // 设置样式
    const typeClassName = styles[`message-${type}`];
    div.className = `${styles.message} ${typeClassName}`;

    // 将div加入到容器中
    // 容器的position是否改动过
    if (options.container) {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
    }

    container.appendChild(div);

    // 浏览器的渲染是异步的，整个js代码执行完才会渲染，
    // 所以如果不先强行渲染的话，下面的opacity=1会先执行，就
    // 没有 0 到 1 这个动画效果

    // 浏览器强行渲染（）
    div.clientHeight;  // 导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = 'translate(-50%, -50%)';

    // 等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = 'translate(-50%, -50%) translateY(-25px)';
        div.addEventListener('transitionend', function () {
            div.remove();
            options.callback && options.callback();
        }, { once: true });
    }, duration);
}
