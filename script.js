// 静态壁纸数据
const statiWallpaperList = [
  "./wallpaper/jtimg/bg1.jpg",
  "./wallpaper/jtimg/bg2.jpg",
  "./wallpaper/jtimg/bg3.jpg",
  "./wallpaper/jtimg/bg4.jpg",
  "./wallpaper/jtimg/bg5.jpg",
  "./wallpaper/jtimg/bg6.jpg",
  "./wallpaper/jtimg/bg7.jpg",
  "./wallpaper/jtimg/bg8.jpg",
  "./wallpaper/jtimg/bg9.jpg",
  "./wallpaper/jtimg/bg10.jpg",
  "./wallpaper/jtimg/bg12.jpg",
  "./wallpaper/jtimg/bg13.jpg",
  "./wallpaper/jtimg/bg14.jpg",
  "./wallpaper/jtimg/bg15.jpg",
  "./wallpaper/jtimg/bg16.jpg",
  "./wallpaper/jtimg/bg17.jpg",
  "./wallpaper/jtimg/bg18.jpg",
  "./wallpaper/jtimg/bg19.jpg",
  "./wallpaper/jtimg/bg20.jpg",
];
// 动态壁纸数据
const dynamicWallpaperList = [
  "./wallpaper/dtimg/dtbg1.mp4",
  "./wallpaper/dtimg/dtbg2.mp4",
  "./wallpaper/dtimg/dtbg3.mp4",
  "./wallpaper/dtimg/dtbg4.mp4",
  "./wallpaper/dtimg/dtbg5.mp4",
  "./wallpaper/dtimg/dtbg6.mp4",
  "./wallpaper/dtimg/dtbg7.mp4",
  "./wallpaper/dtimg/dtbg8.mp4",
  "./wallpaper/dtimg/dtbg9.mp4",
  "./wallpaper/dtimg/dtbg10.mp4",
];
// 网站快捷导航数据
const websiteNav = [
  {
    url: "https://www.bilibili.com",
    imgUrl: "https://www.bilibili.com/favicon.ico",
    name: "bilibili",
  },
  {
    url: "https://github.com/ITSTRONGERMAN",
    imgUrl: "https://github.com/favicon.ico",
    name: "github",
  },
  {
    url: "https://www.csdn.net/",
    imgUrl: "https://www.csdn.net/favicon.ico",
    name: "CSDN",
  },
  {
    url: "https://www.runoob.com/",
    imgUrl: "https://www.runoob.com/favicon.ico",
    name: "菜鸟教程",
  },
  {
    url: "https://fanyi.baidu.com/?aldtype=16047#auto/zh",
    imgUrl: "https://fanyi.baidu.com/favicon.ico",
    name: "百度翻译",
  },
  {
    url: "https://www.douyin.com/",
    imgUrl: "https://www.douyin.com/favicon.ico",
    name: "抖音",
  },
  {
    url: "https://www.bootcdn.cn/",
    imgUrl: "https://www.bootcdn.cn/assets/img/bootcdn.png",
    name: "Bootcdn",
  },
  {
    url: "https://cn.vuejs.org/",
    imgUrl: "https://vuejs.org/images/logo.png",
    name: "Vue",
  },
  {
    url: "https://developer.mozilla.org/zh-CN/",
    imgUrl: "https://developer.mozilla.org/favicon-48x48.cbbd161b.png",
    name: "MDN",
  },
];
// 动态渲染壁纸数据
$.each(statiWallpaperList, function (index, imgData) {
  let li = $("<li></li>");
  li.addClass("skin-img");
  li.attr("index", index + 1);
  li.html(`<img src="${imgData}" alt="" />`);
  $(".nav .tab-box .staicwallpaper").append(li);
});
$.each(dynamicWallpaperList, function (index, imgData) {
  let li = $("<li></li>");
  li.addClass("skin-img");
  li.attr("index", index + 1);
  li.html(`<video src="${imgData}" autoplay loop muted></video>`);
  $(".nav .tab-box .dynamicwallpaper").append(li);
});
// 提示框函数
let tipTimer = null;
function showTip(txt) {
  $(".tip .tiptxt").html(txt);
  $(".tip").slideDown();
  // 防抖
  if (tipTimer != null) {
    clearTimeout(tipTimer);
  }
  tipTimer = setTimeout(() => {
    $(".tip").slideUp();
  }, 3000);
}
// 换肤选项列表的淡入淡出
let isShowSkinBox = false;
$(".nav").click(function (e) {
  if (e.target.nodeName.toLowerCase() == "ul") return;
  if (!isShowSkinBox) {
    $(this).children(".tab-box").fadeIn();
    isShowSkinBox = true;
  } else {
    $(this).children(".tab-box").fadeOut();
    isShowSkinBox = false;
  }
});
// 搜索功能
$(".search-btn").click(function () {
  // 当搜索框为空时，提示功能
  let val = $(".search-ipt").val().trim();
  if (val == "" || val.length == 0) {
    showTip("搜索框不能为空");
    return;
  }
  let searchUrl = "https://www.baidu.com/s?wd=" + val;
  window.open(searchUrl);
});
// 手动换肤功能的实现
// 静态壁纸
$(".nav .tab-box .staicwallpaper .skin-img").click(function (e) {
  $(".dtwallpaper").prop("src", "");
  let imgSrc = $(this).children("img").prop("src");
  $("body").css({
    background: `url('${imgSrc}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });
  autoChangeSkin();
});
// 动态壁纸
$(".nav .tab-box .dynamicwallpaper .skin-img").click(function (e) {
  $("body").css("background", "");
  let videoSrc = $(this).children("video").prop("src");
  $(".dtwallpaper").prop("src", videoSrc);
});
// 动态渲染网站快捷导航数据
function renderWebsiteNav() {
  $.each(websiteNav, function (index, websiteData) {
    let a = $("<a></a>");
    a.addClass("website");
    a.prop("href", websiteData.url);
    a.prop("target", "_blank");
    a.html(
      ` <img src="${websiteData.imgUrl}" alt=""/><p>${websiteData.name}</p>`
    );
    $(".website-box").append(a);
  });
}
renderWebsiteNav();
// 添加网址快捷方式
$(".addwebsite-btn").click(function () {
  $(this).parent().siblings(".websiteconfig").fadeIn();
});
$(".website-box .close,.cancel").click(function () {
  $(this).parent().fadeOut();
});
// 添加数据并渲染
$(".website-box .yes").click(function () {
  if ($(".website-box").children(".website").length >= 12) {
    showTip("已达到快捷方式最大容量");
    return;
  }
  let url = $("#weburl").val();
  let name = $("#webname").val();
  if (
    url.trim() == "" ||
    url.length == 0 ||
    name.trim() == "" ||
    name.length == 0
  ) {
    showTip("请完善您所添加的快捷方式信息");
    return;
  }
  let data = {
    url,
    imgUrl: url + "favicon.ico",
    name,
  };
  websiteNav.push(data);
  $(".website-box").children(".website").remove();
  renderWebsiteNav();
  $(this).parent().fadeOut();
  $("#weburl").val("");
  $("#webname").val("");
});
// 导航名言数据请求
getFamousTxt();
function getFamousTxt() {
  $.ajax({
    type: "get",
    url: "https://api.uixsj.cn/hitokoto/get?type=social",
    success(res) {
      $(".famoustxt").html(res);
    },
  });
}
// 日历
var mySchedule = new Schedule({
  el: "#schedule-box", //指定包裹元素（可选）
  date: new Date(), //生成指定日期日历（可选）
  clickCb: function (y, m, d) {
    //点击日期回调（可选）
  },
  nextMonthCb: function (y, m, d) {
    //点击下个月回调（可选）
  },
  nextYeayCb: function (y, m, d) {
    //点击下一年回调（可选）
  },
  prevMonthCb: function (y, m, d) {
    //点击上个月回调（可选）
  },
  prevYearCb: function (y, m, d) {
    //点击上一年月回调（可选）
  },
});
// 日历的打开与关闭
let isOpenCalendar = false;
let calendarTimer = null;
$(".opencalendar").click(function () {
  if (calendarTimer != null) {
    clearTimeout(calendarTimer);
  }
  if (!isOpenCalendar) {
    $(this).parent().css("right", "20px");
    $(this).html("关闭日历");
    isOpenCalendar = true;
  } else {
    $(this).parent().css("right", "-360px");
    $(this).html("查看日历");
    isOpenCalendar = false;
  }
  calendarTimer = setTimeout(() => {
    $(this).parent().css("right", "-360px");
    $(this).html("查看日历");
    isOpenCalendar = false;
  }, 10000);
});
// 静动态壁纸tab栏切换
$(".jord li").click(function (e) {
  e.stopPropagation();
  $(this).addClass("active").siblings("li").removeClass("active");
  $(".imgbox")
    .eq($(this).attr("index"))
    .addClass("current")
    .siblings(".imgbox")
    .removeClass("current");
});
// 动态壁纸音量静音
let isVolume = false;
$(".volumebtn").click(function () {
  if (isVolume) {
    $(".dtwallpaper")[0].muted = false;
    isVolume = false;
    $(".volumebtn .icon-shengyin_shiti").css("display", "block");
    $(".volumebtn .icon-jingyin").css("display", "none");
    $(".volumeline").val(50);
    $(".dtwallpaper")[0].volume = $(".volumeline").val() / 100;
  } else {
    $(".dtwallpaper")[0].muted = true;
    isVolume = true;
    $(".volumebtn .icon-shengyin_shiti").css("display", "none");
    $(".volumebtn .icon-jingyin").css("display", "block");
    $(".volumeline").val(0);
  }
});
// 控制动态壁纸音量
$(".volumeline").change(function () {
  if ($(this).val() == 0) {
    $(".volumebtn .icon-shengyin_shiti").css("display", "none");
    $(".volumebtn .icon-jingyin").css("display", "block");
    $(".dtwallpaper")[0].muted = true;
    isVolume = true;
  } else {
    $(".volumebtn .icon-shengyin_shiti").css("display", "block");
    $(".volumebtn .icon-jingyin").css("display", "none");
    $(".dtwallpaper")[0].muted = false;
    isVolume = false;
  }
  $(".dtwallpaper")[0].volume = $(this).val() / 100;
});
