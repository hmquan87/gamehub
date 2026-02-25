"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useRef, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export interface TabItem {
  id?: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export function useCustomTabs(defaultIndex = 0) {
  const [value, setValue] = useState(defaultIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange, setValue };
}

export interface TabHeadersProps {
  tabs: TabItem[];
  value?: number;
  handleChange?: (e: React.SyntheticEvent, val: number) => void;
  handleClick?: (id: any) => void;
  orientation?: "vertical" | "horizontal";
  sx?: SxProps;
  tabIndicatorSx?: SxProps;
}

export function TabHeaders({
  tabs,
  value = 0,
  handleChange,
  handleClick,
  orientation = "horizontal",
  sx,
  tabIndicatorSx,
}: TabHeadersProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!scrollRef.current) return;
      setShowNav(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box position="relative" sx={{ width: "100%" }}>
      <Box
        ref={scrollRef}
        sx={{
          position: "relative",
          overflowX: orientation === "horizontal" ? "auto" : "unset",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {tabs.length > 1 && orientation === "vertical" && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "#444444",
            }}
          />
        )}
        <Tabs
          orientation={orientation}
          value={value}
          onChange={(e, newValue) => handleChange?.(e, newValue)}
          variant="standard"
          scrollButtons={false}
          aria-label="custom tabs"
          textColor="inherit"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            maxWidth: "100%",
          }}
          TabIndicatorProps={{
            sx: tabIndicatorSx,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              onClick={() => {
                if (handleClick && tab.id) handleClick(tab.id);
              }}
              disabled={tab.disabled}
              sx={{
                flex: "0 1 auto",
                maxWidth: "250px",
                wordBreak: "break-word",
                textAlign: "left",
                mb: index < tabs.length - 1 ? 2 : 0,
                opacity: 0.5,
                "&:hover": {
                  opacity: 1,
                  transition: "all 0.3s ease-in-out",
                },
                "&.Mui-selected": {
                  opacity: 1,
                },
                ...sx,
              }}
            />
          ))}
        </Tabs>
      </Box>


    </Box>
  );
}

export function TabContents({
  tabs,
  value,
}: {
  tabs: TabItem[];
  value: number;
}) {
  return (
    <>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </>
  );
}
