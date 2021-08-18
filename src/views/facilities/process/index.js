import React from 'react';
import process from '../../../assets/process@3x.png';
import {  FacilitiesButtons } from '../components';
import { PageTemplate } from '../../template';

export const FacilityProcess = () => {
    return <PageTemplate 
        iconUrl={process} 
        title="Facilities Overview" 
        subtitle="Process" 
        api="/facilities_process" 
        descName="process_desc" 
        imageName="process_image" 
        pdfName="process_pdf"
        right={<FacilitiesButtons />}
    />
}