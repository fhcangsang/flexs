// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    count: {},
    refresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    wx.setNavigationBarTitle({
      title: "购物车"
    })
  },
  init() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      header: {
        'Authorization': 'Bearer' + " " + token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          carts: res.data.carts,
          count: res.data.count
        })
        setTimeout(()=>{
          this.cart_style()
        },0)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  changNum(even) {
    // console.log(even.currentTarget.dataset)
    let token = wx.getStorageSync('token')
    let id = even.currentTarget.dataset.id
    let type = even.currentTarget.dataset.type
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      header: {
        'Authorization': 'Bearer' + " " + token
      },
      data: {
        id: id,
        type: type
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          carts: res.data.data.carts,
          count: res.data.data.count
        })
        this.cart_style()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  cart_style() {
    if (this.data.count.num === 0) {
      wx.removeTabBarBadge({
        index: 2,
      })
    } else {
      let num = this.data.count.num + ""
      // console.log(num)
      wx.setTabBarBadge({
        index: 2,
        text: num
      })
    }
  },
  gopay() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://canteen.holyzq.com/api/orders/pay',
      header: {
        'Authorization': 'Bearer' + " " + token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        console.log(res)
        let that = this
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: (res) => {
            console.log(res)
            that.init()
          },
          fail: (res) => {
            that.init()
            console.log("咋取消了呢")
          }
        })
      }
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
    this.init()
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
    this.init()
    this.setData({
      refresh: true
    })
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: () => {
          this.setData({
            refresh: false
          })
        }
      })
    }, 300)
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