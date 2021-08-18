import { Row, Col, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import ajax from '../../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer } from '../../../utils';
import { PageTemplate } from './../../template';

export const SafetyManagementItem = ({match}) => {
    const { id } = match.params;
    return <PageTemplate
        backButton
        iconUrl={danger} 
        title="Safety Management System" 
        subtitle={(content) => content.title } 
        api={"/safety_manage_commit/"+id} 
        descName="desc"
        imageName="commitment_file"
        >
    </PageTemplate>
}

// export const SafetyManagementItem = ({match}) => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({});
//     const [form] = Form.useForm();
//     const { id } = match.params;
//     const api = '/safety_manage_commit/'+id;

//     async function saveData() {
//         var values = form.getFieldsValue();
//         if(values.commitment_file) values.commitment_file = values.commitment_file.file;
//         await ajax.post(api, values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }

//     useEffect(() => {
//         ajax.get(api).then(res => res && setContent(res));
//     }, []);
    
//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={17}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={danger} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5' >
//                             <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                 <div>
//                                 <p className='mb-0 '>Risk Assessment</p>
//                                 <h2 style={{ marginTop: 0 }}>{ content.title}</h2>
//                                 </div>
//                                 <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Form form={form}>
//                         <div className='box--facility area--box--facility'>
//                             <DescField editMode={editMode} value={content.desc} name='desc' />
//                         </div>
//                         {editMode && <ButtonUpload name="commitment_file" onSubmit={saveData} />}
//                     </Form>
//                     <h2>File uploaded</h2>
//                     <FileViewer images={content.commitment_file} />
//                 </Col>
//             </Row>
//         </div>
//     );
// }