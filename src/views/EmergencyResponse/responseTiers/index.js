import { Row, Col, Card, Button, Modal, Upload, Input, Form, Space, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/06107-f-28-fig-3@3x.png';
import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';
import { PageTemplate } from './../../template';
import { TitleEdit } from '../../../utils';

export const ResponseTiers = () => {
    return <PageTemplate
        iconUrl={extinguisher}
        title="Emergency Response"
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Emergency Response Tiers")} 
        api="/emergency_response_tiers"
        descName="tiers_desc"
        imageName="tiers_image"
        pdfName="tiers_pdf"
        videoName="tiers_video"
        tableName="table_detail"
    >{(content, editMode, form) => <TableTiers content={content} editMode={editMode} form={form} />}
    </PageTemplate>
}

function TableTiers({ content, editMode, form }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            var res = JSON.parse(content.levels.replace(/\\/g, ''));
            setData(res);
        } catch (e) { }
    }, [content.levels]);

    useEffect(() => { form.setFieldsValue({ levels: JSON.stringify(data) }) }, [data]);


    function removeLevel(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function onLevelChange(index, key, value) {
        data[index][key] = value;
        setData([...data]);
    }
    function addmore() { setData([...data, {}]); }

    return <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
        <Form.Item hidden name="levels"><Input /></Form.Item>
        <Row gutter={20}>
            <Col span={5}>
                <h3>Emergency Response Tier</h3>
            </Col>
            <Col span={8} push={3}>
                <h3>Definition</h3>
            </Col>
            <Col span={8} push={2}>
                <h3>Team Activation</h3>
            </Col>
        </Row>
        <hr />
        {data.map((level, index) => <>
            <Row gutter={16}>
                <Col span={6}>
                    <Input placeholder="1" readOnly={!editMode} value={level.level} onChange={e => onLevelChange(index, 'level', e.target.value)} />
                </Col>
                <Col span={8}>
                    <Input placeholder="1" readOnly={!editMode} value={level.definition} onChange={e => onLevelChange(index, 'definition', e.target.value)} />
                </Col>
                <Col span={8}>
                    <Input placeholder="10" readOnly={!editMode} value={level.team_activation} onChange={e => onLevelChange(index, 'team_activation', e.target.value)} />
                </Col>
                <Col span={2}>
                    {editMode &&
                        <Popconfirm title="Are you sure to delete this level?" onConfirm={() => removeLevel(index)}>
                            <Button type="link" icon={<DeleteOutlined danger />} />
                        </Popconfirm>
                    }
                </Col>
            </Row>
            <hr />
        </>)}
        {editMode &&
            <Row className='addmore--button'>
                <Col>
                    <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
                        Add More
                    </Button>
                </Col>
            </Row>
        }
    </div>
}


// export const ResponseTiers = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ tiers_desc: '', tiers_image: '' });
//     const [levels, setLevels] = useState([]);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         ajax.get('/emergency_response_tiers').then(res => res && setData(res));
//     }, []);
//     const showModal = () => { setIsModalVisible(true); };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const props = { beforeUpload: () => false, };

//     function setData(res) {
//         setContent(res);
//         try {
//             var lvl = JSON.parse(res.levels.replace(/\\/g, ''));
//             setLevels(lvl);
//         } catch (e) { }
//     }

//     async function saveData() {
//         var { tiers_desc = '', tiers_image } = form.getFieldsValue();
//         await ajax.post('/emergency_response_tiers', {
//             tiers_desc: tiers_desc ? tiers_desc : null,
//             tiers_image: tiers_image ? tiers_image.file : null,
//             levels: JSON.stringify(levels)
//         }).then(res => res && setData(res));
//         setEditMode(!editMode);
//         setIsModalVisible(false);
//     }
//     const { Meta } = Card;

//     function addmore() { setLevels([...levels, {}]); }
//     function removeLevel(index) {
//         levels.splice(index, 1);
//         setLevels([...levels]);
//     }

//     function onLevelChange(index, key, value) {
//         levels[index][key] = value;
//         setLevels([...levels]);
//     }


//     return (
//         <div className='facility--wrapper'>

//             <Link to='/emergency-response' style={{ color: '#282828' }}>
//                 <Row>
//                     <Col span={1}>
//                         <div className=''>
//                             <ArrowLeftOutlined />
//                         </div>
//                     </Col>
//                     <Col span={23}>
//                         <div className=''>
//                             <p>Back
//                             </p>
//                         </div>
//                     </Col>
//                 </Row>

//             </Link>


//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 25 }}>Emergency Response Tiers</h2>
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
//                             <Form form={form}>
//                                 <div className='box--facility area--box--facility'>
//                                     <p>{editMode ? <Form.Item name="tiers_desc"><Input.TextArea defaultValue={content.tiers_desc} /></Form.Item>
//                                         : <p>{content.tiers_desc}</p>}</p>
//                                 </div>
//                                 <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form.Item name="tiers_image">
//                                         <Dragger {...props}>
//                                             <p className="ant-upload-drag-icon">
//                                                 <img width='50' src={computing} />
//                                             </p>
//                                             <p className="ant-upload-hint">
//                                                 Drag or drop your files here OR <span> browse </span>
//                                             </p>
//                                         </Dragger>
//                                     </Form.Item>
//                                     <Button type="primary" onClick={saveData}>Upload Image</Button>
//                                 </Modal>
//                             </Form>
//                         </Col>
//                     </Row>
//                     {editMode &&
//                         <Row>
//                             <Col span={6}>
//                                 <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
//                                     Upload Image
//                                 </Button>
//                             </Col>
//                             <Col span={12}>
//                                 <h4>File size not more than 2 MB</h4>
//                             </Col>
//                         </Row>
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
//                             <img width='100%' src={content.tiers_image ? content.tiers_image[0].src : image} />
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={24}>
//                             <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
//                                 <Row gutter={20}>
//                                     <Col span={5}>
//                                         <h3>Emergency Response Tier</h3>
//                                     </Col>
//                                     <Col span={8} push={3}>
//                                         <h3>Definition</h3>
//                                     </Col>
//                                     <Col span={8} push={2}>
//                                         <h3>Team Activation</h3>
//                                     </Col>
//                                 </Row>
//                                 <hr />
//                                 {levels.map((level, index) => <>
//                                     <Row gutter={16}>
//                                         <Col span={6}>
//                                             <Input placeholder="1" readOnly={!editMode} value={level.level} onChange={e => onLevelChange(index, 'level', e.target.value)} />
//                                         </Col>
//                                         <Col span={8}>
//                                             <Input placeholder="1" readOnly={!editMode} value={level.definition} onChange={e => onLevelChange(index, 'definition', e.target.value)} />
//                                         </Col>
//                                         <Col span={8}>
//                                             <Input placeholder="10" readOnly={!editMode} value={level.team_activation} onChange={e => onLevelChange(index, 'team_activation', e.target.value)} />
//                                         </Col>
//                                         <Col span={2}>
//                                             {editMode &&
//                                                 <Popconfirm title="Are you sure to delete this level?" onConfirm={() => removeLevel(index)}>
//                                                     <Button type="link" icon={<DeleteOutlined danger />} />
//                                                 </Popconfirm>
//                                             }
//                                         </Col>
//                                     </Row>
//                                     <hr />
//                                 </>)}
//                                 {editMode &&
//                                     <Row className='addmore--button'>
//                                         <Col>
//                                             <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
//                                                 Add More
//                                             </Button>
//                                         </Col>
//                                     </Row>
//                                 }
//                             </div>
//                         </Col>
//                     </Row>

//                 </Col>


//             </Row>


//         </div>
//     );
// }