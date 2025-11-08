export default defineAppConfig({
  pages: ['pages/index/index', 'pages/about/index'],

  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
      },
    ],
  },

  subPackages: [
    // 电玩项目
    {
      root: 'pages/(arcade)',
      pages: ['pages/home/index', 'pages/mine/index', 'pages/vip-code/index'],
    },

    // 鸡尾酒项目
    {
      root: 'pages/(cocktail)',
      pages: ['pages/home/index', 'pages/mine/index', 'pages/item-detail/index'],
    },

    // 奶茶项目
    {
      root: 'pages/(milk-tea)',
      pages: ['pages/home/index', 'pages/category/index', 'pages/cart/index', 'pages/mine/index', 'pages/orders/index'],
    },
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },

  lazyCodeLoading: 'requiredComponents',
})
