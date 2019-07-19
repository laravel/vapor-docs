module.exports = {
  title: 'Laravel Vapor',
  description: 'Laravel at Infinite Scale',

  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
  ],

  themeConfig: {
    // logo: '/assets/img/logo.svg',
    displayAllHeaders: true,
    sidebarDepth: 1,

    nav: [
      { text: 'Home', link: 'https://vapor.laravel.com' }
    ],

    sidebar: {
      '/1.0/': require('./1.0')
    },
  },
}
