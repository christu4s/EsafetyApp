import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import { PlusCircleOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import './index.css';
import ajax from '../../ajax';
import { ButtonUpload, DescField, EditButtons } from '../../utils';
import { Link } from 'react-router-dom';
import { getFormFields, PageTemplate } from './../template';

export * from './details';

export const SafetyManagement = ({history}) => {
    return <PageTemplate
        iconUrl={extinguisher}
        subtitle="Safety Management System"
        api="/safety_management"
        descName="safety_management_desc"
        imageName="safety_management_image"
        pdfName="safety_management_pdf"
    >{(content, editMode) => <SafetyBox editMode={editMode} history={history} />}
    </PageTemplate>
}
function SafetyBox({ editMode, history }) {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [now, setNow] = useState();
    const refresh = () => setNow(new Date());
    useEffect(() => { ajax.get('/safety_manage_commit').then(res => res && setData(res.data)); }, [now]);

    function submit() { 
        ajax.post('/safety_manage_commit',getFormFields(form)).then(res => { res && history.push('/safety-management/' + res.id) });
    }

    return <div className="management--wrapper">
        <div className='divider' style={{ marginBottom: 20 }}></div>
        {editMode && <Form form={form}><ButtonUpload name="commitment_file" onSubmit={submit}>
            <div className='area--form'>
                <label>Name of File</label>
                <Form.Item name="title"><Input /></Form.Item>
                <label>Add Description</label>
                <Form.Item name="desc"><Input.TextArea /></Form.Item>
            </div>
        </ButtonUpload></Form>}
        <Row gutter={24}>
            {data.map((v, i) => <Col key={i} span={12}>
                <Link to={'/safety-management/' + v.id}>
                    <div className="blue--box">
                        <h3>{v.title}</h3>
                        <p>{v.desc}</p>
                    </div>
                </Link>
            </Col>)}
        </Row>
    </div>
}


// export const SafetyManagement = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ safety_management_desc: '' });
//     const [form] = Form.useForm();
//     const [data, setData] = useState([]);
//     //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
//     useEffect(() => {
//         ajax.get('/safety_management').then(res => res && setContent(res));
//         ajax.get('/safety_manage_commit').then(res => res && setData(res.data));

//     }, []);
//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//     const props = {
//         beforeUpload: () => false,
//     };
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/safety_management', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }

//     function submit() {
//         var { title, desc, commitment_file } = form.getFieldsValue();
//         ajax.post('/safety_manage_commit', { title, desc, commitment_file: commitment_file ? commitment_file.file : null }).then(res => {
//             res && setData(res.data);
//         });
//     }
//     const { Meta } = Card;

//     return (
//         <div className='facility--wrapper management--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img' >
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header '>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2>Safety Management System</h2>
//                                     </div>
//                                     <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                     <Form form={form}>
//                                         <DescField editMode={editMode} value={content.safety_management_desc} name="safety_management_desc" />
//                                     </Form>
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <div className='divider' style={{ marginBottom: 20 }}></div>
//                         </Col>
//                     </Row>
//                     {editMode &&
//                         <Row className='addmore--button'>
//                             <Col>
//                                 <Button type="secondary" icon={<PlusCircleOutlined />} onClick={showModal}>
//                                     Add More
//                                 </Button>

//                                 <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form form={form}>
//                                         <Form.Item name="commitment_file">
//                                             <Dragger {...props}>
//                                                 <p className="ant-upload-drag-icon">
//                                                     <img width='50' src={computing} />
//                                                 </p>
//                                                 <p className="ant-upload-hint">
//                                                     Drag or drop your files here OR <span> browse </span>
//                                                 </p>
//                                             </Dragger>
//                                         </Form.Item>
//                                         <div className='area--form'>
//                                             <label>Name of File</label>
//                                             <Form.Item name="title">
//                                                 <Input />
//                                             </Form.Item>
//                                             <label>Add Description</label>
//                                             <Form.Item name="desc">
//                                                 <Input.TextArea />
//                                             </Form.Item>
//                                         </div>
//                                     </Form>

//                                     <Button type="primary" onClick={submit}>Create</Button>
//                                 </Modal>
//                             </Col>
//                         </Row>
//                     }

//                     <Row>
//                         <Col><h2 style={{ marginTop: 0, paddingTop: 0, fontSize: 18 }}>Management Commitment</h2>
//                         </Col>
//                     </Row>

//                     <Row gutter={24}>
//                         {data.map((v, i) => <Col key={i} span={12}>
//                             <Link to={'/safety-management/' + v.id}>
//                                 <div className="blue--box">
//                                     <h3>{v.title}</h3>
//                                     <p>{v.desc}</p>
//                                 </div>
//                             </Link>
//                         </Col>)}
//                     </Row>
//                 </Col>
//             </Row>
//         </div>
//     );
// }