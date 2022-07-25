import React from 'react';
import process from '../../../assets/process@3x.png';
import {  FacilitiesButtons } from '../components';
import { PageTemplate } from '../../template';
import { SubTitleEdit } from '../../../utils';

export const FacilityProcess = () => {
    return <PageTemplate 
        iconUrl={process} 
        title="Facilities Overview" 
        updateMenu
        subtitle={(content,editMode)=> SubTitleEdit(content,editMode,"Process")} 
        api="/facilities_process" 
        descName="process_desc" 
        imageName="process_image" 
        pdfName="process_pdf"
        videoName="process_video"
    />
}