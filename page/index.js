// 定义函数：页面加载完成后初始化
function init(index) {
    fetch('https://misxzaiz.github.io/page/index.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
        // 获取ul元素
        let ul = document.getElementById('my-list')
        for(var key in data[index]) {
            // 创建li元素
            let li = document.createElement('li');
            // 创造链接元素
            let a =  document.createElement('a');
            a.setAttribute('href',data[index][key]);
            a.textContent = key;
            // 将链接元素添加到li中
            li.appendChild(a);
            // 将li添加到ul中
            ul.appendChild(li);
        }
    })
    .catch(function(error) {
      console.log('There was a problem with the fetch operation:', error.message);
    });
}
  