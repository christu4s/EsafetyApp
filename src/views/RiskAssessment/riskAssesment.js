import React from 'react';

import individualImage from '../../assets/riskAssessment/individual.png';
import locationImage from '../../assets/riskAssessment/location.png';
import operatablityImage from '../../assets/riskAssessment/operatablity.png';
import plantImage from '../../assets/riskAssessment/plant.png';
import societalImage from '../../assets/riskAssessment/societal.png';
import emergencyImage from '../../assets/riskAssessment/emergency.png';
import escapeImage from '../../assets/riskAssessment/escape.png';
import identificationImage from '../../assets/riskAssessment/identification.png';


import danger from '../../assets/danger-sing@3x.png';

import { ListItems, PageTemplate } from '../template';

export const RiskAssessment = () => {
    const subpages = [
        { title: 'Hazard Identification Worksheets',  url: '/risk-assessment/identification-worksheet', image: identificationImage },
        { title: 'Hazard and Operability Worksheets',  url: '/risk-assessment/operability-worksheet', image: operatablityImage },
        { title: 'Escape, Evacuation, Rescue Analysis',  url: '/risk-assessment/rescue-analysis', image: escapeImage },
        { title: 'Emergency System Survivability Analysis',  url: '/risk-assessment/survivability-analysis', image: emergencyImage },
        { title: 'Individual Risk',  url: '/risk-assessment/individual', image: individualImage },
        { title: 'Plant Risk Breakdown',  url: '/risk-assessment/plant', image: plantImage },
        { title: 'Location Risk',  url: '/risk-assessment/location', image: locationImage },
        { title: 'Societal Risk',  url: '/risk-assessment/societal', image: societalImage }
    ]
    return <PageTemplate 
        iconUrl={danger} 
        // title="Facilities Overview" 
        subtitle="Risk Assessment" 
        api="/risk_assessment" 
        descName="area_desc"
        >
        <ListItems list={subpages} />
    </PageTemplate>
}
