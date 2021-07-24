const { fs, path } = require('@vuepress/shared-utils');

module.exports = (ctx) => ({
  dest: '../../vuepress',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Hora Search',
      description:
        'Hora Search Everywhere, a light approximate nearest neighbor search library in rust',
    },
  },
  head: [
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-ZCQDT118MM' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-ZCQDT118MM');`,
    ],
    [
      'script',
      { defer: true },
      `var header = document.querySelector('.home-link');
    if (header) {
      header.href = 'https://horasearch.com/';
    }`,
    ],
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    repo: 'hora-search/hora',
    editLinks: true,
    docsDir: 'packages/docs/docs',
    smoothScroll: true,
    logo: '/logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/doc/': getGuideSidebar('Basic', 'Indexes'),
        },
      },
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-128189152-1',
      },
    ],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
    ['flowchart'],
  ],
  extraWatchFiles: ['.vuepress/nav/en.js'],
});

function getGuideSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: ['', 'install', 'benchmark', 'example'],
    },
    {
      title: groupB,
      collapsable: false,
      children: ['BruteForceIndex', 'HNSWIndex', 'SSGIndex', 'PQIndex', 'PQIVFIndex'],
    },
  ];
}
