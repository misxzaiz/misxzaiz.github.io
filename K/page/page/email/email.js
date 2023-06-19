        // 发送邮箱
        var form = document.getElementById("my-form");
    
        async function handleSubmit(event) {
          event.preventDefault();
          var data = new FormData(event.target);
          fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
          }).then(response => {
            if (response.ok) {
              alert("发送成功，谢谢你的留言!");
              form.reset()
            } else {
              alert("发送失败，请到Contact（微信）发送");
            }
          }).catch(error => {
            alert("发送失败，请到Contact（微信）发送");
          });
        }
        form.addEventListener("submit", handleSubmit)