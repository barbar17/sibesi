"use client";

import { useState } from "react";
import ListKuis from "./list";
import DetailKuis from "./detail";
import AddKuis from "./add";
import ListDoneKuis from "./listDone";

export default function Kuis() {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [id, setId] = useState<number>(0);

  const handleChangeTab = (tab: number, idDetail?: any) => {
    idDetail && setId(idDetail);
    setSelectedTab(tab);
  };

  if (selectedTab === 1) {
    return <ListKuis handleChangeTab={handleChangeTab} />;
  } else if (selectedTab === 2) {
    return <DetailKuis id={id} handleChangeTab={handleChangeTab} />;
  } else if (selectedTab === 3) {
    return <AddKuis handleChangeTab={handleChangeTab} />;
  } else {
    return <ListDoneKuis handleChangeTab={handleChangeTab} id={id} />;
  }
}
