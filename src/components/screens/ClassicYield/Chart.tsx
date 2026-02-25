"use client";

import { memo, useMemo } from "react";
import { ButtonBase, Stack, useTheme } from "@mui/material";
import { Text } from "@/components/shared";
import {
  DATE_FORMAT_SLASH,
  TOKEN_SYMBOL_BY_ADDRESS,
  USDG_CONTRACT,
} from "@/constant";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  formatCash,
  formatDateFromISOString,
  formatNumber,
  getStepChart,
} from "@/utils";
import { subDays } from "date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
);

type ChartProps = {};

const Chart = (props: ChartProps) => {
  const items = useMemo(
    () => [
      { date: subDays(new Date(), 6).getTime(), count: 10.5 },
      { date: subDays(new Date(), 5).getTime(), count: 8.25 },
      { date: subDays(new Date(), 4).getTime(), count: 9.75 },
      { date: subDays(new Date(), 3).getTime(), count: 10 },
      { date: subDays(new Date(), 2).getTime(), count: 10.5 },
      { date: subDays(new Date(), 1).getTime(), count: 10.5 },
      { date: Date.now(), count: 10.5 },
    ],
    [],
  );
  const { palette } = useTheme();

  const data = useMemo(
    () => ({
      labels: items.map((item) => item.date),
      datasets: [
        {
          label: "",
          data: items.map((item) => item.count),
          borderWidth: 2,
          borderColor: palette.secondary?.["main"],
          tension: 0.2,
        },
      ],
    }),
    [items, palette.secondary],
  );

  const stepInfo = useMemo(() => getStepChart(data.datasets, 100), [data]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external: function (context) {
            const tooltipModel = context.tooltip;
            let tooltipEl = document.getElementById("chartjs-tooltip");

            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.style.background = "rgba(0,0,0,0.7)";
              tooltipEl.style.color = "white";
              tooltipEl.style.borderRadius = "3px";
              tooltipEl.style.padding = "6px 8px";
              tooltipEl.style.position = "absolute";
              tooltipEl.style.transform = "translate(-50%, 0)";
              tooltipEl.style.pointerEvents = "none";
              tooltipEl.style.transition = "all .1s ease";
              tooltipEl.style.fontSize = "14px";
              tooltipEl.style.whiteSpace = "nowrap";
              tooltipEl.style.zIndex = "2000";
              document.body.appendChild(tooltipEl);
            }

            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            }

            if (tooltipModel.body) {
              const label = tooltipModel.dataPoints[0].label;
              const value = tooltipModel.dataPoints[0].raw;

              tooltipEl.innerHTML = `Date: <strong>${formatDateFromISOString(Number(label), DATE_FORMAT_SLASH)}</strong><br />PNL: <strong>${formatNumber(Number(value))}</strong>`;
            }

            const canvasRect = context.chart.canvas.getBoundingClientRect();

            let left =
              canvasRect.left + window.pageXOffset + tooltipModel.caretX;
            let top = canvasRect.top + window.pageYOffset + tooltipModel.caretY;

            const padding = 8;

            left = Math.min(
              Math.max(left, padding),
              window.innerWidth - tooltipEl.offsetWidth - padding,
            );

            if (
              top + tooltipEl.offsetHeight >
              window.scrollY + window.innerHeight
            ) {
              top -= tooltipEl.offsetHeight + 10;
            }
            if (top < window.scrollY) {
              top = window.scrollY + padding;
            }

            tooltipEl.style.left = left + "px";
            tooltipEl.style.top = top + "px";
            tooltipEl.style.opacity = "1";
          },
        },
      },
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
          max: stepInfo.max,
          min: 0,
          ticks: {
            callback: (value: number) =>
              formatNumber(value, { suffix: "%", space: false }),
            color: "#888E8F",

            maxTicksLimit: 6,
            padding: 0,
            font: {
              size: 12,
              weight: 500,
            },
            stepSize: stepInfo.stepSize,
          },
          border: {
            display: false,
          },
          grid: {
            display: true,
            drawBorder: false,
            color: "rgba(255,255,255,0.08)",
            borderDash: [1, 3],
            borderDashOffset: 2,
          },
        },
        x: {
          ticks: {
            autoSkip: true,
            color: "#888E8F",
            callback: (_, index) => {
              if (index === 0 || index === items.length - 1)
                return formatDateFromISOString(items[index].date, "MM/dd");
              return formatDateFromISOString(items[index].date, "dd");
            },
            font: {
              size: 12,
              weight: 500,
            },
          },
          grid: {
            display: false,
          },
        },
      },

      elements: {
        point: {
          radius: 0,
          hoverRadius: 0,
        },
      },
    }),
    [stepInfo.max, stepInfo.min, stepInfo.stepSize, items],
  );

  return (
    <Stack
      flex={{ xs: 1, md: 2 }}
      minHeight={300}
      px={2}
      py={{ xs: 4, md: 2 }}
      spacing={3}
    >
      <Stack
        direction="row"
        borderRadius={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="h4">{`${TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT]} APY History`}</Text>
        <Stack
          direction="row"
          overflow="hidden"
          borderRadius={2}
          alignItems="center"
          width="fit-content"
          minHeight={32}
          border="1px solid"
          borderColor="divider"
        >
          {DAY_OPTIONS.map((item, index) => (
            <Text
              component={ButtonBase}
              // onClick={onChangeTime(item.value)}
              variant="subtitle2"
              bgcolor={index === 0 ? "grey.A400" : undefined}
              color={index === 0 ? "text.primary" : "grey.400"}
              key={item.label}
              px={2}
              py={1}
              borderRight={
                index < DAY_OPTIONS.length - 1 ? "1px solid" : undefined
              }
              borderColor="divider"
            >
              {item.label}
            </Text>
          ))}
        </Stack>
      </Stack>
      <Stack position="relative" height={250}>
        <Line data={data} options={options as any} />
      </Stack>
    </Stack>
  );
};

export default memo(Chart);

const DAY_OPTIONS = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "60D", value: 60 },
  { label: "90D", value: 90 },
];
