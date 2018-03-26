//demo.js
const app = getApp()

Page({
  formSubmit: function(e) {
     console.log('提交数据',e.detail.value)
     console.log(app.globalData.userInfo)
     console.log(app.globalData.getSettingRes)
     console.log(app.globalData.loginRes)
  },
  formReset: function() {
     console.log('reset')
  }
})