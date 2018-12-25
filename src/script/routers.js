import hotLoader from 'react-hot-component-loader';

export const tabs = [
  {
    path: '/',
    exact: true,
    name: 'NodeJS论坛',
    component: hotLoader(() => import('@view/home')),
  },
  {
    path: '/index/article-details',
    name: '详情',
    component: hotLoader(() => import('@view/detail')),
  },
  {
    path: '/news',
    exact: true,
    name: '消息',
    component: hotLoader(() => import('@view/personal')),
  },
  {
    path: '/share',
    component: hotLoader(() => import('@view/post')),
    name: '分享',
  },
  {
    path: '/user',
    exact: true,
    name: '我的',
    component: hotLoader(() => import('@view/info')),
  },
  {
    path: '/user/login',
    name: '登录',
    component: hotLoader(() => import('@view/login')),
  },
  {
    path: '/otheruser',
    exact: true,
    name: '其他用户',
    component: hotLoader(() => import('@view/info')),
  },
];

export const categories = [
  {
    name: '全部',
    link: '/',
    type: 'all',
  },
  {
    name: '精华',
    link: '/?tab=good',
    type: 'good',
  },
  {
    name: '分享',
    link: '/?tab=share',
    type: 'share',
  },
  {
    name: '问答',
    link: '/?tab=ask',
    type: 'ask',
  },
  {
    name: '招聘',
    link: '/?tab=job',
    type: 'job',
  },
  {
    name: '测试',
    link: '/?tab=dev',
    type: 'dev',
  },
];

export const tabNames = [
  {
    name: '首页',
    type: 'home',
    link: '/',
  },
  {
    name: '消息',
    type: 'news',
    link: '/news',
  },
  {
    name: '发表',
    type: 'issue',
    link: '/share',
  },
  {
    name: '我的',
    type: 'user',
    link: '/user',
  },
];
