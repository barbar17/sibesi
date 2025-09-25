"use client";

import { useState } from "react";
import ListMateri from "./list";
import DetailMateri from "./detail";
import AddMateri from "./add";

export default function Materi() {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [id, setId] = useState<number>(0);

  const handleChangeTab = (tab: number, idDetail?: any) => {
    idDetail && setId(idDetail);
    setSelectedTab(tab);
  };

  if (selectedTab === 1) {
    return <ListMateri handleChangeTab={handleChangeTab} />;
  } else if (selectedTab === 2) {
    return <DetailMateri id={id} handleChangeTab={handleChangeTab} />;
  } else {
    return <AddMateri handleChangeTab={handleChangeTab} />;
  }
}
