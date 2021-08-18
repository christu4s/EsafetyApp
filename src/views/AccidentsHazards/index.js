import { Form, Input } from 'antd';
import React from 'react';
import fire from '../../assets/fire@3x.png';
import { ListItems, PageTemplate } from '../template';


export * from './details';

export const AccidentsHazard = () => {
    return <PageTemplate 
        iconUrl={fire} 
        title=" " 
        subtitle="Major Accident Hazards" 
        api="/major_accident_hazards" 
        descName="mah_desc"
        imageName="mah_image"
        pdfName="mah_pdf"
        >{(content,editMode)=> <ListItems 
            api="/major_accident_hazards_item" 
            editMode={editMode} 
            popupExtra={<div className='area--form'>
                <label>Name of Hazard</label>
                <Form.Item name="title"><Input /></Form.Item>
            </div>} 
        />}
    </PageTemplate>
}