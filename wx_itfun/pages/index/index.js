Page({
  data:{
    slide_courses:[],
    new_courses:[],
    likes_courses:[],
    recommended_courses:[]
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://itfun.tv/api/v1/home',
      method: 'GET',
      success: ((res)=>{
        // console.log(res.data)
        this.setData({
          slide_courses: res.data.slide_courses,
          new_courses: res.data.new_courses,
          likes_courses: res.data.likes_courses,
          recommended_courses: res.data.recommended_courses
        })
      })
    })
  }
})