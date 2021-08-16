import React from 'react';
import { HazardPage } from '../component';


const Page = ({title,prefix}) => <HazardPage api="/identification_risk" title={title} imageName={prefix+'_image'} descName={prefix+'_desc'} />

export const HazardIdentifications = () => <Page title="Hazard Identification Worksheets" prefix="identification"/>
export const HazardOperatability = () => <Page title="Hazard Operability Worksheets" prefix="operatability" />
export const HazardAnalysis = () => <Page title="Escape, Evacuation, Rescue Analysis" prefix="escape" />
export const HazardEmergency = () => <Page title="Emergency System Survivability Analysis" prefix="emergency" />