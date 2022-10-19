import React, { useState } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import { PageTemplate } from './../../template';
import { TitleEdit } from '../../../utils';

export const SocietalRisk = () => {
    return <PageTemplate 
        iconUrl={danger} 
        title="Risk Assessment" 
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Societal Risk")} 
        api="/societal_risk" 
        descName="societal_desc"
        imageName="societal_image"
        pdfName="societal_pdf"
        clickableName="clickable_image"
        >
    </PageTemplate>
}
