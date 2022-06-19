import { Row, Col, Card, Button, Modal, Upload, Input, Form, Space, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/06107-f-28-fig-3@3x.png';
import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';
import { PageTemplate } from './../../template';

export const ResponseOrganisation = () => {
    return <PageTemplate
        iconUrl={extinguisher}
        title="Emergency Response"
        subtitle="Emergency Response Organisation"
        api="/emergency_response_organisation"
        descName="organisation_desc"
        imageName="organisation_image"
        pdfName="organisation_pdf"
        videoName="organisation_video"
    >{(content,editMode,form)=> <TableOrg content={content} editMode={editMode} form={form} />}
    </PageTemplate>
}

function TableOrg({ content, editMode, form }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            var res = JSON.parse(content.team_members.replace(/\\/g, ''));
            setData(res);
        } catch (e) { }
    }, [content.team_members]);

    useEffect(() => { form.setFieldsValue({ team_members: JSON.stringify(data) }) }, [data]);


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
        <Form.Item hidden name="team_members"><Input /></Form.Item>
        <Row gutter={20}>
            <Col span={12} >
                <h3>Team Member</h3>
            </Col>
            <Col span={12}>
                <h3>Roles and Responbilities</h3>
            </Col>
        </Row>
        <hr />
        {data.map((team, index) => <>
            <Row gutter={16}>
                <Col span={10}>
                    <Input placeholder="1" readOnly={!editMode} value={team.teamMembers} onChange={e => onLevelChange(index, 'teamMembers', e.target.value)} />
                </Col>
                <Col span={10}>
                    <Input.TextArea placeholder="10" readOnly={!editMode} value={team.roles} onChange={e => onLevelChange(index, 'roles', e.target.value)} />
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


// export const ResponseOrganisation = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ organisation_desc: '', organisation_image: '' });
//     const [team_members, setTeams] = useState([]);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         ajax.get('/emergency_response_organisation').then(res => res && setData(res));
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
//             var tem = JSON.parse(res.team_members.replace(/\\/g, ''));
//             setTeams(tem);
//         } catch (e) { }
//     }

//     async function saveData() {
//         var { organisation_desc = '', organisation_image } = form.getFieldsValue();
//         await ajax.post('/emergency_response_organisation', {
//             organisation_desc: organisation_desc ? organisation_desc : null,
//             organisation_image: organisation_image ? organisation_image.file : null,
//             team_members: JSON.stringify(team_members)
//         }).then(res => res && setData(res));
//         setEditMode(!editMode);
//         setIsModalVisible(false);
//     }
//     const { Meta } = Card;

//     function addmore() { setTeams([...team_members, {}]); }
//     function removeLevel(index) {
//         team_members.splice(index, 1);
//         setTeams([...team_members]);
//     }

//     function onLevelChange(index, key, value) {
//         team_members[index][key] = value;
//         setTeams([...team_members]);
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
//                                         <h2 style={{ marginTop: 25 }}>Emergency Response Organisation</h2>
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
//                                     <p>{editMode ? <Form.Item name="organisation_desc"><Input.TextArea defaultValue={content.organisation_desc} /></Form.Item>
//                                         : <p>{content.organisation_desc}</p>}</p>
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
//                                     <Col span={12} >
//                                         <h3>Team Member</h3>
//                                     </Col>
//                                     <Col span={12}>
//                                         <h3>Roles and Responbilities</h3>
//                                     </Col>
//                                 </Row>
//                                 <hr />
//                                 {team_members.map((team, index) => <>
//                                     <Row gutter={16}>
//                                         <Col span={10}>
//                                             <Input placeholder="1" readOnly={!editMode} value={team.teamMembers} onChange={e => onLevelChange(index, 'teamMembers', e.target.value)} />
//                                         </Col>
//                                         <Col span={10}>
//                                             <Input.TextArea placeholder="10" readOnly={!editMode} value={team.roles} onChange={e => onLevelChange(index, 'roles', e.target.value)} />
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