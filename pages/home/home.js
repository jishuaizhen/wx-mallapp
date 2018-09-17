// pages/home/home.js
var request = require("../../utils/request.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSliders: [],
    categorylist: [],
    imglist: ['../../images/quan.jpg', '../../images/f1.png'],
    brandlist: [],
    newlist: [],
    page: 1,
    prolist: [],
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    request.getData(function(res) {
      // console.log(res)
      that.setData({
        topSliders: res.data.ggtop,
        categorylist: res.data.category.splice(0, 4),
        brandlist: res.data.brand,
        newlist: res.data.newGoods
      })
    })
    if(wx.getStorageSync('userId')){
      that.setData({isShow:false})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getmore() {
    var that = this;
    wx.showLoading({
      title: '正在加载中'
    });
    that.setData({
      page: that.data.page + 1
    });
    wx.request({
      url: 'https://www.huojiayule.com/Api/Index/getList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: that.data.page
      },
      success: function(res) {
        if (res.data.prolist.length == 0) {
          wx.showToast({
            title: '没有更多数据了',
            duration: 2000
          })
        }
        var arr = [...that.data.prolist, ...res.data.prolist];
        that.setData({
          prolist: arr
        });
        wx.hideLoading();
      }
    })
  },
  onGotUserInfo(){
    var that=this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (user) {
            // console.log(user)
            wx.request({
              url: app.globalData.baseUrl + "Login/getsessionkey",
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: res.code,
                appid: app.globalData.appId,
                secret: app.globalData.appKey
              },
              success: function (res) {
                // console.log(res)
                wx.request({
                  url: app.globalData.baseUrl + "Login/authlogin",
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    SessionId: res.data.session_key,
                    gender: user.userInfo.gender, // wx.getUserInfo
                    NickName: user.userInfo.nickName, // wx.getUserInfo
                    HeadUrl: user.userInfo.avatarUrl, // wx.getUserInfo
                    openid: res.data.openid
                  },
                  success: function (res) {
                    // console.log(res)
                    // app.globalData.userId = res.data.arr.ID;
                    wx.setStorageSync("userId", res.data.arr.ID);
                    that.setData({
                      isShow: false
                    })
                  }
                })
              }
            })
          }
        })

      }
    })
  }
})