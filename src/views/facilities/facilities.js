import React from 'react';
import { TitleEdit } from '../../utils';
import { PageTemplate } from '../template';
import area from '../../assets/area.png';


export const Facilities = () => {
    return <PageTemplate 
        iconUrl={area}
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Facilities Overview")} 
        api="/facility_overview" 
        descName="description" 
        imageName="image" 
        pdfName="pdf"
        videoName="video"
        />
}