function init() {
  fetch('https://misxzaiz.github.io/page/index.json')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    const indexContainer = document.querySelector('#index');
    const contentContainer = document.querySelector('#content');
    let currentIndex = '';
    Object.keys(data.index).forEach(key => {                    
      const indexLink = document.createElement('a');
      indexLink.href = `#${key}`;
      indexLink.innerHTML = key;
      indexContainer.appendChild(indexLink);
    });

    function generateContent(key) {
      contentContainer.innerHTML = '';
      if (Array.isArray(data.index[key])) {
        return;
      }
      Object.entries(data.index[key]).forEach(entry => {
        const [title, [url, description]] = entry;
        const link = document.createElement('a');
        link.className = 'link';
        link.setAttribute('href', url);
        link.innerHTML = title;
        if (description) {
          const desc = document.createElement('span');
          desc.innerHTML = description;
          link.appendChild(desc);
        }
        contentContainer.appendChild(link);
      });
    }

    const links = document.querySelectorAll('#index a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        const key = link.textContent.trim();
        if (key === currentIndex) {
          return;
        }
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        generateContent(key);
        currentIndex = key;
      });
    });

    const firstLink = links[0];
    firstLink.classList.add('active');
    generateContent(firstLink.textContent.trim());
    currentIndex = firstLink.textContent.trim();
  })
  .catch(function(error) {
    console.log('There was a problem with the fetch operation:', error.message);
  });
}

const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
  navList.classList.toggle('active');
});


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-NB1JGLTB6H');

// 获取需要添加事件监听器的元素
var MyIndex = document.getElementById("MyIndex");

// 添加双击事件监听器
MyIndex.addEventListener("dblclick", function() {
  // 在这里编写跳转代码
  window.location.href = "page/index/index.html";
});
