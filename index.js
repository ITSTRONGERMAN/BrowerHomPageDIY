// 换肤功能实现开始
let isShowSkinBox = false;
// 换肤选项列表的淡入淡出
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
let tipTimer = null;
$(".search-btn").click(function () {
  // 当搜索框为空时，提示功能
  let val = $(".search-ipt").val().trim();
  if (val == "" || val.length == 0) {
    $(".tip .tiptxt").html("输入框不能为空");
    $(".tip").slideDown();
    // 防抖
    if (tipTimer != null) {
      clearTimeout(tipTimer);
    }
    tipTimer = setTimeout(() => {
      $(".tip").slideUp();
    }, 3000);
    return;
  }
  let searchUrl = "https://www.baidu.com/s?wd=" + val;
  window.open(searchUrl);
});
// 添加网址
$(".addwebsite-btn").click(function () {
  let a = $("<a></a>");
  a.addClass("website");
  $(this).parents(".website-box").append(a);
});
// 自动换肤功能
let autoChangSkinIndex = 0;
let autoChangSkinTimer = null;
let autoChangeSkinDelay = 180000;
function autoChangeSkin() {
  autoChangSkinTimer = setInterval(() => {
    if(autoChangSkinIndex>=5){
      autoChangSkinIndex=0
    }
    autoChangSkinIndex++;
    $("body").css({
      background: `url('file:///C:/Users/86199/Desktop/project/BrowerHomPageDIY/wallpaper/bg${autoChangSkinIndex}.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  }, autoChangeSkinDelay);
}
autoChangeSkin()
// 手动换肤功能的实现
$(".nav .tab-box .skin-img").click(function () {
  let imgSrc = $(this).children("img").prop("src");
    autoChangSkinIndex=$(this).attr('index')
  $("body").css({
    background: `url('${imgSrc}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });
});
// 换肤功能实现成功