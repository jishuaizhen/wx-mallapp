// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addemt: 0,
    address: {},
    checkedAddress: {},
    cartId: null,
    vou: '',
    total: 0,
    freightPrice: 0,
    productData: [],
    addrId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ cartId: options.cart_id })
    wx.request({
      url: app.globalData.baseUrl + 'Payment/buy_cart',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        cart_id: options.cart_id,
        uid: wx.getStorageSync('userId')
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          addemt: res.data.addemt,
          address: res.data.adds,
          checkedAddress: { },
          vou: res.data.vou,
          total: res.data.price,
          freightPrice: 0,
          productData: res.data.pro
          // addrId: res.data.adds.id
        })
      }
    })
  },
  createProductOrderByWX:function(){
    var that=this;
    wx.request({
      url: app.globalData.baseUrl +'Payment/payment',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{
        uid:wx.getStorageSync('userId'),
        cart_id:that.data.cartId,
        type:'weixin',
        aid:that.data.addrId,
        remark:'',
        price:that.data.total,
        vid:0
      },
      success:function(order){
        // console.log(order)
        wx.request({
          url: app.globalData.baseUrl+'Wxpay/wxpay',
          method:'POST',
          header:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            order_id: order.data.arr.order_id,
            order_sn: order.data.arr.order_sn,
            uid: wx.getStorageSync('userId')
          },
          success:function(res){
            wx.requestPayment({
              timeStamp:res.data.arr.timeStamp,
              nonceStr:res.data.arr.nonceStr,
              package:res.data.arr.package,
              signType:res.data.arr.signType,
              paySign:res.data.arr.paySign,
              success:function(data){
                console.log
              }
            })
          }
        })
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