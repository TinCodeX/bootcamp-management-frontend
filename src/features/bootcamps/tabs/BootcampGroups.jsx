import React from "react";
import { useOutletContext } from "react-router-dom";

function BootcampGroups() {
  const { bootcamp } = useOutletContext();
  return <div>Bootcamp Groups Content</div>;
}

export default BootcampGroups;
