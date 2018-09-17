// pages/shopping/shopping.js
var request=require("../../utils/request.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist:[],
    shopnum:1,
    selectAllStatus:false,
    proid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    request.getShopData(wx.getStorageSync('userId'),function(res){
      console.log(res)
      var arr=res.data.cart;
      arr.forEach(function(item){
        item.selected=false;
      })
      that.setData({
        shoplist:arr
      })
    })
  },
  nowBuy() {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "Shopping/add",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uid: wx.getStorageSync('userId'),
        pid: that.data.proid,
        num: 1
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log(res)
          // wx.showToast({
          //   title: '加入购物车成功',
          // })
          wx.navigateTo({
            url: '/pages/pay/pay?cart_id=' + res.data.cart_id,
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
  
  },
  // 点击加减按钮
  upCart(e){
    var that = this;
    var index = parseInt(e.target.dataset.index);
    console.log(that.data.shoplist[index]);
    var num = that.data.shoplist[index].num;
    var cart_id = parseInt(that.data.shoplist[index].id);
    console.log(e.currentTarget)
    num++;
    request.getShopNumData(3,num,cart_id,function(res){
      var status = res.data.status;
      if (status == 1&&num<10) {
        var arr = that.data.shoplist;
        arr[e.target.dataset.index].num=num;
        that.setData({
          shoplist: arr
        })
      }else{
        wx.showToast({
          title: '操作过快！',
          duration: 2000
        });
      }
    })
  },
  // 点击加减按钮
  downCart(e) {
    var that = this;
    var index = parseInt(e.target.dataset.index);
    console.log(that.data.shoplist[index]);
    var num = that.data.shoplist[index].num;
    var cart_id = parseInt(that.data.shoplist[index].id);
    console.log(e.currentTarget)
    num--;
    request.getShopNumData(3, num, cart_id, function (res) {
      var status = res.data.status;
      if (status == 1 && num > 0) {
        var arr = that.data.shoplist;
        arr[e.target.dataset.index].num = num;
        that.setData({
          shoplist: arr
        })
      } else {
        wx.showToast({
          title: '操作过快！',
          duration: 2000
        });
      }
    })
  },
  // 点击选中按钮
  changeSelected(event){
    var that=this;
    var index=event.target.dataset.index;
    var arr=that.data.shoplist;
    arr[index].selected = !arr[index].selected;
    that.setData({
      shoplist:arr
    });
    // console.log(that.data.shoplist[index])
    var status=that.data.shoplist.every(function(item){
      return item.selected===true;
    });
    that.setData({
      selectAllStatus:status,
      proid:that.data.shoplist[index].pid
    })
  },
  // 点击全选按钮
  changeAllSelected(){
    var that=this;
    that.setData({ selectAllStatus: !that.data.selectAllStatus});
    var arr=that.data.shoplist;
    arr.forEach(function(item){
      return item.selected = that.data.selectAllStatus
    });
    that.setData({
      shoplist:arr
    })
  },
  // 点击删除购物车按钮
  clearCart(event){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success:function(){
        that.clearOneCart(event.target.dataset.index)
      }
    })
  },
  clearOneCart(index){
    var that=this;
    var arr=that.data.shoplist;
    var id=arr[index].id;
    wx.request({
      url: app.globalData.baseUrl +'Shopping/delete',
      method:'POST',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      data:{
        cart_id:id
      },
      success:function(res){
        if(res.data.status===1){
          arr=arr.filter(function(item){
            return item!=arr[index]
          })
        }
        that.setData({
          shoplist:arr
        })
      }
    })
  }
})