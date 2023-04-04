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
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                  status.innerHTML = "Oops! There was a problem submitting your form"
                }
              })
            }
          }).catch(error => {
            alert("发送失败，请重试");
          });
        }
        form.addEventListener("submit", handleSubmit)