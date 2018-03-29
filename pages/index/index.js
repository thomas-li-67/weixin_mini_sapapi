//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '物料扫码',
    kcsj_table: [],
    inputShowed: false,
    inputVal: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewDemo: function(){
    wx.navigateTo({
      url: '../demo/demo'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(options != null) {
       console.log(options)
       var mat = options["mat"]
       if (typeof(mat) != "undefined" || mat != null) {
         console.log("search material no: " + mat)
         this.getKcsj(mat, '2771')
       }
    }
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  ///搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  scanqr: function () {
    console.log("scanqr")
    wx.scanCode({
      success: (res) => {
        console.log(res)

        console.log("input search: " + res.result)
        this.getKcsj(res.result, '2771')
      }
    })

  },
  searchMat: function (e) {
    console.log(e)
    console.log("input search: " + this.data.input)
    this.getKcsj(this.data.inputVal, '2771')
  },
  getKcsj: function (material, plant) {
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
          app.globalData.kcsj_table = this.data.kcsj_table
          wx.navigateTo({
            url: '../result'
          })
        } else {
          console.log(" wx.request kcsj statusCode" + res.statusCode);
          wx.showModal({
            content: '查询出现错误',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      },
      fail: function (error) {
        console.log(error)
        wx.showModal({
          content: '查询出现错误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    })
  },
  openAlert: function () {
    wx.showModal({
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
})
