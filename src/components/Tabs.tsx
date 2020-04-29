import React, { useState, SyntheticEvent, MouseEvent } from "react";
import { Tabs } from "gestalt";
import { Tab } from "../Interface";

interface ITabs {
  tabs: Tab[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
export default ({ tabs, activeIndex, setActiveIndex }: ITabs) => {
  interface handleChange {
    activeTabIndex: number;
    event: React.SyntheticEvent<
      React.MouseEvent<Element, globalThis.MouseEvent>,
      Event
    >;
  }
  const handleChange = ({ activeTabIndex, event }: handleChange) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex);
  };

  return (
    <Tabs tabs={tabs} activeTabIndex={activeIndex} onChange={handleChange} />
  );
};
