import React from "react";
import alert from "../../../assets/alert@3x.png";
import fire from "../../../assets/fire-1@3x.png";
import warning from "../../../assets/triangular-warning-sign@3x.png";
import { Timeline } from "antd";
import { Link } from "react-router-dom";
import { PageTemplate } from "./../../template";
import { criticalEquipments } from "../../../constants";

export const CriticalEquipment = () => {
  return (
    <PageTemplate
      iconUrl={alert}
      title="Safty Critical Element"
      subtitle="Safty Critical Equipment"
      api="/criticalEquipment"
      descName="equipment_desc"
      imageName="equipment_image"
      pdfName="equipment_pdf"
    >
      <div style={{ marginTop: 30 }}>
        <Timeline>
          <Timeline.Item>
            <div className="timeline--box timeline--box--withimage">
              <p>
                <img width="25" src={warning} /> Hazards
              </p>
            </div>
          </Timeline.Item>
          {criticalEquipments.map((page, i) => (
            <Timeline.Item>
              <div className="timeline--box timeline-bg-blue">
                <Link to={"/safety-critical/equipment/" + page.type}>
                  <p style={{ color: "#fff" }}> {page.title}</p>
                </Link>
              </div>
            </Timeline.Item>
          ))}
          <Timeline.Item>
            <div className="timeline--box timeline--box--withimage">
              <p>
                <img width="25" src={fire} /> Hazards
              </p>
            </div>
          </Timeline.Item>
        </Timeline>
      </div>
    </PageTemplate>
  );
};