import { Button, Upload } from "antd";

export function ButtonUploadImageMap({}){
    return <> 
        <Upload beforeUpload={false} >
            <Button>Upload Image Clickable</Button>
        </Upload>

    </>
}