// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerItem:[],
    pro_id:0,
    itemData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({pro_id:options.id});
    console.log(options.id);
    wx.request({
      url: app.globalData.baseUrl +'Product/index',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{pro_id:that.data.pro_id},
      success:function(res){
        console.log(res)
        that.setData({
          bannerItem:res.data.pro.img_arr,
          itemData:res.data.pro
        })
        // 1.暴露给视图的一个对象
        // 2.'html' 转换类型
        // 3.富文本的内容
        WxParse.wxParse('article', 'html', res.data.pro.content, that, 5);
      }
    })
  },
  addShopCart(){
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "Shopping/add",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uid: wx.getStorageSync('userId'),
        pid: that.data.pro_id,
        num: 1
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '加入购物车成功',
          })
        }
      }
    })
  },
  nowBuy(){
    var that=this;
    wx.request({
      url:app.globalData.baseUrl+'Shopping/add',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{
        uid:wx.getStorageSync('userId'),
        pid:that.data.pro_id,
        num:1
      },
      success:function(res){
        if(res.data.status==1){
          // console.log(res)
          wx.navigateTo({
            url: '/pages/pay/pay?cart_id='+res.data.cart_id,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})