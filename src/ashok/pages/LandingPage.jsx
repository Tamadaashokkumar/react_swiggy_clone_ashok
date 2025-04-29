import React from "react";

import NavBar from "../components/NavBar/NavBar";
import ItemsDisplay from "../components/ItemsDisplay/itemsDisplay";
import Chains from "../components/Chains/Chains";
import FirmCollections from "../components/FirmCollections/FirmCollections";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div>
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
      </div>
    </div>
  );
};

export default LandingPage;
