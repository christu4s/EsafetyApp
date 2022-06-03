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
import { TitleEdit } from '../../utils';
import { Form, Input } from 'antd';

export const RiskAssessment = () => {
    return <PageTemplate 
        iconUrl={danger} 
        updateMenu 
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Risk Assessment")} 
        api="/risk_assessment" 
        descName="risk_desc"
        >
        {(content, editMode)=>  <ListItems 
            api="/risk_assessment_item"  
            editMode={editMode}
            popupExtra={<div className='area--form'>
                <label>Name of Risk Assessment</label>
                <Form.Item name="title"><Input /></Form.Item>
            </div>} 
        />}
    </PageTemplate>
}
