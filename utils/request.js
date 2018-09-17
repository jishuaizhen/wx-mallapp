var baseUrl = "https://www.huojiayule.com/Api/"

var request = {
  getData: function(fn) {
    wx.request({
      url: baseUrl + 'Index/index',
      success: function(res) {
        fn(res)
      }
    })
  },
  // 请求专题页面数据
  getUniqueData:function(fn){
    wx.request({
      url: baseUrl +'Zhuti/index',
      success:function(res){
        fn(res)
      }
    })
  },
  // 请求分类页面导航数据
  getCategoryNavData:function(fn){
    wx.request({
      url: baseUrl +'Category/index',
      success:function(res){
        fn(res)
      }
    })
  },
  // 请求分类页面导航对应的页面数据
  getCategoryDetailData:function(id,fn){
    wx.request({
      url: baseUrl +'Category/getcat',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{cat_id:id},
      success:function(res){
        fn(res)
      }
    })
  },
  // 请求购物车页面数据
  getShopData: function (id, fn) {
    wx.request({
      url: baseUrl + 'Shopping/index',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: { user_id: id },
      success: function (res) {
        fn(res)
      }
    })
  },
  // 点击购物车加减按钮
  getShopNumData:function(user_id,num,cart_id,fn){
    wx.request({
      url: baseUrl +'Shopping/up_cart',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{
        user_id:user_id,
        num:num,
        cart_id:cart_id
      },
      success: function (res) {
        fn(res)
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  }
}
module.exports = request;
