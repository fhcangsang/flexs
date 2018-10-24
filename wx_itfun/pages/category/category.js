// pages/category/category.js
Page({
  data: {
    page:1,
    slug:"front_end",
    category:[],
    courses:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://itfun.tv/api/v1/categories',
      method: 'GET',
      success: ((res)=>{
        // console.log(res)
        this.setData({
          category:res.data.categories
        })
      })
    }),
    this.init()
  },
  init:function(){
    wx.request({
      url: 'https://itfun.tv/api/v1/categories/' + this.data.slug + '?page=' + this.data.page,
      method: 'GET',
      success: ((res) => {
        // console.log(res)
        if(res.data.courses==""){return}
        this.setData({
          courses: res.data.courses
        })
      })
    })
  },
  click:function(item){
    // console.log(item)
    this.data.page = 1
    if (item == undefined) { slug = "front_end" } else { 
      this.data.slug = item.currentTarget.dataset.hi
      }
      this.init()
  },
  onReachBottom: function () {
    this.data.page++
    wx.request({
      url: 'https://itfun.tv/api/v1/categories/' + this.data.slug + '?page=' + this.data.page,
      method: 'GET',
      success: ((res) => {
        // console.log(res)
        if (res.data.courses == "") { return }
        let courses_list = this.data.courses
        for(var i = 0;i<res.data.courses.length;i++){
        courses_list.push(res.data.courses[i])
        this.setData({
          courses: courses_list
        })
        }
      })
    })
  }
})