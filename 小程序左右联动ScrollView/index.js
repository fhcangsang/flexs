//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categories:[],
    scrollTop: 0,
    selectIndex: 1,
    toView:"",
    num: 0
  },
  //事件处理函数
  onLoad: function () {
    wx.request({
      url: 'https://canteen.holyzq.com/api/admin/categories',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:(res)=>{
        console.log(res)
        this.setData({
          categories:res.data.categories
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  selectCategory(even){
    // console.log(even.currentTarget.dataset.id)
    this.setData({
      selectIndex: even.currentTarget.dataset.id,
      toView: "id" + even.currentTarget.dataset.id
    })
  },
  scrolltoupper(even){
    // console.log(even.detail.scrollTop)
    let products = this.data.categories.map(res=>{
        return res.products.length
    })
    let scroll = []
    for (let i = 0; i < products.length; i++) {
      let b = products[i] * 76 + 11
      scroll.push(b)
    }
    for (let i = 1; i < scroll.length; i++) {
      scroll[i] = scroll[i - 1] + scroll[i]
    }
    for (let i = 0; i < scroll.length - 1; i++) {
      if (even.detail.scrollTop >= scroll[i] && even.detail.scrollTop < scroll[i+1]){
          this.setData({
            selectIndex: i + 2
          })
      }
      if (even.detail.scrollTop < scroll[0]){
        this.setData({
          selectIndex: 1
        })
      }
    }
  },
  product_add(even){
    console.log(even.currentTarget.dataset.id)
    this.setData({
      num:this.data.num + 1
    })
    setTimeout(()=>{
      let num = this.data.num + ""
      wx.setTabBarBadge({
        index: 2,
        text: num
      })
    },0)
  }
})