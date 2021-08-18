import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Upload,
  message,
  Input,
  Space,
  Form,
} from "antd";
import React, { useState, useEffect } from "react";
import extinguisher from "../../assets/fire-extinguisher@3x.png";

import imageTiers from "../../assets/tiers.png";
import imageResponseOrg from "../../assets/responseOrg.png";
import imageResponsePlan from "../../assets/fire-alarm.png";
import imageActionPlan from "../../assets/ActionPlan.png";
import { PlusCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
import computing from "../../assets/cloud-computing@3x.png";
import ajax from "../../ajax";
import { Link } from "react-router-dom";
import { ListItems, PageTemplate } from "./../template";

export const EmergencyResponse = () => {
  const subpages = [
    {
      title: "Response Tiers",
      url: "/emergency-response/tiers",
      image: imageTiers,
    },
    {
      title: "Response Organisation",
      url: "/emergency-response/organisation",
      image: imageResponseOrg,
    },
    {
      title: "Response Plan",
      url: "/emergency-response/plan",
      image: imageResponsePlan,
    },
    {
      title: "Scenario Specific Action Plan",
      url: "/emergency-response/scenario",
      image: imageActionPlan,
    },
  ];

  return (
    <PageTemplate
      iconUrl={extinguisher}
      subtitle="Emergency Response"
      api="/emergency_respons"
      descName="response_desc"
      // imageName="individual_image"
    > <ListItems list={subpages} countInRow={4} />
    </PageTemplate>
  );
};

// export const EmergencyResponse = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ response_desc: '' });
//     const [form] = Form.useForm();

//     useEffect(() => {
//         ajax.get('/emergency_respons').then(res => res && setContent(res));
//         //ajax.get('/writen-safety').then(res => res && setTableData(res.data));
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
//         name: 'file',
//         multiple: true,
//         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//         onChange(info) {
//             const { status } = info.file;
//             if (status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully.`);
//                 console.log(info.fileList);
//             } else if (status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//         onDrop(e) {
//             console.log('Dropped files', e.dataTransfer.files);
//         },
//     };
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/emergency_respons', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }
//     const { Meta } = Card;
//     const subpages = [
//         { title: 'Response Tiers', url: '/emergency-response/tiers', image: imageTiers },
//         { title: 'Response Organisation', url: '/emergency-response/organisation', image: imageResponseOrg },
//         { title: 'Response Plan', url: '/emergency-response/plan', image: imageResponsePlan },
//         { title: 'Scenario Specific Action Plan', url: '/emergency-response/scenario', image: imageActionPlan },

//     ]
//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header '>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2>Emergency Response</h2>
//                                     </div>

//                                     <div>
//                                         {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
//                                             <Space>
//                                                 <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
//                                                 <Button type="primary" size="small" onClick={saveData}>Save</Button>
//                                             </Space>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                     <Form form={form}>
//                                         {editMode ? <Form.Item name="response_desc"><Input.TextArea defaultValue={content.response_desc} /></Form.Item> : <p>{content.response_desc}</p>}
//                                     </Form>
//                                     {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. */}
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         {subpages.map((page, i) => <Col key={i} span={8}>
//                             <Link to={page.url}>
//                                 <Card className='custom--card' hoverable cover={<img alt="example" src={page.image} />}>
//                                     <Meta title={page.title} />
//                                 </Card>
//                             </Link>
//                         </Col>)}
//                     </Row>

//                     <Row className='addmore--button'>
//                         <Col>

//                             <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                 <h3 className='modal--title text-center'>Upload Files</h3>
//                                 <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                 <Dragger {...props}>
//                                     <p className="ant-upload-drag-icon">
//                                         <img width='50' src={computing} />
//                                     </p>

//                                     <p className="ant-upload-hint">
//                                         Drag or drop your files here OR <span> browse </span>
//                                     </p>
//                                 </Dragger>,
//                                 <div className='area--form'>
//                                     <label>Name of Area</label>
//                                     <Input placeholder="Lorem ipsum dolor sit amet" />
//                                 </div>

//                                 <Button type="primary" icon={<CloudUploadOutlined />}>
//                                     Upload Image
//                                 </Button>
//                             </Modal>
//                         </Col>
//                     </Row>
//                 </Col>

//             </Row>

//         </div>
//     );
// }
