import { Row, Col,  Button , Modal , Upload, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import process from '../../../assets/process@3x.png';
import { CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import {  FacilitiesButtons } from '../components';
import ajax from '../../../ajax';
import { ButtonUpload, FileViewer } from '../../../utils';
import { PageTemplate } from '../../template';

export const FacilityProcess = () => {
    return <PageTemplate 
        iconUrl={process} 
        title="Facilities Overview" 
        subtitle="Process" 
        api="/facilities_process" 
        descName="process_desc" 
        imageName="process_image" 
        // pdfName="process_pdf"
        right={<FacilitiesButtons />}
    />
}

// export const FacilityProcess = () => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ process_desc: '', process_image: '' });
//     const [form] = Form.useForm();
//     // const [now, setNow] = useState();
//     // const refresh = () => setNow(new Date());
    
//     useEffect(() => {
//         ajax.get('/facilities_process').then(res => res && setContent(res));
//     }, []);

//     async function saveData() {
//         var { process_desc = '', process_image } = form.getFieldsValue();
//         await ajax.post('/facilities_process', {
//             process_desc: process_desc ? process_desc : null,
//             process_image: process_image ? process_image.file : null,
//         }).then(res =>{ 
//             console.log(res);
//             res && setContent(res);
//             setEditMode(!editMode);
//         });
//     }
    
//     console.log(content);

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={process} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header'>
//                                 <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                 <div>
//                                 <p>Facilities Overview</p>
//                                 <h2>Process</h2>
//                                 </div>
                                
//                                 <div>
//                             {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
//                             <Space>
//                                 <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
//                                 <Button type="primary" size="small" success onClick={saveData}>Save</Button>
//                             </Space>}
//                         </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Form form={form}>
//                     <div className='box--facility area--box--facility'>
//                         {editMode ? <Form.Item initialValue={content.process_desc} name="process_desc"><Input.TextArea /></Form.Item> : <p>{content.process_desc}</p>}
//                     </div>
//                     {editMode && <ButtonUpload name='process_image' onSubmit={saveData} />}
//                     </Form>
//                     <h2 style={{marginTop:30}}>File uploaded</h2>
//                     <FileViewer images={content.process_image} />
//                 </Col>
//                 <Col span={8} push={2} style={{ marginTop: 35 }} ><FacilitiesButtons /></Col>
//             </Row>


//         </div>
//     );
// }