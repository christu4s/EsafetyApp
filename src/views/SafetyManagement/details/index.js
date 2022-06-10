import { Row, Col, Form, Button, Modal, Upload, Input, Space, Popconfirm, Table  } from 'antd';
import React, { useState, useEffect , useRef } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import ajax from '../../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer } from '../../../utils';
import { PageTemplate } from './../../template';
import { SearchOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export const SafetyManagementItem = ({match}) => {
    const { id } = match.params;
    return <PageTemplate
        backButton
        iconUrl={danger} 
        title="Safety Management System" 
        subtitle={(content) => content.title } 
        api={"/safety_manage_commit/"+id} 
        descName="desc"
        imageName="commitment_file_image"
        pdfName="commitment_file_pdf"
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
    // datatable search fuctionality
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
             
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
                height:'40px'
              }}
            >
              Reset
            </Button>
            
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
        {
            title: 'Team Members',
            dataIndex: 'teamMembers',
            key: 'teamMembers',
            ...getColumnSearchProps('teamMembers'),
          },
        {
          title: 'Roles and responsibility',
          dataIndex: 'roles',
          key: 'roles',
          ...getColumnSearchProps('roles'),
        }
       
        
      ];

    return <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
        <Form.Item hidden name="team_members"><Input /></Form.Item>
        <Table columns={columns} dataSource={data} />
        {editMode && data.map((team, index) => <>
             <Row gutter={16}>
                <Col span={10}>
                     <Input placeholder="1" readOnly={!editMode} value={team.teamMembers} onChange={e => onLevelChange(index, 'teamMembers', e.target.value)} />
                </Col>
                 <Col span={10}>
                     <Input.TextArea placeholder="10" readOnly={!editMode} value={team.roles} onChange={e => onLevelChange(index, 'roles', e.target.value)} />
                 </Col>
                 <Col span={2}>
                    
                         <Popconfirm title="Are you sure to delete this level?" onConfirm={() => removeLevel(index)}>
                            <Button type="link" icon={<DeleteOutlined danger />} />
                         </Popconfirm>
                     
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
        </div>;
}