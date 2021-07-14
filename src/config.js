
import { LogoutOutlined,AppstoreFilled, PieChartFilled, ShopOutlined , HomeFilled } from '@ant-design/icons';
import { UserGroupFilled } from './icons';

import { } from './views';
import { Dashboard } from './views/dashboard';
import { Facilities } from './views/facilities';
import { FacilityArea, facilityArea } from './views/facilities/area';
import { FacilityManning } from './views/facilities/manning';
import { FacilityProcess } from './views/facilities/process/process';

const Empty = () => <div />;

export const routes = [
    {path: '/', exact: true ,component: Dashboard},
    {path: '/select-account',exact: true, component: Empty},
    {path: '/user',exact: true, component: Empty},
    {path: '/profile',exact: true, component: Empty},
    {path: '/facility-overview',exact: true, component: Facilities},
    {path: '/facility-overview/area',exact: true, component: FacilityArea},
    {path: '/facility-overview/manning',exact: true, component: FacilityManning},
    {path: '/facility-overview/process',exact: true, component: FacilityProcess},
    
];

export const menus = [
    {title: 'Dashboard', icon: <HomeFilled />, exact: true, url: '#/'},
    {
        title: 'Facilities Overview', 
        icon: <UserGroupFilled />, 
        url: '#/facility-overview',
        children: [
            {title: 'Area', exact: true, url: '#/facility-overview/area'},
            {title: 'Process', exact: true, url: '#/facility-overview/process'},
            {title: 'Manning', exact: true, url: '#/facility-overview/manning'},
        ]
    },
    {title: 'Major Accident Hazards', icon: <ShopOutlined />, url: '#/accident-hazards'},
    {
        title: 'Risk Assessment', 
        icon: <UserGroupFilled />, 
        url: '#/risk-assessment',
        children: [
            {title: 'Hazard Identification Worksheets', exact: true, url: '#/risk-assessment/identification-worksheet'},
            {title: 'Hazard and Operability Worksheets', exact: true, url: '#/risk-assessment/operability-worksheet'},
            {title: 'Escape, Evacuation, Rescue Analysis', exact: true, url: '#/risk-assessment/rescue-analysis'},
            {title: 'Emergency System Survivability Analysis', exact: true, url: '#/risk-assessment/survivability-analysis'},
            {title: 'Individual Risk', exact: true, url: '#/risk-assessment/individual'},
            {title: 'Plant Risk Breakdown', exact: true, url: '#/risk-assessment/plant'},
            {title: 'Location Risk', exact: true, url: '#/risk-assessment/location'},
            {title: 'Societal Risk', exact: true, url: '#/risk-assessment/societal'},
        ]
    },
    {
        title: 'Safety Critical Element', 
        icon: <UserGroupFilled />, 
        url: '#/safety-critical',
        children: [
            {title: 'Safety Critical Equipment', exact: true, url: '#/safety-critical/equipment'},
            {title: 'Safety Critical Personnel', exact: true, url: '#/safety-critical/personnel'},
            {title: 'Safety Critical Procedure', exact: true, url: '#/safety-critical/procedure'},
        ]
    },
    {
        title: 'Emergency Response', 
        icon: <UserGroupFilled />, 
        url: '#/emergency-response',
        children: [
            {title: 'Emergency Response Tiers', exact: true, url: '#/emergency-response/tiers'},
            {title: 'Emergency Response Organisation', exact: true, url: '#/emergency-response/organisation'},
            {title: 'Emergency Response Plan', exact: true, url: '#/emergency-response/plan'},
            {title: 'Scenario Specific', exact: true, url: '#/emergency-response/scenario'},
            {title: 'Action Plan', exact: true, url: '#/emergency-response/action'},
        ]
    },
    {title: 'Safety Management System', icon: <UserGroupFilled />, url: '#/user'},
    {title: 'Remedial Action Plan', icon: <UserGroupFilled />, url: '#/user'},
    {title: 'Writen Safety Case', icon: <UserGroupFilled />, url: '#/user'},
    {title: 'Users', icon: <UserGroupFilled />, url: '#/user'},
];  
// Emergency Response Tiers
// Emergency Response Organisation
// Emergency Response Plan
// Scenario Specific
// Action Plan


export const getSelectedMenuItem = (m, p = '', ret = []) =>{
    if(!m) m = menus;
    var selected = m.findIndex(v=> RegExp('^'+ v.url + (v.exact ? '$' : '')).test(window.location.hash) );
    if(selected!==-1){
        ret.push(p + '_' + selected);
        if(m[selected].children){
            ret = getSelectedMenuItem(m[selected].children, selected, ret);
        }
    }
    return ret;
}