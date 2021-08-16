import React from 'react';
import { PageTemplate } from '../template';


export const Facilities = () => {
    return <PageTemplate subtitle="Facilities Overview" api="/facility_overview" descName="description" imageName="image" pdfName="pdf"/>
}