// 监听页面加载完成并提取图片 URL
window.addEventListener('load', () => {
  // 查找页面中所有 img 标签
  const images = document.querySelectorAll('img');

  // 遍历所有图片，选择符合条件的图片（以 Pinterest 原图 URL 开头）
  images.forEach((img) => {
    if (img.src && img.src.startsWith('https://i.pinimg.com/originals/')) {
      // 发送图片 URL 给背景脚本进行下载
      chrome.runtime.sendMessage({ action: 'download', imageUrl: img.src });
    }
  });
});
