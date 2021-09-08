import React, { useState } from 'react';
import danger from '../../assets/danger-sing@3x.png';
import { PageTemplate } from '../template';
import { TitleEdit } from '../../utils';

export const RiskAssessmentDetail = ({match}) => {
    const {id} = match.params;
    
    return <PageTemplate 
        iconUrl={danger} 
        title="Risk Assessment" 
        updateMenu
        subtitle={TitleEdit} 
        api={"/risk_assessment_item/" + id} 
        descName="desc"
        imageName="image"
        pdfName="pdf"
    >
    </PageTemplate>
}
