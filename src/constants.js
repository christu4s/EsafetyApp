// function readCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

export const requiredRule = {required:true, message: 'Field is required' };

export const isAdmin = canEdit; // eslint-disable-line
export const userName = name; // eslint-disable-line

export const criticalEquipments = [
    { title: "Prevention", type: "prevention", api: '/criticalEquipmentPrevention', itemApi: '/procedure_addSCE', imageKey:'add_sce'},
    { title: "Detection", type: "detection", api: '/detection', itemApi: '/detection_add_sce', imageKey:'add_sce' },
    { title: "Control", type: "control", api: '/control', itemApi: '/control_add_sce', imageKey:'add_sce' },
    { title: "Mitigation", type: "mitigation", api: '/mitigation', itemApi: '/mitigation_add_sce', imageKey:'add_sce' },
    { title: "Emergency Response", type: "emergencyResponse", api: '/equipment_emergency_response', itemApi: '/response_add_sce', imageKey:'add_sce'},
    { title: "Incident", type: "incident", api: '/incident', itemApi: '/incident_add_sce', imageKey:'add_sce'},
];