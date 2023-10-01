// footBar.js
const footBarComponent = {
        template: `
          <div class="foot">
            <div class="foot-box" :class="{active: activeBtn === 1}" @click="toPage(1)">
              <div class="foot-view"><i class="el-icon-s-home"></i></div>
              <div class="foot-text">日常</div>
            </div>
            <div class="foot-box" :class="{active: activeBtn === 2}" @click="toPage(2)">
              <div class="foot-view"><i class="el-icon-map-location"></i></div>
              <div class="foot-text">商品</div>
            </div>
            <div class="foot-box" @click="toPage(0)">
                <div style="width: 100%">
                    <svg style="transform: scale(0.3); transform-origin: center;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                        <path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path>
                    </svg>
                </div>
            </div>
            <div class="foot-box" :class="{active: activeBtn === 3}" @click="toPage(3)">
              <div class="foot-view"><i class="el-icon-chat-dot-round"></i></div>
              <div class="foot-text">消息</div>
            </div>
            <div class="foot-box" :class="{active: activeBtn === 4}" @click="toPage(4)">
              <div class="foot-view"><i class="el-icon-user"></i></div>
              <div class="foot-text">我的</div>
            </div>
          </div>
        `,
        props: ['activeBtn'],
        setup(props) {
          const toPage = (i) => {
            if (i === 0) {
                location.href = "pages/post/add-post.html";
            } else if (i === 4) {
                location.href = "pages/user/index.html";
            } else if (i === 1) {
                location.href = "index.html";
            } else if (i === 2) {
                location.href = "pages/goods/goods-page.html";
            } else if (i === 3) {
                location.href = "pages/chat/index.html";
            }
          };
          return {
            toPage,
          };
        }
    }
