import React, { useState } from 'react';
import danger from '../../assets/danger-sing@3x.png';
import { PageTemplate } from '../template';
import { TitleEdit } from '../../utils';
import * as riskUtil from './utils';

export const RiskAssessmentDetail = ({match}) => {
    const {id} = match.params;

    return <PageTemplate 
        updateData={id}
        iconUrl={danger} 
        title="Risk Assessment" 
        updateMenu
        subtitle={TitleEdit} 
        api={"/risk_assessment_item/" + id} 
        descName="desc"
        imageName="image"
        videoName="video"
        pdfName="pdf"
        tableName="table_detail"
        outside= {(content, editMode, form) => content.component && riskUtil[content.component] && React.createElement(riskUtil[content.component], {content,editMode,form}, null)}
    />
}
