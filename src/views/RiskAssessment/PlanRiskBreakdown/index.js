import { Row, Col, Card, Button, Modal, Upload, message, Input, Form, Checkbox, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import ajax from '../../../ajax';
import { PageTemplate } from '../../template';

export const PlanRiskBreakDown = () => {
    return <PageTemplate
        iconUrl={danger}
        title="Risk Assessment"
        subtitle="Plant Risk Breakdown"
        api="/plant_risk"
        descName="plant_desc"
        imageName="plant_image"
        pdfName="plant_pdf"
        outside={(content, editMode, form) => <PlantGraph content={content} editMode={editMode} form={form} />}
    >
    </PageTemplate>
}

function PlantGraph({ content, editMode, form }) {
    const [form2] = Form.useForm();
    const onFinish = (value) => {
        console.log(form2.getFieldsValue(), value);
    };



    return <Row>
        <Col span={16}>
            <h2>Pie Chart</h2>
            <div className='bg-white-box form-holder-risk'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua.
                </p>
                <Form name="form" form={form2} onFinish={onFinish}>
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => {
                                    console.log(key, name, fieldKey, restField);
                                    return <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'key']}
                                            fieldKey={[fieldKey, 'key']}
                                            rules={[{ required: true, message: 'Missing Risk' }]}
                                            label="Risk"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            fieldKey={[fieldKey, 'value']}
                                            rules={[{ required: true, message: 'Missing Value' }]}
                                            label="Value"
                                        >
                                            <Input  />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                })}
                                <Row justify="space-between">
                                    <Col span={12}><Button type="link" onClick={() => add()}  icon={<PlusOutlined />}>Add field</Button></Col>
                                    <Col span={12}><div style={{textAlign:'right'}}><Button onClick={()=> form2.submit()} size="small" type="primary">Proceed</Button></div></Col>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </Col>
        <Col span={8} push={1}>
        </Col>
    </Row>;
}

// import './index.css';
// import { PageTemplate } from './../../template';
// export const PlanRiskBreakDown = () => {
//     let history = useHistory();
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ plant_desc: '', plant_image: '' });
//     const [data, setData] = useState([]);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         ajax.get('/plant_risk').then(res => res && setContent(res));
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
//         const onFinish = (values) => {
//           console.log('Success:', values);
//           history.push('/risk-assessment/edit-plan');
//         };

//         const onFinishFailed = (errorInfo) => {
//           console.log('Failed:', errorInfo);
//         };      

//     const { Meta } = Card;

//     const props = {
//         beforeUpload: () => false,
//     };

//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/plant_risk', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>

//                     <Row>
//                         <Col span={1}>
//                             <div className=''>
//                             <ArrowLeftOutlined />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className=''>
//                                 <p>Back
// </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={danger} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header' >
//                             <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                 <div>
//                                     <p>Risk Assessment</p>
//                                     <h2 >Plant Risk Breakdown</h2>
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

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                 {editMode ? <Form.Item name="plant_desc"><Input.TextArea defaultValue={content.plant_desc} /></Form.Item> : <p>{content.plant_desc}</p>}
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     {editMode && 
//                     <Row>
//                     <Col span={6}>
//                         <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
//                             Upload Image
//                         </Button>
//                         <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                             <h3 className='modal--title text-center'>Upload Files</h3>
//                             <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                             <Dragger {...props}>
//                                 <p className="ant-upload-drag-icon">
//                                     <img width='50' src={computing} />
//                                 </p>
//                                 <p className="ant-upload-hint">
//                                     Drag or drop your files here OR <span> browse </span>
//                                 </p>
//                             </Dragger>,
//                             <Button type="primary" icon={<CloudUploadOutlined />}>
//                                     Upload Image
//                             </Button>
//                         </Modal>
//                         </Col>
//                         <Col span={12}>
//                             <h4>File size not more than 2 MB</h4>
//                         </Col>
//                     </Row>                    
//                     }

//                     <Row>
//                         <Col span={12}>
//                             <h2>File uploaded</h2>
//                         </Col>
//                         <Col span={12}>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={24}>
//                             <img width='100%' src= {image} />
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={24}>
//                             <div className='divider'></div>
//                         </Col>
//                     </Row>




//                     <Row>
//                         <Col span={24}>
//                             <h2>Pie Chart</h2>
//                             <div className='bg-white-box form-holder-risk'>
//                                 <p>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//                                     ut labore et dolore magna aliqua.
//                                 </p>

//                                 <Form
//                                 name="basic"
//                                 labelCol={{
//                                     span: 4,
//                                 }}
//                                 wrapperCol={{
//                                     span: 20,
//                                 }}
//                                 initialValues={{
//                                     remember: true,
//                                 }}
//                                 onFinish={onFinish}
//                                 onFinishFailed={onFinishFailed}
//                                 >
//                                 <Form.Item
//                                     label="Risk"
//                                     name="Risk"


//                                 >
//                                     <Input  placeholder="Type Risk" />
//                                 </Form.Item>

//                                 <Form.Item
//                                     label="Value"
//                                     name="Value"

//                                 >
//                                     <Input  placeholder="Type Value" />
//                                 </Form.Item>

//                                 <Form.Item
//                                     label="Percentage"
//                                     name="Percentage"

//                                 >
//                                     <Input   placeholder="Type Percentage"  />
//                                 </Form.Item>



//                                 <Form.Item
//                                  wrapperCol={{
//                                     offset: 4,
//                                     span: 20,
//                                     }}
//                                 >
//                                 <Button type="default"  block icon={<PlusCircleOutlined />}>
//                                     Add more 
//                                 </Button>
//                                 </Form.Item>

//                                 <Form.Item
//                                     wrapperCol={{
//                                     offset: 20,
//                                     span: 4,
//                                     }}
//                                 >
//                                     <Button  type="primary" htmlType="submit">
//                                         Proceed
//                                     </Button>
//                                 </Form.Item>
//                                 </Form>

//                             </div>
//                         </Col>

//                     </Row>

//                 </Col>
//             </Row>


//         </div>
//     );
// }