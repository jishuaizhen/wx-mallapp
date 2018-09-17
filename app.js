//app.js
App({
  onLaunch: function () {
    var that = this;
    // 上来就要获取USERID
    // 1.wx.login获取code


    // 1.先看用户是否登录?如果登录，则跳转到首页，如果没有登录跳转登录。// 判断到底进入login页还是home页面？
    // isLogin

    // var isLogin = wx.getStorageSync("isLogin");
    // if (isLogin == true) {

    // } else {
    //   console.log("jinrun else")
    //   // wx.navigateTo({
    //   //   url: '/pages/login/login',
    //   // })
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
  },
  globalData: {
    userInfo: null,
    baseUrl: "https://www.huojiayule.com/Api/",
    appId: "wx4e19a2b8e7c0f837",
    appKey: "43bedf284a27e8d2703f6cd6db94ce81",
    userId: ''
  }
})