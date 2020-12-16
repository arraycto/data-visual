/**
 * 刻度尺厚度、页面参数配置项、屏幕大小
 */
export const THICK = 20;
export const DIMENSION = {
  small: {
    width: 1366,
    height: 768
  },
  middle: {
    width: 1440,
    height: 960
  },
  large: {
    width: 1920,
    height: 1080
  },
  mobile: {
    width: 750,
    height: 1366
  }
};

/**
 * 字体配置项
 */
export const FONT_CONF = [
  {
    label: "Arial",
    value: "Arial"
  },
  { label: "Arial Black", value: "Arial Black" },
  { label: "Bookman", value: "Bookman" },
  {
    label: "Candara",
    value: "Candara"
  },
  { label: "Courier New", value: "Courier New" },
  { label: "Courier", value: "Courier" },
  {
    label: "Garamond",
    value: "Garamond"
  },
  { label: "Georgia", value: "Georgia" },
  { label: "Helvetica", value: "Helvetica" },
  {
    label: "Impact",
    value: "Impact"
  },
  { label: "Roboto", value: "Roboto" },
  { label: "Monaco", value: "Monaco" },
  {
    label: "Palatino",
    value: "Palatino"
  },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Verdana", value: "Verdana" },
  {
    label: "微软雅黑",
    value: "Microsoft Yahei"
  },
  { label: "方正黑体简体", value: "FZHei-B01S" },
  { label: "方正楷体简体", value: "FZKai-Z03S" },
  {
    label: "方正书宋简体",
    value: "FZShuSong-Z01S"
  },
  { label: "方正仿宋简体", value: "FZFangSong-Z02S" },
  { label: "思源极细体", value: "NotoSansSC-Thin" },
  {
    label: "思源细体",
    value: "NotoSansSC-Light"
  },
  { label: "思源正常", value: "NotoSansSC-DemiLight" },
  { label: "思源常规", value: "NotoSansSC-Regular" },
  {
    label: "思源中等粗体",
    value: "NotoSansSC-Medium"
  },
  { label: "思源粗体", value: "NotoSansSC-Bold" },
  { label: "思源特粗", value: "NotoSansSC-Black" },
  {
    label: "站酷高端黑",
    value: "zcool-gdh"
  },
  { label: "站酷快乐体", value: "HappyZcool" },
  { label: "方正综艺简体", value: "FZZongYi-M05S" },
  {
    label: "方正兰亭黑简体",
    value: "FZLanTingHeiS-R-GB"
  },
  { label: "方正博雅宋简体", value: "FZBoYaSongS-GB" },
  { label: "方正粗黑宋简体", value: "FZCuHeiSongS-B-GB" },
  {
    label: "方正超粗黑简体",
    value: "FZChaoCuHei-M10S"
  },
  { label: "方正兰亭特黑简体", value: "FZLanTingHeiS-H-GB" },
  {
    label: "方正兰亭中黑简体",
    value: "FZLanTingHei-DB-GBK"
  },
  { label: "方正兰亭刊黑简体", value: "FZLanTingKanHei-R-GBK" },
  { label: "方正粗圆简体", value: "FZCuYuan-M03S" },
  {
    label: "方正准圆简体",
    value: "FZZhunYuan-M02S"
  },
  { label: "方正特粗光辉简体", value: "FZTeCuGuangHuiS-R-GB" },
  {
    label: "方正汉真广标简体",
    value: "FZHanZhenGuangBiaoS-GB"
  },
  { label: "方正剪纸简体", value: "FZJianZhi-M23S" },
  { label: "方正正大黑简体", value: "FZZhengHeiS-EB-GB" },
  {
    label: "方正正黑简体",
    value: "FZZhengHeiS-R-GB"
  },
  { label: "方正北魏楷书简体", value: "FZBeiWeiKaiShu-S19S" },
  {
    label: "方正铁筋隶书简体",
    value: "FZTieJinLiShu-S17S"
  },
  { label: "方正硬笔楷书简体", value: "FZYingBiKaiShu-S15S" },
  {
    label: "方正硬笔行书简体",
    value: "FZYingBiXingShu-S16S"
  },
  { label: "方正吕建德行楷简体", value: "FZZJ-LJDFONT" },
  { label: "方正静蕾简体", value: "FZJingLeiS-R-GB" },
  {
    label: "方正瘦金书简体",
    value: "FZShouJinShu-S10S"
  },
  { label: "方正喵呜体", value: "FZMiaoWuS-GB" }
];

/**
 * 动画效果
 */
export const ANIMATE_CSS = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "swing",
  "tada",
  "wobble",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "bounceOut",
  "bounceOutDown",
  "bounceOutLeft",
  "bounceOutRight",
  "bounceOutUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeOut",
  "fadeOutDown",
  "fadeOutDownBig",
  "fadeOutLeft",
  "fadeOutLeftBig",
  "fadeOutRight",
  "fadeOutRightBig",
  "fadeOutUp",
  "fadeOutUpBig",
  "flip",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",
  "lightSpeedIn",
  "lightSpeedOut",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideOutLeft",
  "slideOutRight",
  "slideOutUp",
  "hinge",
  "rollIn",
  "rollOut"
];
