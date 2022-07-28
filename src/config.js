import { ShopOutlined, HomeFilled } from '@ant-design/icons';
import { UserGroupFilled } from './icons';

import { AccidentsHazard, Dashboard, Facilities, FacilityArea, FacilityAreaDetails, EquipmentPreventionDetails, FacilityManning, FacilityProcess, RiskAssessment, HazardIdentifications, HazardOperatability, HazardAnalysis, HazardEmergency, CriticalEquipment, CriticalPersonnel, CriticalProcedure, CriticalElement, SelectAccount, EquipmentPrevention, EquipmentDetection, EquipmentControl, EquipmentMitigation, EquipmentEmergencyResponse, EquipmentIncident, EmergencyResponse, ResponseTiers, ResponseOrganisation, ResponsePlan, ScenarioActionPlan, SafetyManagement, RemedialAction, WrittenSafetyCase, AccidentsHazardItem, SafetyManagementItem, CriticalElementType, CriticalEquipmentItem, RiskAssessmentDetail, SearchPage } from './views';

import facilityImg from './assets/menu/blueprint.png';
import HazardsImg from './assets/menu/fire.png';
import RiskImg from './assets/menu/riskAssessment.png';
import WrittenImg from './assets/menu/written.png';
import emergencyImg from './assets/menu/emergency.png';
import safetCriticalImg from './assets/menu/safetCritical.png';
import managementImg from './assets/menu/safetyManagement.png';
import remedialImg from './assets/menu/remedial.png';

import { IndividualRisk } from './views/RiskAssessment/IndividualRisk';
import { IndividualRiskEditUser } from './views/RiskAssessment/IndividualRisk/individualRiskEditUser';
import { PlanRiskBreakDown } from './views/RiskAssessment/PlanRiskBreakdown';
import { LocationRisk } from './views/RiskAssessment/LocationRisk';
import { SocietalRisk } from './views/RiskAssessment/SocietalRisk';
import { SearchHeader } from './views/SearchHeader';
import ajax from './ajax';

const Empty = () => < div />;

export const routes = [
    { path: '/', exact: true, component: Dashboard },
    { path: '/select-account', exact: true, component: SelectAccount },
    { path: '/user', exact: true, component: Empty },
    { path: '/profile', exact: true, component: Empty },
    { path: '/facility-overview', exact: true, component: Facilities },
    { path: '/facility-overview/area', exact: true, component: FacilityArea },
    { path: '/facility-overview/area/:id', exact: true, component: FacilityAreaDetails },
    { path: '/facility-overview/manning', exact: true, component: FacilityManning },
    { path: '/facility-overview/process', exact: true, component: FacilityProcess },
    { path: '/accidents-hazards', exact: true, component: AccidentsHazard },
    { path: '/accidents-hazards/:id', exact: true, component: AccidentsHazardItem },
    { path: '/risk-assessment', exact: true, component: RiskAssessment },
    { path: '/risk-assessment/identification-worksheet', exact: true, component: HazardIdentifications },
    { path: '/risk-assessment/operability-worksheet', exact: true, component: HazardOperatability },
    { path: '/risk-assessment/rescue-analysis', exact: true, component: HazardAnalysis },
    { path: '/risk-assessment/survivability-analysis', exact: true, component: HazardEmergency },
    { path: '/risk-assessment/individual', exact: true, component: IndividualRisk },
    { path: '/risk-assessment/plant', exact: true, component: PlanRiskBreakDown },
    { path: '/risk-assessment/individual-edit-user', exact: true, component: IndividualRiskEditUser },
    { path: '/risk-assessment/location', exact: true, component: LocationRisk },
    { path: '/risk-assessment/societal', exact: true, component: SocietalRisk },
    { path: '/risk-assessment/:id', exact: true, component: RiskAssessmentDetail },
    { path: '/safety-critical', exact: true, component: CriticalElement },
    { path: '/safety-critical/equipment', exact: true, component: CriticalEquipment },
    { path: '/safety-critical/equipment/:type', exact: true, component: CriticalElementType },
    { path: '/safety-critical/equipment/:type/:id', exact: true, component: CriticalEquipmentItem },
    { path: '/safety-critical/personnel', exact: true, component: CriticalPersonnel },
    { path: '/safety-critical/procedure', exact: true, component: CriticalProcedure },
    { path: '/emergency-response', exact: true, component: EmergencyResponse },
    { path: '/emergency-response/tiers', exact: true, component: ResponseTiers },
    { path: '/emergency-response/organisation', exact: true, component: ResponseOrganisation },
    { path: '/emergency-response/plan', exact: true, component: ResponsePlan },
    { path: '/emergency-response/scenario', exact: true, component: ScenarioActionPlan },
    { path: '/safety-management', exact: true, component: SafetyManagement },
    { path: '/safety-management/:id', exact: true, component: SafetyManagementItem },
    { path: '/remedial-action', exact: true, component: RemedialAction },
    { path: '/writen-safety', exact: true, component: WrittenSafetyCase },
    { path: '/search', exact: true, component: SearchHeader },
    { path: '/search/:key', exact: true, component: SearchPage },
];

export const menus = [
    { title: 'Dashboard', icon: < HomeFilled />, exact: true, url: '#/' },
    {
        title: 'Facilities Overview',
        icon: < img src={facilityImg}
            alt="facility" />,
        url: '#/facility-overview',
        api: '/facility_overview',
        children: [
            { title: 'Area', exact: true, url: '#/facility-overview/area', api: '/facility-overview/area' },
            { title: 'Process', exact: true, url: '#/facility-overview/process', api: '/facility-overview/facilities_process' },
            { title: 'Manning', exact: true, url: '#/facility-overview/manning' , api: '/facility-overview/facility_manning'},
        ]
    },
    {
        title: 'Major Accident Hazards', icon: < img src={HazardsImg}
            alt="Major Accident Hazards" />, url: '#/accidents-hazards', api: '/major_accident_hazards'
    },
    {
        title: 'Risk Assessment',
        icon: < img src={RiskImg}
            alt="Major Accident Hazards"
            height={20}
        />,
        url: '#/risk-assessment',
        api: '/risk_assessment',
        childApi: '/risk_assessment_item',
        // children: [
        //     { title: 'Hazard Identification Worksheets', exact: true, url: '#/risk-assessment/identification-worksheet', api:'/identification_risk', titleKey:'identification_title' },
        //     { title: 'Hazard and Operability Worksheets', exact: true, url: '#/risk-assessment/operability-worksheet', api:'/identification_risk', titleKey:'operatability_title' },
        //     { title: 'Escape, Evacuation, Rescue Analysis', exact: true, url: '#/risk-assessment/rescue-analysis', api:'/identification_risk', titleKey:'escape_title' },
        //     { title: 'Emergency System Survivability Analysis', exact: true, url: '#/risk-assessment/survivability-analysis', api:'/identification_risk', titleKey:'emergency_title' },
        //     { title: 'Individual Risk', exact: true, url: '#/risk-assessment/individual', api:'/individual_risk' },
        //     { title: 'Plant Risk Breakdown', exact: true, url: '#/risk-assessment/plant', api:'/plant_risk' },
        //     { title: 'Location Risk', exact: true, url: '#/risk-assessment/location', api: '/location_risk' },
        //     { title: 'Societal Risk', exact: true, url: '#/risk-assessment/societal', api:'/societal_risk' },
        // ]
    },
    {
        title: 'Safety Critical Element',
        icon: < img src={safetCriticalImg} alt="Major Accident Hazards" height={20} />,
        url: '#/safety-critical',
        api: '/safetyCriticalElement',
        children: [
            { title: 'Safety Critical Equipment', exact: true, url: '#/safety-critical/equipment', api: '/criticalEquipment' },
            { title: 'Safety Critical Personnel', exact: true, url: '#/safety-critical/personnel', api: '/critical_personnel' },
            { title: 'Safety Critical Procedure', exact: true, url: '#/safety-critical/procedure', api: '/critical_procedure' },
        ]
    },
    {
        title: 'Emergency Response',
        icon: <img src={emergencyImg} alt='Emergency Response' height={20} />,
        url: '#/emergency-response',
        api: '/emergency_respons',
        children: [
            { title: 'Emergency Response Tiers', exact: true, url: '#/emergency-response/tiers', api: '/emergency_response_tiers'},
            { title: 'Emergency Response Organisation', exact: true, url: '#/emergency-response/organisation', api: '/emergency_response_organisation' },
            { title: 'Emergency Response Plan', exact: true, url: '#/emergency-response/plan', api: '/response_plan' },
            { title: 'Scenario Specific Action Plan', exact: true, url: '#/emergency-response/scenario', api: '/scenario_action' },
        ]
    },
    {
        title: 'Safety Management System',
        icon: < img src={managementImg} alt='Safety Management System' height={20} />,
        url: '#/safety-management',
        api: "/safety_management",
        childApi: '/safety_manage_commit',
    },
    {
        title: 'Remedial Action Plan',
        icon: <img src={remedialImg} alt='Remedial Action Plan' height={20} />,
        url: '#/remedial-action',
        api: "/remedial_action"
    },
    {
        title: 'Writen Safety Case',
        icon: <img src={WrittenImg} alt="Writen Safety Case" height={20} />,
        url: '#/writen-safety',
        api: "/written_safety_case"
    },
    //{ title: 'Users', icon: <UserGroupFilled />, url: '#/user' },
];

export async function getMenu() {
    for (var menu of menus) {
        if (menu.childApi) {
            var res = await ajax.get(menu.childApi, { count: -1 });
            // console.log(childrens);
            var childrens = res.data.map(v => ({ title: v.title, exact: true, url: menu.url + '/' + v.id, api: menu.childApi + '/' + v.id }));
            menu.children = childrens;
        }
        if (menu.children && menu.children.api) {
            var res = await ajax.get(menu.children.api, { count: -1 });
            var apiInchildrens = res.data.map(v => ({ title: v.title, exact: true, url: menu.url, api: menu.children.api }));
            menu.children = apiInchildrens; 
        }
    }
    return menus;
}


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