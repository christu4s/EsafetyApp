
import React from "react";
import extinguisher from "../../assets/fire-extinguisher@3x.png";

import imageTiers from "../../assets/tiers.png";
import imageResponseOrg from "../../assets/responseOrg.png";
import imageResponsePlan from "../../assets/fire-alarm.png";
import imageActionPlan from "../../assets/ActionPlan.png";
import { ListItems, PageTemplate } from "./../template";
import { TitleEdit } from "../../utils";

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
      subtitle={(content,editMode)=> TitleEdit(content,editMode,"Emergency Response")} 
      api="/emergency_respons"
      descName="response_desc"
      imageName="response_image"
      pdfName="response_pdf"
    > <ListItems list={subpages} countInRow={4} />
    </PageTemplate>
  );
};