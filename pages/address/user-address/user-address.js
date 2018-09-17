// pages/address/user-address/user-address.js
var app = getApp()
Page({
  data: {
    address: [],
    radioindex: '',
    pro_id: 0,
    num: 0,
    cartId: 0
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var cartId = options.cartId;
    // console.log(wx.getStorageSync('userId'))
    wx.request({
      url: app.globalData.baseUrl + 'Address/index',
      data: {
        user_id: wx.getStorageSync('userId'),
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        console.log(res)
        var address = res.data.adds;
        console.log(address);
        if (address == '') {
          var address = []
        }

        that.setData({
          address: address,
          cartId: cartId,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },
  selectedAdd:function(e){
    console.log(e)
    // wx.redirectTo({
    //   url: '../../pay/pay?adds='+adds,
    // })
  },
  onReady: function () {
    // 页面渲染完成
  },
  setDefault: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.baseUrl + 'Address/set_default',
      data: {
        uid: wx.getStorageSync('userId'),
        addr_id: addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var status = res.data.status;
        var cartId = that.data.cartId;
        if (status == 1) {
          if (cartId) {
            wx.redirectTo({
              url: '/pages/pay/pay?cartId=' + cartId,
            });
            return false;
          }

          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });

          that.DataonLoad();
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  delAddress: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.globalData.baseUrl + 'Address/del_adds',
          data: {
            user_id: wx.getStorageSync('userId'),
            id_arr: addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {// 设置请求的 header
            'Content-Type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
            // success
            var status = res.data.status;
            if (status == 1) {
              that.DataonLoad();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });

  },
  DataonLoad: function () {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.globalData.baseUrl + 'Address/index',
      data: {
        user_id: wx.getStorageSync('userId'),
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var address = res.data.adds;
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },
})