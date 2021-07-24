
import { ShopOutlined, HomeFilled } from '@ant-design/icons';
import { UserGroupFilled } from './icons';

import { AccidentsHazard, Dashboard, Facilities, FacilityArea, FacilityManning, FacilityProcess, RiskAssessment, HazardIdentifications, HazardOperatability, HazardAnalysis, HazardEmergency, CriticalEquipment, CriticalPersonnel, CriticalProcedure, CriticalElement, SelectAccount, EquipmentPrevention, EmergencyResponse, ResponseTiers, ResponseOrganisation, ResponsePlan, ScenarioActionPlan } from './views';

import facilityImg from './assets/menu/blueprint.png';

const Empty = () => <div />;

export const routes = [
    { path: '/', exact: true, component: Dashboard },
    { path: '/select-account', exact: true, component: SelectAccount },
    { path: '/user', exact: true, component: Empty },
    { path: '/profile', exact: true, component: Empty },
    { path: '/facility-overview', exact: true, component: Facilities },
    { path: '/facility-overview/area', exact: true, component: FacilityArea },
    { path: '/facility-overview/manning', exact: true, component: FacilityManning },
    { path: '/facility-overview/process', exact: true, component: FacilityProcess },
    { path: '/accidents-hazards', exact: true, component: AccidentsHazard },
    { path: '/risk-assessment', exact: true, component: RiskAssessment },
    { path: '/risk-assessment/identification-worksheet', exact: true, component: HazardIdentifications },
    { path: '/risk-assessment/operability-worksheet', exact: true, component: HazardOperatability },
    { path: '/risk-assessment/rescue-analysis', exact: true, component: HazardAnalysis },
    { path: '/risk-assessment/survivability-analysis', exact: true, component: HazardEmergency },
    { path: '/safety-critical', exact: true, component: CriticalElement },
    { path: '/safety-critical/equipment', exact: true, component: CriticalEquipment },
    { path: '/safety-critical/equipment/prevention', exact: true, component: EquipmentPrevention },
    { path: '/safety-critical/personnel', exact: true, component: CriticalPersonnel },
    { path: '/safety-critical/procedure', exact: true, component: CriticalProcedure },
    { path: '/emergency-response', exact: true, component: EmergencyResponse },
    { path: '/emergency-response/tiers', exact: true, component: ResponseTiers },
    { path: '/emergency-response/organisation', exact: true, component: ResponseOrganisation },
    { path: '/emergency-response/plan', exact: true, component: ResponsePlan },
    { path: '/emergency-response/scenario', exact: true, component: ScenarioActionPlan },
];

export const menus = [
    { title: 'Dashboard', icon: <HomeFilled />, exact: true, url: '#/' },
    {
        title: 'Facilities Overview',
        icon: <img src={facilityImg} alt="facility" />,
        url: '#/facility-overview',
        children: [
            { title: 'Area', exact: true, url: '#/facility-overview/area' },
            { title: 'Process', exact: true, url: '#/facility-overview/process' },
            { title: 'Manning', exact: true, url: '#/facility-overview/manning' },
        ]
    },
    { title: 'Major Accident Hazards', icon: <ShopOutlined />, url: '#/accidents-hazards' },
    {
        title: 'Risk Assessment',
        icon: <UserGroupFilled />,
        url: '#/risk-assessment',
        children: [
            { title: 'Hazard Identification Worksheets', exact: true, url: '#/risk-assessment/identification-worksheet' },
            { title: 'Hazard and Operability Worksheets', exact: true, url: '#/risk-assessment/operability-worksheet' },
            { title: 'Escape, Evacuation, Rescue Analysis', exact: true, url: '#/risk-assessment/rescue-analysis' },
            { title: 'Emergency System Survivability Analysis', exact: true, url: '#/risk-assessment/survivability-analysis' },
            { title: 'Individual Risk', exact: true, url: '#/risk-assessment/individual' },
            { title: 'Plant Risk Breakdown', exact: true, url: '#/risk-assessment/plant' },
            { title: 'Location Risk', exact: true, url: '#/risk-assessment/location' },
            { title: 'Societal Risk', exact: true, url: '#/risk-assessment/societal' },
        ]
    },
    {
        title: 'Safety Critical Element',
        icon: <UserGroupFilled />,
        url: '#/safety-critical',
        children: [
            { title: 'Safety Critical Equipment', exact: true, url: '#/safety-critical/equipment' },
            { title: 'Safety Critical Personnel', exact: true, url: '#/safety-critical/personnel' },
            { title: 'Safety Critical Procedure', exact: true, url: '#/safety-critical/procedure' },
        ]
    },
    {
        title: 'Emergency Response',
        icon: <UserGroupFilled />,
        url: '#/emergency-response',
        children: [
            { title: 'Emergency Response Tiers', exact: true, url: '#/emergency-response/tiers' },
            { title: 'Emergency Response Organisation', exact: true, url: '#/emergency-response/organisation' },
            { title: 'Emergency Response Plan', exact: true, url: '#/emergency-response/plan' },
            { title: 'Scenario Specific Action Plan', exact: true, url: '#/emergency-response/scenario' },
            // { title: 'Action Plan', exact: true, url: '#/emergency-response/action' },
        ]
    },
    { title: 'Safety Management System', icon: <UserGroupFilled />, url: '#/safety-management' },
    { title: 'Remedial Action Plan', icon: <UserGroupFilled />, url: '#/remedial-action' },
    { title: 'Writen Safety Case', icon: <UserGroupFilled />, url: '#/writen-safety' },
    { title: 'Users', icon: <UserGroupFilled />, url: '#/user' },
];


export const getSelectedMenuItem = (m, p = '', ret = []) => {
    if (!m) m = menus;
    var selected = m.findIndex(v => RegExp('^' + v.url + (v.exact ? '$' : '')).test(window.location.hash));
    if (selected !== -1) {
        ret.push(p + '_' + selected);
        if (m[selected].children) {
            ret = getSelectedMenuItem(m[selected].children, selected, ret);
        }
    }
    return ret;
}