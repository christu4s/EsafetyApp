import { Row, Col, Form, Input, Modal, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import area from '../../../../assets/area.png';
import image from '../../../../assets/image.png';
import { CardHolder, TitleEdit } from '../../../../utils';
import { PageTemplate } from '../../../template';
import { PlusCircleOutlined } from '@ant-design/icons';
import ajax from '../../../../ajax';


export const FacilityAreaDetails = ({ match }) => {

    const { id } = match.params;
    return <PageTemplate
        canDelete
        backButton
        iconUrl={area}
        title="Facilities Overview"
        subtitle={TitleEdit}
        api={'/facility-overview/area/' + id}
        descName="desc"
        imageName="image"
        pdfName="pdf"
        videoName="video"
        tableName="table_detail"
        clickableName="clickable_image"
    >
        {(content, editMode, form, saveData) => <LinkedHazards editMode={editMode} content={content} saveData={saveData} />}
    </PageTemplate>
}

function LinkedHazards({ content, editMode, form, saveData }) {
    const [modal, setModal] = useState(false);
    const [options, setOption] = useState([]);
    const toggle = () => setModal(!modal);
    var { hazard = [] } = content;
    var ids = hazard ? hazard.map(v => v.id) : [];
    useEffect(() => {
        hazard && setOption(hazard.map(v => ({ label: v.title, value: v.id })));
    }, [hazard]);

    async function onSearch(search) {
        var res = await ajax.get('/major_accident_hazards_item', { search });
        if (!res || !res.data) return;
        setOption(res.data.map(v => ({ label: v.title, value: v.id })));
    }

    return <div>
        <h2>Hazard Accident hazards</h2>
        <Row gutter={[16, 16]}>
            {hazard && hazard.map((v, i) => <Col key={i} span={8}>
                <CardHolder image={v.image || image} title={v.title} url={`/accidents-hazards/${v.id}`} />
            </Col>
            )}
        </Row>
        {editMode && <div style={{ marginTop: 20 }}>
            <Button onClick={toggle} icon={<PlusCircleOutlined />}>Add Hazard</Button>
            <Modal title="Link Hazard" visible={modal} onCancel={toggle} onOk={saveData}>
                <Form.Item name="hazard" shouldUpdate label="Accident Hazard" initialValue={ids}>
                    <Select mode="multiple" showSearch onSearch={onSearch} filterOption={false} options={options} />
                </Form.Item>
            </Modal>
        </div>}
    </div>
}