import { Row, Col, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { FacilitiesButtons } from './components';
import ajax from '../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer } from '../../utils';
import { PageTemplate } from '../template';


export const Facilities = () => {
    return <PageTemplate subtitle="Facilities Overview" api="/facility_overview" descName="description" imageName="image" pdfName="pdf"/>
}


// export const Facilities = () => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({description: '', image: ''});
//     const [form] = Form.useForm();

//     useEffect(()=> { ajax.get('/facility_overview').then(res => res && setContent(res) ); },[]);
    
//     async function  saveData(){
//         var {description, image} = form.getFieldsValue();
//         await ajax.post('/facility_overview', {description, image: image ? image.file : null}).then(res => res && setContent(res) );
//         setEditMode(!editMode);
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <div style={{display:'flex', justifyContent: 'space-between'}}>
//                         <h2>Facilities Overview</h2>
//                         <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
//                     </div>
//                     <Form form={form}>
//                         <div className='box--facility'>
//                             <DescField editMode={editMode} value={content.description} name="description" />
//                         </div>
//                         {editMode && <ButtonUpload name='image' onSubmit={saveData} />}
//                     </Form>
//                     <h2>File uploaded</h2>
//                     <FileViewer images={content.image} />
//                 </Col>
//                 <Col span={8} push={2}  style={{marginTop:35}} >
//                     <Row>
//                         <FacilitiesButtons />
//                     </Row>
//                 </Col>
//             </Row>
//         </div>
//     );
// }