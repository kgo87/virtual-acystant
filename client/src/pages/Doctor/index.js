import React from "react";
import HeaderCard from "../../components/HeaderCard";
import headerCardData from "../../utils/headerCardData.json";

const Doctor = () => {
  return (
    <div>
      <HeaderCard
        title={headerCardData.doctor.title}
        paragraph={headerCardData.doctor.paragraph}
      />
      {/* <RESULTS /> */}
      {/* <MAP /> */}
    </div>
  );
};

export default Doctor;
