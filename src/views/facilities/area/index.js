import { Input, Form } from 'antd';
import React from 'react';
import area from '../../../assets/area.png';
import { ListItems, PageTemplate } from '../../template';
import { TitleEdit } from '../../../utils';

export * from './details';

export const FacilityArea = () => {
    return <PageTemplate 
        iconUrl={area} 
        title="Facilities Overview" 
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Area", "subtitle")} 
        titleKey="subtitle"
        api="/facility_overview" 
        descName="area_desc"
        >
        {(content,editMode)=> <ListItems 
            api="/facility-overview/area" 
            editMode={editMode} 
            popupExtra={<div className='area--form'>
                <label>Name of Area</label>
                <Form.Item name="title"><Input /></Form.Item>
            </div>} 
        />}
    </PageTemplate>
}
