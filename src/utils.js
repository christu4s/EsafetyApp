import { Card, Button, Modal, Upload, Form, Input, Space, Select } from "antd";
import { useEffect, useState, React } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PushpinFilled, PushpinOutlined, CloudUploadOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import computing from './assets/cloud-computing@3x.png';
import pdf from './assets/pdf-1@3x.png';
import { isAdmin } from "./constants";
import { useMenuContext } from "./provider";
import ajax, { setFormData } from "./ajax";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useHistory } from "react-router-dom";
import { base_url } from "./ajax";
import axios from "axios";
import RegionSelect from "react-region-select";
import { ImageMapModal } from "./views/TemplateComponents/ImageMap/ImageMapModal";


export const BoxHolder = ({ title, img, active, url }) => {
  return (<Link to={url}>
    <div className='box--holder' style={{ display: 'flex' }}>
      <div className='box--icon box--holder--active'>
        <img src={img} width="50" height="50" />
      </div>
      <h4>{title}</h4>
    </div>
  </Link>
  )
}

export const CardHolder = ({ url, image, title, pin, onChangePin }) =>
  <>
    {pin !== undefined ? pin ?
      <PushpinFilled className="card_pin pinned " onClick={onChangePin} />
      :
      <PushpinOutlined rotate={50} className="card_pin unpinned " onClick={onChangePin} /> :
      null
    }
    <Link to={url}>
      <Card className='custom--card' hoverable cover={<img alt="example" src={image} />}>
        <Card.Meta title={title} />
      </Card>
    </Link>
  </>


export function ButtonUpload({ children, clickableImage, name, form, onSubmit, addMore = false, buttonText = 'Upload Files', ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setImageIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const [uploadFile, setUploadFile] = useState({})


  async function onSave() {
    if (typeof onSubmit == 'function') await onSubmit();
    toggleModal();
  }
  return <div className={addMore ? 'addmore--button' : null}>
    <Button type={addMore ? 'default' : "primary"} icon={addMore ? <PlusCircleOutlined /> : <CloudUploadOutlined />} onClick={toggleModal}>{buttonText}</Button>
    <Modal title="" className='upload--modal' visible={isModalVisible} onOk={toggleModal} onCancel={toggleModal}>
      <h3 className='modal--title text-center'>Upload Files</h3>
      <Form.Item hidden name={'update_file_' + name} initialValue={1} />
      <Form.Item name={clickableImage ? null : name}>
        <Upload.Dragger maxCount={clickableImage ? 1 : 100}
          beforeUpload={(file) => {
            const showImagePreviwe = () => {
              setUploadFile(file)
              setImageIsModalVisible(true)
            }
            clickableImage && file && showImagePreviwe()
            return false
          }}
          {...props}  >
          <p className="ant-upload-drag-icon">
            <img width='50' src={computing} />
          </p>
          <p className="ant-upload-hint">
            Drag or drop your files here OR <span> browse </span>
          </p>
        </Upload.Dragger>
      </Form.Item>

      {children}
      {isImageModalVisible && <ImageMapModal onSubmit={onSubmit} form={form} isImageModalVisible={isImageModalVisible} close={() => setImageIsModalVisible(false)} file={uploadFile} toggleModal={toggleModal} />}
      {!clickableImage && <Button type="primary" onClick={onSave} icon={addMore ? null : <CloudUploadOutlined />}>{addMore ? 'Create' : 'Upload'}</Button>
      }
    </Modal>
  </div>
}

export default function ButtonUploadImageMap({ data, form, onSubmit, accept, name, buttonText, ...props }) {
  const [uploadFile, setUploadFile] = useState({})
  const [isImageModalVisible, setImageIsModalVisible] = useState(false);


  async function onSave() {
    if (typeof onSubmit == 'function') await onSubmit();
    setImageIsModalVisible(false)
  }
  return <div>
    <Upload type="primary" maxCount={1}
      showUploadList={false}
      accept={accept}

      beforeUpload={(file) => {
        const showImagePreviwe = () => {
          setUploadFile(file)
          setImageIsModalVisible(true)
        }
        file && showImagePreviwe()
        return false
      }}
      {...props}
    >
      <Button type='primary' icon={<CloudUploadOutlined />}>
        {buttonText}
      </Button>
    </Upload>
    {isImageModalVisible && <ImageMapModal onSubmit={onSave} form={form} isImageModalVisible={isImageModalVisible} close={() => setImageIsModalVisible(false)} file={uploadFile} />}
  </div>
}



export function FileViewer({ images = [], index = 0 }) {
  if (!images || !images[index]) return null;

  const { type = '', name, src } = images[index];

  return type.includes('image') ? <img width='100%' src={src} /> : <div className='box--facility pdf-view-section area--box--facility'>
    <h2 style={{ marginTop: 15 }}><img width='30' src={pdf} /> <span> Pdf File Name</span></h2>
    <iframe src={src} width="100%" height="700" frameBorder="0" />
  </div>
}
export function DescField({ name = '', value = '', editMode = false, form }) {

  return editMode ? <Form.Item name={name} initialValue={value}><ReactQuill /></Form.Item> : <p dangerouslySetInnerHTML={{ __html: value }} />;
}

export function EditButtons({ editMode, toggle, save }) {
  if (!isAdmin) return null;

  return !editMode ? <Button type="primary" size="small" onClick={toggle}>Edit</Button> :
    <Space>
      <Button type="primary" size="small" danger onClick={toggle}>Cancel</Button>
      <Button type="primary" size="small" success onClick={save}>Save</Button>
    </Space>
}


export function TitleEdit(content, editMode, title = "", key = "title") {
  if (content && content[key]) title = content[key];
  return editMode ? <Form.Item name={key} initialValue={title}><Input /></Form.Item> : title;
}

export function SubTitleEdit(content, editMode, subtitle = "", key = "subtitle") {
  if (content && content[key]) subtitle = content[key];
  return editMode ? <Form.Item name={key} initialValue={subtitle}><Input /></Form.Item> : subtitle;
}

export function MenuTitle({ api, title, titleKey = 'title' }) {
  const [menu, setTitle] = useMenuContext();
  var menukey = api + titleKey;
  if (menu[menukey]) title = menu[menukey];
  //console.log(menukey, title);
  useEffect(() => {
    api && !menu[menukey] && ajax.get(api).then(res => {
      res && setTitle(menukey, res[titleKey]);
    })
  }, [menukey]);

  return <span>{title}</span>
}

export function SearchBar() {
  const history = useHistory();
  const [data, setData] = useState([]);
  //const { key } = match.params;
  // function submit({input}){
  //   history.push('/search/' + input); 
  // }

  const onChange = (value, details) => {
    history.push(details.path);
  };

  function massageData(json) {
    var ret = { value: json.id };

    switch (json.subtype) {
      case 'scenario_action_flow':
        ret.path = "/emergency-response/scenario";
        ret.label = json.title;
        break;
      case 'facility_area':
        ret.path = "/facility-overview/area";
        ret.label = json.title;
        break;

      case 'written_safety_case_':
        ret.path = "/writen-safety";
        ret.label = json.title;
        break;
      case 'safetycriticalproced':
        ret.path = "/safety-critical/procedure";
        ret.label = json.title;
        break;
      case 'safety_critical_procedure_subtitle':
        ret.path = "/safety-critical/procedure";
        ret.label = json.title;
        break;
      case 'safety_critical_equipment_subtitle':
        ret.path = "/safety-critical/equipment";
        ret.label = json.title;
        break;
      case 'facility_manning_title':
        ret.path = "/facility-overview/manning";
        ret.label = json.title;
        break;
      case 'facilities_process_title':
        ret.path = "/facility-overview/process";
        ret.label = json.title;
        break;
      case 'facility_subtitle':
        ret.path = "/facility-overview/area";
        ret.label = json.title;
        break;
      case 'major_accident_hazards_title':
        ret.path = "/accidents-hazards";
        ret.label = json.title;
        break;
      case 'risk_assessment_title':
        ret.path = "/risk-assessment";
        ret.label = json.title;
        break;
      case 'emergency_respons_title':
        ret.path = "/emergency-response";
        ret.label = json.title;
        break;
      case 'emer_response_tiers_title':
        ret.path = "/emergency-response/tiers";
        ret.label = json.title;
        break;
      case 'emer_response_organisation_title':
        ret.path = "/emergency-response/organisation";
        ret.label = json.title;
        break;
      case 'emer_response_plan_title':
        ret.path = "/emergency-response/plan";
        ret.label = json.title;
        break;
      case 'scenario_action_plan_title':
        ret.path = "/emergency-response/scenario";
        ret.label = json.title;
        break;
      case 'safety_management_title':
        ret.path = "/safety-management";
        ret.label = json.title;
        break;

      // ==============================================/
      case 'risk_assessment_item':
        ret.path = '/risk-assessment/' + json.id;
        ret.label = json.title + ' (Risk Assessment)';
        break;
      case 'safety_manage_commit':
        ret.path = '/safety-management/' + json.id;// this should be changed to name
        ret.label = json.title + ' (Safety Management System)';
        break;

      case 'remedial_action_title':
        ret.path = '/remedial-action';// this should be changed to name
        ret.label = json.title;
        break;
      case 'written_safety_case_title':
        ret.path = '/writen-safety';// this should be changed to name
        ret.label = json.title;
        break;
      case 'safety_critical_element_title':
        ret.path = '/safety-critical';// this should be changed to name
        ret.label = json.title;
        break;
      case 'safety_critical_equipment_title':
        ret.path = '/safety-critical/equipment';// this should be changed to name
        ret.label = json.title;
        break;
      case 'safety_critical_procedure_title':
        ret.path = '/safety-critical/procedure';// this should be changed to name
        ret.label = json.title;
        break;
      case 'safety_critical_personnel_title':
        ret.path = '/safety-critical/personnel';// this should be changed to name
        ret.label = json.title;
        break;
      case 'major_accident_hazar':
        ret.path = '/accidents-hazards/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;
      case 'equipment_emegency_r':
        ret.path = '/safety-critical/equipment/emergencyResponse/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;
      case 'prevention_add_sce':
        ret.path = '/safety-critical/equipment/prevention/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;
      case 'detection_add_sce':
        ret.path = '/safety-critical/equipment/detection/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;
      case 'control_add_sce':
        ret.path = '/safety-critical/equipment/control/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;
      case 'mitigation_add_sce':
        ret.path = '/safety-critical/equipment/mitigation/' + json.id;// this should be changed to name
        ret.label = json.title;
        break;




      // case 'sub':

      //   break; 
      default:
        ret.label = json.title;
        ret.path = '/';
    }
    // console.log(`${json.subtype}: ` + ret.path)
    return ret;
  }


  const onSearch = (search) => {

    axios.get(base_url + '/wp-json/wp/v2/search', { params: { search } }).then(res => {
      setData(res.data.map(massageData).filter(v => v.path !== "/"));
      // setData(res.data.filter(item => item.url !== '').map(massageData));

    });
  };

  return <Select
    showSearch
    placeholder="Search anything"
    //optionFilterProp="children"
    options={data}
    showArrow={false}
    filterOption={false}
    onChange={onChange}
    onSearch={onSearch}
    width={800}
    style={{ width: '400px' }}
  />

  // return <Form>
  //   <Form.Item name="input" rules={[{ required: true, message: 'Please type what you looking for!' }]}>
  //     <Input type="search" allowClear placeholder="search" prefix={<SearchOutlined />} />
  //   </Form.Item>
  // </Form>
}
