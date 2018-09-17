// pages/category/category.js
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [],
    currentindex:0,
    navlistdetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    request.getCategoryNavData(function(res) {
      that.setData({
        navlist: res.data.list
      })
      var id = that.data.navlist[that.data.currentindex].id;
      request.getCategoryDetailData(id, function (res) {
        that.setData({ navlistdetail: res.data.catList })
      })
    })
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
  showCurrent(event){
    var that =this;
    that.setData({currentindex:event.target.dataset.index});
    var id = that.data.navlist[event.target.dataset.index].id;
    request.getCategoryDetailData(id, function (res) {
      that.setData({ navlistdetail: res.data.catList })
    })
  }
})