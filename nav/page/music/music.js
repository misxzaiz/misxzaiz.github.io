// 封装函数，返回 Promise 对象
function getMusic() {
    return new Promise((resolve, reject) => {
      // 从 API 获取 JSON 数据并解析
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://api.uomg.com/api/rand.music?format=json&timestamp=" +
          new Date().getTime(), // 添加时间戳参数，确保每次请求的是最新数据
        true
      );
      xhr.onload = () => {
        if (xhr.status == 200) {
          const data = JSON.parse(xhr.responseText).data;
          const songname = data.name;
          const songurl = data.url;
          const songpic = data.picurl;
          const artistsname = data.artistsname;
  
          // 在 HTML 中显示歌曲信息
          document.getElementById("songname").innerHTML = songname;
          document.getElementById("songpic").src = songpic;
          document.getElementById("artistsname").innerHTML = artistsname;
  
          // 播放音乐
          const audio = document.getElementById("audio");
          const source = document.createElement("source");
          source.setAttribute("src", songurl);
          audio.appendChild(source);
  
          resolve(); // 成功时调用 resolve
        } else {
          reject("Error: " + xhr.statusText); // 失败时调用 reject
        }
      };
      xhr.onerror = () => {
        reject("Error: Network error."); // 失败时调用 reject
      };
      xhr.send();
    });
  }
  
  // IIFE，加载页面时自动执行
  (function () {
    getMusic()
      .then(() => {
        const playButton = document.getElementById("play-button");
        const audio = document.getElementById("audio");
  
        playButton.addEventListener("click", function () {
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        });
  
        audio.addEventListener('play', function () {
            playButton.innerHTML = `
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
              </svg>
            `;
            document.getElementById('songpic').classList.add('rotate');
        });
          
  
        audio.addEventListener('pause', function () {
            playButton.innerHTML = `
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            `;
            document.getElementById('songpic').classList.remove('rotate');
        });
          
      })
      .catch((error) => {
        console.error(error);
      });
  })();
  