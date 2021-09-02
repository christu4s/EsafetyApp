import React from 'react';
import { HazardPage } from '../component';
import danger from '../../../assets/danger-sing@3x.png';
import { PageTemplate } from '../../template';
import { TitleEdit } from '../../../utils';


const Page = ({title,prefix}) => <PageTemplate 
        api="/identification_risk" 
        iconUrl={danger} 
        updateMenu
        titleKey={prefix+'_title'} 
        title="Risk Assessment" 
        subtitle={(content,editMode)=> TitleEdit(content,editMode,title,prefix+'_title')}
        imageName={prefix+'_image'} 
        pdfName={prefix+'_image'} 
        descName={prefix+'_desc'} 
    />

export const HazardIdentifications = () => <Page title="Hazard Identification Worksheets" prefix="identification"/>
export const HazardOperatability = () => <Page title="Hazard Operability Worksheets" prefix="operatability" />
export const HazardAnalysis = () => <Page title="Escape, Evacuation, Rescue Analysis" prefix="escape" />
export const HazardEmergency = () => <Page title="Emergency System Survivability Analysis" prefix="emergency" />

// export const HazardIdentifications = () => <PageTemplate 
//         iconUrl={danger}    
//         subtitle="Risk Assessment" 
//         api="/risk_assessment" 
//         descName="area_desc"
//     />