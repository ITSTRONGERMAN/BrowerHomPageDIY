// 壁纸数据
const wallpaperList = [
  "./wallpaper/bg1.jpg",
  "./wallpaper/bg2.jpg",
  "./wallpaper/bg3.jpg",
  "./wallpaper/bg4.jpg",
  "./wallpaper/bg5.jpg",
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
let autoChangSkinIndex = 0;
let autoChangSkinTimer = null;
let autoChangeSkinDelay = 180000;
function autoChangeSkin() {
  autoChangSkinTimer = setInterval(() => {
    if (autoChangSkinIndex >= 5) {
      autoChangSkinIndex = 0;
    }
    autoChangSkinIndex++;
    $("body").css({
      background: `url('file:///C:/Users/86199/Desktop/project/BrowerHomPageDIY/wallpaper/bg${autoChangSkinIndex}.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  }, autoChangeSkinDelay);
}
autoChangeSkin();
// 手动换肤功能的实现
$(".nav .tab-box .skin-img").click(function () {
  let imgSrc = $(this).children("img").prop("src");
  autoChangSkinIndex = $(this).attr("index");
  console.log(autoChangSkinIndex);
  $("body").css({
    background: `url('${imgSrc}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });
});
// 导航栏按钮控制自动换肤
// 下方常用网站快捷导航数据
const websiteNav = [
  {
    url: "https://www.bilibili.com/",
    imgUrl: "./images/bilibili.png",
    name: "bilibili",
  },
  {
    url: "https://github.com/ITSTRONGERMAN",
    imgUrl: "./images/github.png",
    name: "github",
  },
  {
    url: "https://www.csdn.net/",
    imgUrl: "./images/csdn.png",
    name: "CSDN",
  },
  {
    url: "https://www.runoob.com/",
    imgUrl: "./images/cainiao.png",
    name: "菜鸟教程",
  },
  {
    url: "https://fanyi.baidu.com/?aldtype=16047#auto/zh",
    imgUrl: "./images/fanyi.png",
    name: "百度翻译",
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
  if ($(".website-box").children(".website").length >= 8) {
    showTip("已达到快捷方式最大容量");
    return;
  }
  let url = $("#weburl").val();
  let name = $("#webname").val();
  if (url.trim() == "" || name.trim() == "") {
    showTip("必填内容，不能为空");
    return;
  }
  let data = {
    url,
    imgUrl: "./images/bilibili.png",
    name,
  };
  websiteNav.push(data);
  $(".website-box").children(".website").remove();
  renderWebsiteNav();
  $(this).parent().fadeOut();
  $("#weburl").val("");
  $("#webname").val("");
});
