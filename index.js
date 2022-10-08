// 壁纸数据
const wallpaperList = [
  "./wallpaper/bg1.jpg",
  "./wallpaper/bg2.jpg",
  "./wallpaper/bg3.jpg",
  "./wallpaper/bg4.jpg",
  "./wallpaper/bg5.jpg",
  "./wallpaper/bg6.jpg",
  "./wallpaper/bg7.jpg",
  "./wallpaper/bg8.jpg",
  "./wallpaper/bg9.jpg",
  "./wallpaper/bg10.jpg",
  "./wallpaper/bg12.jpg",
  "./wallpaper/bg13.jpg",
  "./wallpaper/bg14.jpg",
  "./wallpaper/bg15.jpg",
  "./wallpaper/bg16.jpg",
  "./wallpaper/bg17.jpg",
  "./wallpaper/bg18.jpg",
  "./wallpaper/bg19.jpg",
  "./wallpaper/bg20.jpg",
];
// 动态渲染壁纸数据
$.each(wallpaperList, function (index, imgData) {
  let li = $("<li></li>");
  li.addClass("skin-img");
  li.attr("index", index + 1);
  li.html(`<img src="${imgData}" alt="" />`);
  $(".nav .tab-box .imgbox").append(li);
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
  if (e.target.parentNode.className == "tab-box") {
    return;
  }
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
// 自动换肤功能
let autoChangeSkinIndex = 0;
let autoChangeSkinTimer = null;
let autoChangeSkinDelay = 180000;
function autoChangeSkin() {
  autoChangSkinTimer = setInterval(() => {
    if (autoChangeSkinIndex > wallpaperList.length) {
      autoChangeSkinIndex = 0;
    }
    autoChangeSkinIndex++;
    $("body").css({
      background: `url('file:///C:/Users/86199/Desktop/project/BrowerHomPageDIY/wallpaper/bg${autoChangSkinIndex}.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
    getFamousTxt()
  }, autoChangeSkinDelay);
}
autoChangeSkin();
// 手动换肤功能的实现
$(".nav .tab-box .skin-img").click(function () {
  clearInterval(autoChangeSkinTimer);
  let imgSrc = $(this).children("img").prop("src");
  autoChangeSkinIndex = $(this).attr("index");
  $("body").css({
    background: `url('${imgSrc}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });
  autoChangeSkin();
});
// 导航栏按钮控制自动换肤
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
];
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
getFamousTxt()
function getFamousTxt(){
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
    $(this).html("打开日历");
    isOpenCalendar = false;
  }
  calendarTimer = setTimeout(() => {
    $(this).parent().css("right", "-360px");
    $(this).html("打开日历");
    isOpenCalendar = false;
  }, 10000);
});
// 获取时间
let dateNow=new Date()
function formatTime(time){
  return `${time.getFullYear()}年`
}
console.log(formatTime(dateNow));