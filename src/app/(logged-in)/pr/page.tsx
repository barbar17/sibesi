"use client";

import { useState } from "react";
import ListPR from "./list";
import DetailPR from "./detail";
import AddPR from "./add";
import ListPRDone from "./listDone";

export default function PR() {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [id, setId] = useState<number>(0);

  const handleChangeTab = (tab: number, idDetail?: any) => {
    idDetail && setId(idDetail);
    setSelectedTab(tab);
  };

  if (selectedTab === 1) {
    return <ListPR handleChangeTab={handleChangeTab} />;
  } else if (selectedTab === 2) {
    return <DetailPR id={id} handleChangeTab={handleChangeTab} />;
  } else if (selectedTab === 3) {
    return <AddPR handleChangeTab={handleChangeTab} />;
  } else {
    return <ListPRDone handleChangeTab={handleChangeTab} />;
  }
}
