import { Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import RegionSelect from "react-region-select";
import { setFormData } from "../../../ajax";
import { MinusCircleOutlined } from '@ant-design/icons';



export function ImageMapModal({ onSubmit, form, isImageModalVisible, close, file, toggleModal }) {
    const [regions, setRegions] = useState([]);
    const imgUrl = URL.createObjectURL(file);

    function onChange(newRegions) {
        setRegions(newRegions);
    }

    function regionRenderer({ index, ...props }) {
        const { title = "" } = regions[index];
        return <p style={{ textAlign: "start", fontWeight: 600, color: "white", fontSize: "20px" }}>{title}</p>;
    }

    function handleInputChange(index, e) {
        regions[index][e.target.name] = e.target.value;
        setRegions([...regions]);
    }

    function removeRegion(index) {
        regions.splice(index, 1);
        setRegions([...regions]);
    }

    async function onSave() {
        // var formData = new FormData();
        // formData.append("file", file);
        // console.log(regions);
        var formData = setFormData(new FormData(), { map_detail: regions, file });
        // formData.append('map_detail', regions);
        axios.post("https://esafety-dev.actsyn.com/v2/wp-json/wp/v2/media", formData, {
            headers: { 'Authorization': "Basic YWRtaW46SVdibiBZb1ZIIGNuUjEgTEZOeSBCM2s3IHd1UHQ=" },
        }
        ).then(res => {
            res && console.log(res);
            form.setFieldsValue({ _clickable_image: res.data.id });
            typeof onSubmit == 'function' && onSubmit();
            // toggleModal();
            close();
        });
    }
    return <Modal visible={isImageModalVisible}
        onCancel={close}
        width="max-content"
        onOk={onSave}
        okText="Upload"
        style={{ minWidth: 800 }}
    >
        <Form.Item hidden name={'_clickable_image'} />
        <RegionSelect
            regions={regions}
            onChange={onChange}
            regionRenderer={regionRenderer}
            regionStyle={{ background: "rgb(38 37 37 / 54%)" }}
        >
            <img src={imgUrl} alt="" />
        </RegionSelect>
        <br />
        {regions.map((region, index) => {
            return (
                <div style={{ display: "flex", flexDirection: 'row', gap: "10px", alignItems: "center", marginTop: 15 }} size={12} >
                    <label htmlFor="title" style={{ width: 110 }}>{index + 1}: </label>
                    <Input
                        id="title"
                        placeholder="Title"
                        name="title"
                        value={region.title}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <Input
                        placeholder="Link"
                        name="link"
                        value={region.link}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <MinusCircleOutlined style={{ fontSize: 20, color: 'red' }} onClick={() => removeRegion(index)} />
                </div>

            )
        })}

    </Modal>
}