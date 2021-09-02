import { Form, Input } from 'antd';
import React from 'react';
import area from '../../../../assets/area.png';
import { TitleEdit } from '../../../../utils';
import { PageTemplate } from '../../../template';

export const FacilityAreaDetails = ({match}) => {
    const {id}= match.params;
    return <PageTemplate 
        canDelete
        iconUrl={area} 
        title="Facilities Overview" 
        subtitle={TitleEdit} 
        api={'/facility-overview/area/'+ id} 
        descName="desc"
        imageName="image"
        pdfName="pdf"
    />
}