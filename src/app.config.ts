export default defineAppConfig({
  pages: ['pages/index/index'],

  subPackages: [
    {
      root: 'pages/(arcade)',
      pages: ['pages/home/index', 'pages/mine/index', 'pages/vip-code/index'],
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
