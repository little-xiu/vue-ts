const Structure = () => import('./index.vue');
const costCenter = () => import('./costCenter/index.vue');
const costCenterList = () => import('./costCenter/costCenterList/index.vue');

export default {
  path: '/structure',
  name: 'structure',
  component: Structure,
  children: [
    {
      path: '/structure/costCenter',
      name: 'costCenter',
      component: costCenter,
      meta: {
        breadcrumbName: '成本中心',
      },
      redirect: '/structure/costCenterList',
      children: [
        {
          path: '/structure/costCenterList',
          name: 'costCenterList',
          component: costCenterList,
        },
      ],
    },
  ],
};