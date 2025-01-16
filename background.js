// 监听来自 content.js 的消息，进行图片下载
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download') {
    const imageUrl = message.imageUrl;

    // 获取当前日期并生成文件夹名
    const currentDate = new Date();
    const folderName = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // 获取当前日期文件夹中的图片数量
    chrome.storage.local.get([folderName], (data) => {
      let imageCount = data[folderName] || 0;

      // 递增图片计数
      imageCount++;

      // 保存新的计数值
      chrome.storage.local.set({ [folderName]: imageCount });

      // 为图片命名：按顺序命名，如 1.jpg, 2.jpg
      const filename = `${folderName}/${imageCount}.jpg`;

      // 下载图片
      chrome.downloads.download({
        url: imageUrl,
        filename: filename,
        saveAs: false  // 自动下载，不弹出保存文件对话框
      });
    });
  }
});

// 监听快捷键事件，关闭所有符合条件的标签页
chrome.commands.onCommand.addListener((command) => {
  if (command === "closePinImgTabs") {
    closePinImgTabs();
  }
});

// 关闭所有符合条件的标签页
function closePinImgTabs() {
  // 获取所有标签页
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      // 判断每个标签页的 URL 是否以 "https://i.pinimg.com/originals/" 开头
      if (tab.url.startsWith('https://i.pinimg.com/originals/')) {
        // 关闭符合条件的标签页
        chrome.tabs.remove(tab.id);
      }
    });
  });
}
