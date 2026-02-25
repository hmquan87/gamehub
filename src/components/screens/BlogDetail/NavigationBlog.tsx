"use client";

import React, { memo, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { TabHeaders, TabItem } from "@/components/shared/Tab";
import { FONT_SIZE } from "@/constant";

interface NavBlogProps {
  data: TabItem[];
  handleClick: (id: string) => void;
  activeId?: string;
}

const NavigationBlog = ({ data, handleClick, activeId }: NavBlogProps) => {
  const [tabsList, setTablist] = useState<TabItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setTablist(data);
    }
  }, [data]);

  useEffect(() => {
    if (!activeId || !tabsList.length) return;

    const index = tabsList.findIndex((tab) => tab.id === activeId);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [activeId, tabsList]);

  const handleTabClick = (id: string) => {
    const index = tabsList.findIndex((tab) => tab.id === id);
    if (index !== -1) {
      setSelectedIndex(index);
      handleClick(id);
    }
  };

  if (tabsList.length === 0) return null;
  return (
    <Stack>
      <TabHeaders
        tabs={tabsList}
        value={selectedIndex}
        handleClick={handleTabClick}
        orientation="vertical"
        tabIndicatorSx={{
          left: 0,
          right: "unset",
          width: "2px",
          height: "100%",
          backgroundColor: "primary.main",
        }}
        sx={{
          alignItems: "start",
          color: "white",
          fontSize: FONT_SIZE[14],
          fontWeight: 500,
          textTransform: "none",
          p: "0px 8px",
          minHeight: "auto",
        }}
      />
    </Stack>
  );
};

export default memo(NavigationBlog);
