// pages/login/login.js
/**
 * 1.搜集表单数据
 * 2.前端验证
 *   1）验证用户信息（账号密码）是否合法
 *   2）不通过，提示用户，不发请求给后端
 *   3）通过，发请求（账号密码）给后端
 * 3.后端验证
 *   1）验证用户是否存在
 *   2）不存在，告诉用户
 *   3）存在，验证密码是否正确
 */

import request from "../../utils/request"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  // 表单内容发生改变的回调
  handleInput(event) {
    // let type=event.currentTarget.id;// 取值为input输入框的id：phone或password
    let type = event.currentTarget.dataset.type; //
    console.log(event);
    console.log(type, event.detail.value);
    this.setData({
      // type=event.currentTarget.id为变量，需要使用[]扩起
      [type]: event.detail.value,
    });
  },

  async login() {
    let { phone, password } = this.data;
    if (!phone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
      });
      return;
    }
    // 手机正则
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: "手机号格式错误",
        icon: "none",
      });
      return;
    }

    if (!password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "none",
      });
      return;
    }

    // 后端验证
    let result=await request('/login/cellphone',{phone,password,isLogin:true})
    if(result.code===200){
      wx.showToast({
        title: "登录成功",
        icon: "success",
      });
      console.log(result);

      // 存储用户信息到本地
      wx.setStorageSync("userInfo", JSON.stringify(result.profile));

      // 跳转到个人中心页面
      wx.reLaunch({
        url: '/pages/personal/personal',
      });
    }else if(result.code===400){
      wx.showToast({
        title: "手机号错误",
        icon: "none",
      });
    }else if(result.code===502){
      wx.showToast({
        title: "密码错误",
        icon: "none",
      });
    }else {
      wx.showToast({
        title: "登录失败，请重新登录",
        icon: "none",
      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
