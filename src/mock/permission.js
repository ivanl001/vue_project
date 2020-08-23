import Mock from "mockjs";
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    //console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    if (username === "admin" || username === "wp") {
      // 判断账号和密码是否对应
      if (username === "admin" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "el-icon-s-home",
                url: "home/Home"
              },
              {
                path: "/video",
                name: "video",
                label: "视频管理页",
                icon: "el-icon-phone",
                url: "video/Video"
              },
              {
                path: "/user",
                name: "user",
                label: "用户管理页",
                icon: "el-icon-user",
                url: "user/User"
              },
              {
                name: "other",
                label: "其他",
                icon: "el-icon-s-promotion",
                children: [
                  {
                    path: "/child01",
                    name: "child01",
                    label: "页面1",
                    icon: "el-icon-s-release",
                    url: ""
                  },
                  {
                    path: "/child02",
                    name: "child02",
                    label: "页面2",
                    icon: "el-icon-s-ticket",
                    url: ""
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else if (username === "wp" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
              },
              {
                path: "/video",
                name: "video",
                label: "视频管理页",
                icon: "video-play",
                url: "VideoManage/VideoManage"
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误"
          }
        };
      }
    } else {
      return {
        code: -999,
        data: {
          message: "用户不存在"
        }
      };
    }
  }
};
