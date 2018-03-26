// pages/kcsj/kcsj.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kcsj_table: [],
    input:"000000001180150602"
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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
    //this.getKcsj()
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

  scanqr: function(){
     console.log("scanqr")
     wx.scanCode({
       success: (res) => {
         console.log(res)
         this.setData({
           input: res.result
         })
       }
     })

  },
  
  bindMatInput: function(e) {
     var value = e.detail.value
     this.setData({
       input:value
     })
  },

  searchMat: function(e) {
     console.log(e)
     
     console.log("search: " + this.data.input)
     this.getKcsj(this.data.input,'2771')
  },
  getKcsj: function(material,plant){
    wx.request({
      url: `https://api-dev.chemchina.com/sapapi/dqzl_kcsj`,
      data: {
        material: material,
        plant: plant 
      },
      success: res => {
        if (res.statusCode == 200) {
          console.log(res.data)
          this.setData({
            kcsj_table: (res.data.T_DATA || []).map((e, i) => e[i])
          })
          console.log(this.data.kcsj_table)
        } else {
          console.log(" wx.request kcsj statusCode" + res.statusCode);
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
  }
})