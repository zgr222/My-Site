import eventBus from '@/eventBus';
import { debounce } from '@/utils';
import defaultGif from '@/assets/default.gif'

let imgArr = [];

function setImage(img) {
  img.dom.src = defaultGif;  //先暂时使用默认加载图片
  // 处理图片
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    // 在视口范围内
    // const tempImg = new Image();
    // // tempImg.src = img.src;
    // tempImg.onload = function () {
    //   // 当真实图片加载完成
    //   img.dom.src = img.src;
    // };
    // tempImg.src = img.src;

    img.dom.src = img.src;
    imgArr = imgArr.filter(it => it !== img);
  }

}

// 希望，加载适合要求的图片
function setImages() {
  for (const img of imgArr) {
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value
    }
    imgArr.push(img);
    // 立即处理图片
    setImage(img);
  },
  unbind(el) {
    imgArr = imgArr.filter(it => it.dom !== el);
  }
}