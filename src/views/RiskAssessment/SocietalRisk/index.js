import { Row, Col, Card , Button , Modal , Upload, message , Input , Form, Checkbox, Table , Select, Space } from 'antd';
import React, { useState } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined,  CloudUploadOutlined , ArrowLeftOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import { EditableTable, SocietalTable } from './components/societalTable';
import { PageTemplate } from './../../template';
import { TitleEdit } from '../../../utils';

export const SocietalRisk = () => {
    return <PageTemplate 
        iconUrl={danger} 
        title="Risk Assessment" 
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Societal Risk")} 
        api="/societal_risk" 
        descName="societal_desc"
        imageName="societal_image"
        pdfName="societal_pdf"
        >
    </PageTemplate>
}
// export const SocietalRisk = () => {
//     let history = useHistory();
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isTableModalVisible, setIsTableModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    
//     const showModal = () => {
//         setIsModalVisible(true);
//     };
//     const showModalTable = () => {
//         setIsTableModalVisible(true);
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };


//     const handleTableOk = () => {
//         setIsTableModalVisible(false);
//     };

//     const handleTableCancel = () => {
//         setIsTableModalVisible(false);
//     };

  
//         const onFinish = (values) => {
//           console.log('Success:', values);
//           history.push('/risk-assessment/individual-edit-user');
//         };
      
//         const onFinishFailed = (errorInfo) => {
//           console.log('Failed:', errorInfo);
//         };

      
//         const props = {
//             name: 'file',
//             multiple: true,
//             action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//             onChange(info) {
//                 const { status } = info.file;
//                 if (status !== 'uploading') {
//                     console.log(info.file, info.fileList);
//                 }
//                 if (status === 'done') {
//                     message.success(`${info.file.name} file uploaded successfully.`);
//                     console.log(info.fileList );
//                 } else if (status === 'error') {
//                     message.error(`${info.file.name} file upload failed.`);
//                 }
//             },
//             onDrop(e) {
//                 console.log('Dropped files', e.dataTransfer.files);
//             },
//         };


//     const { Meta } = Card;
    
//     return (
//         <div className='facility--wrapper location--wrapper'>
//             <Row>
//                 <Col span={24}>

//                    <Row>
//                        <Col span={16}>
//                         <Row>
//                             <Col span={1}>
//                                 <div className=''>
//                                 <ArrowLeftOutlined />
//                                 </div>
//                             </Col>
//                             <Col span={23}>
//                                 <div className=''>
//                                     <p>Back
//     </p>
//                                 </div>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col span={1}>
//                                 <div className='area--img'>
//                                     <img width='38' src={danger} />
//                                 </div>
//                             </Col>
//                             <Col span={23}>
//                                 <div className='area--header' >
//                             <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                 <div>
//                                     <p>Risk Assessment</p>
//                                     <h2 >Societal Risk</h2>
//                                 </div>
//                                 <div>
//                             {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
//                             <Space>
//                                 <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
//                                 <Button type="primary" size="small" success onClick={()=> setEditMode(!editMode) }>Save</Button>
//                             </Space>}
//                         </div>
//                                 </div>
//                             </div>
//                             </Col>
//                         </Row>
//                        </Col>
//                    </Row>

//                    <Row>
//                        <Col span={24}>
//                         <Row>
//                                 <Col span={16}>
//                                     <div className='box--facility area--box--facility'>
//                                         <p>
//                                             {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>}
//                                         </p>
//                                     </div>
//                                 </Col>
//                             </Row>
//                        </Col>
//                    </Row>

//                    <Row style={{marginTop:20}}>
//                        <Col span={24}>
//                             <div className=''>
//                             <Button type="secondary" icon={<PlusCircleOutlined />}  onClick={showModalTable}>
//                                 Create Table 
//                             </Button>

//                             <Modal title="" className='upload--modal' visible={isTableModalVisible} onOk={handleTableOk} onCancel={handleTableCancel}>
//                                 <h3 className='modal--title text-center'>Create Table</h3>
//                                 <Form.Item label="" style={{marginTop:30}}>
//                                 <Select>
//                                     <Select.Option value="demo">Demo</Select.Option>
//                                 </Select>
//                                 </Form.Item>
//                                 <Form.Item label="" style={{height:20}}>
//                                 <Select >
//                                     <Select.Option value="demo">Demo</Select.Option>
//                                 </Select>
//                                 </Form.Item>
//                                     <div style={{textAlign:'right'}}>
//                                     <Button type="primary" >
//                                         Save
//                                 </Button>
//                                     </div>
//                             </Modal>

//                             </div>
//                        </Col>
//                    </Row>

//                    <Row>
//                        <Col span={24}>
//                             <div className=''>
//                                 <SocietalTable></SocietalTable>
//                             </div>
//                        </Col>
//                    </Row>

//                    <Row>
//                         <Col span={24}>
//                             <div className='divider'></div>
//                         </Col>
//                     </Row>
//                    <Row>
//                        <Col span={16}>

//                        {editMode && 
//                        <Row>
//                         <Col span={6}>
//                             <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
//                                 Upload Image
//                             </Button>
//                             <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                 <h3 className='modal--title text-center'>Upload Files</h3>
//                                 <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                 <Dragger {...props}>
//                                 <p className="ant-upload-drag-icon">
//                                     <img width='50' src={computing} />
//                                 </p>
//                                 <p className="ant-upload-hint">
//                                     Drag or drop your files here OR <span> browse </span>
//                                 </p>
//                             </Dragger>,
//                                 <Button type="primary" icon={<CloudUploadOutlined />}>
//                                         Upload Image
//                                 </Button>
//                             </Modal>
//                             </Col>
//                             <Col span={12}>
//                                 <h4>File size not more than 2 MB</h4>
//                             </Col>
//                         </Row>
//                         }

//                        </Col>
//                    </Row>

                 

                  

//                     <Row>
//                         <Col span={12}>
//                             <h2>File uploaded</h2>
//                         </Col>
//                         <Col span={12}>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={16}>
//                             <img width='100%' src= {image} />
//                         </Col>
//                     </Row>

                 



                   
//                 </Col>
//             </Row>


//         </div>
//     );
// }