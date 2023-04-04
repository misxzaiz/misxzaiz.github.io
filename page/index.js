
        // 定义函数：页面加载完成后初始化
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
                    // 遍历data中的index，生成左侧导航栏
                    const indexLink = document.createElement('a');
                    indexLink.href = `#${key}`;
                    indexLink.innerHTML = key;
                    indexContainer.appendChild(indexLink);
                });
                // 根据data中的AI和API数据，生成右侧内容
                function generateContent(key) {
                    contentContainer.innerHTML = '';
                    if (Array.isArray(data.index[key])) {
                        return;
                    }
                    Object.entries(data.index[key]).forEach(entry => {
                        const [title, url] = entry;
                        const link = document.createElement('a');
                        link.className = 'link';
                        link.setAttribute('href', url);
                        link.innerHTML = title;
                        contentContainer.appendChild(link);
                    });
                }

                // 监听导航栏的点击事件，生成对应的右侧内容
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

                // 初始化页面，默认选中第一个项目
                const firstLink = links[0];
                firstLink.classList.add('active');
                generateContent(firstLink.textContent.trim());
                currentIndex = firstLink.textContent.trim();
            })
            .catch(function(error) {
            console.log('There was a problem with the fetch operation:', error.message);
            });
        }