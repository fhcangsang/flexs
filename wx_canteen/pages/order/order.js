// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    order_index: "1",
    border_style: "border_style1",
    border_left: "border_left1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    this.init()
  },
  init() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://canteen.holyzq.com/api/admin/orders',
      header: {
        'Authorization': 'Bearer' + " " + token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {}
    })
  },
  all_order(even) {
    // console.log(even.currentTarget.dataset.index)
    this.setData({
      order_index: even.currentTarget.dataset.index,
      border_style: "border_style1"
    })
    setTimeout(() => {
      this.setData({
        border_left: "border_left1"
      })
    }, 350)
  },
  unfinished(even) {
    this.setData({
      order_index: even.currentTarget.dataset.index,
      border_style: "border_style2"
    })
    setTimeout(() => {
      this.setData({
        border_left: "border_left2"
      })
    }, 350)
  },
  finished(even) {
    this.setData({
      order_index: even.currentTarget.dataset.index,
      border_style: "border_style3"
    })
    setTimeout(() => {
      this.setData({
        border_left: "border_left3"
      })
    }, 350)
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

  }
})