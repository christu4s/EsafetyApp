
import { LogoutOutlined,AppstoreFilled, PieChartFilled, ShopOutlined , HomeFilled } from '@ant-design/icons';
import { UserGroupFilled } from './icons';

import { } from './views';
import { Dashboard } from './views/dashboard';

const Empty = () => <div />;

export const routes = [
    {path: '/', exact: true ,component: Dashboard},
    {path: '/reports',exact: true, component: Empty},
    {path: '/user',exact: true, component: Empty},
    {path: '/group',exact: true, component: Empty},
    {path: '/store',exact: true, component: Empty},
    {path: '/store/:id',exact: true, component: Empty},
    {path: '/store/:id/upload',exact: true, component: Empty},
    {path: '/profile',exact: true, component: Empty},
];

export const menus = [
    {title: 'Dashboard', icon: <HomeFilled />, exact: true, url: '#/'},
    {title: 'E-Safety Cases', icon: <UserGroupFilled />, exact: true, url: '#/cases'},
    {
        title: 'Facilities Overview', 
        icon: <UserGroupFilled />, 
        url: '#/facility-overview',
        children: [
            {title: 'Area', icon: <AppstoreFilled />, exact: true, url: '#/facility-overview/area'},
            {title: 'Process', icon: <AppstoreFilled />, exact: true, url: '#/facility-overview/process'},
            {title: 'Manning', icon: <AppstoreFilled />, exact: true, url: '#/facility-overview/manning'},
        ]
    },
    {title: 'Store', icon: <ShopOutlined />, url: '#/store'},
    {title: 'Users', icon: <UserGroupFilled />, url: '#/user'},
    {title: 'Log Out', icon: <LogoutOutlined />, url: '/logout'},
];



export const getSelectedMenuItem = () =>{
    var selected = menus.findIndex(v=> RegExp('^'+ v.url + (v.exact ? '$' : '')).test(window.location.hash) );
    return (selected===-1 ? 0 : selected).toString();
}