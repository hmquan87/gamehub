import { AN_ERROR_TRY_AGAIN, DATE_FORMAT_SLASH, EMPTY_TEXT } from "@/constant";
import {
  OptionFormatNumber,
  OptionLimitDecimal,
  Params,
} from "@/constant/types";
import StringFormat from "string-format";
import { Breakpoint } from "@mui/material";
import cookieCutter from "cookie-cutter";
import {
  DateArg,
  format,
  formatDistance,
  FormatDistanceOptions,
  parseISO,
} from "date-fns";
// @ts-expect-error: Unreachable code error
import enUSLocale from "date-fns/locale/en-US";

export const formatDate = (dateString: string | Date): string => {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;

  if (!date || isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const smallWords = new Set([
  'to', 'of', 'the', 'in', 'on', 'with', 'a', 'an', 'and',
  'or', 'for', 'at', 'by', 'from'
]);

export const formatText = (value: string | null | undefined) => {
  const key = String(value ?? '');

  let words: string[] = [];

  if (key.includes('_')) {
    words = key.split('_');
  } else {
    words = key
      .replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2$3')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/\s+/)
      .filter(Boolean);
  }

  const formattedWords = words.map((word, index) => {
    const lower = word.toLowerCase();

    if (['bsc', 'eth', 'sol', 'avax', 'arb', 'op', 'ftm'].includes(lower)) {
      return lower.toUpperCase();
    }

    if (index === 0) {
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    if (smallWords.has(lower)) {
      return lower;
    }

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  return formattedWords.join(' ');
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatNumber = (
  number?: number | null | string,
  options: OptionFormatNumber = {},
  isFetching?: boolean,
) => {
  if (typeof number === "string") return number;

  const {
    numberOfFixed = 2,
    emptyText = EMPTY_TEXT,
    suffix,
    prefix = "",
    space = true,
    getMinDecimal = true,
    groupZeroDecimal = true,
    minShownValue = 0.000001,
    keepFullDecimal = false,
    ...localeOption
  } = options;

  const suffixParsed = suffix ? `${space ? " " : ""}${suffix}` : "";

  if (!number && number !== 0)
    return (isFetching ? EMPTY_TEXT : emptyText) + suffixParsed;

  const rawNum = Number(number || 0);

  if (Math.abs(rawNum) > 0 && Math.abs(rawNum) < minShownValue) {
    return `<${minShownValue}` + suffixParsed;
  }

  let _numberOfFixed = numberOfFixed;
  let numberGroupZeroDecimal = 0;

  const absNum = Math.abs(rawNum);

  if (getMinDecimal && absNum > 0 && absNum < 1) {
    const str = rawNum.toExponential(20);
    const match = str.match(/e-(\d+)/);
    const leadingZeros = match ? parseInt(match[1]) - 1 : 0;

    if (leadingZeros > 0) {
      if (groupZeroDecimal && leadingZeros > 4) {
        numberGroupZeroDecimal = leadingZeros;
      }
      _numberOfFixed = leadingZeros + numberOfFixed;
    }
  }

  if (keepFullDecimal) {
    const [intPart, decPart] = rawNum.toString().split(".");
    const formattedInt = Number(intPart).toLocaleString("en-US", {
      maximumFractionDigits: 0,
      ...localeOption,
    });
    return (
      prefix +
      (decPart ? `${formattedInt}.${decPart}` : formattedInt) +
      suffixParsed
    );
  }

  const rounded = Number(
    Math.round(Number(rawNum + "e" + _numberOfFixed)) + "e-" + _numberOfFixed,
  );

  const isInteger = Number.isInteger(rounded);
  const formatted = rounded.toLocaleString("en-US", {
    minimumFractionDigits: isInteger ? 0 : _numberOfFixed,
    maximumFractionDigits: _numberOfFixed,
    ...localeOption,
  });

  return prefix + formatted + suffixParsed;
};

export const cleanObject = (paramsObject, ignoreKeys: string[] = []) => {
  const cloneParamsObject = { ...paramsObject };
  for (const keyParam in paramsObject) {
    if (
      cloneParamsObject[keyParam] &&
      typeof cloneParamsObject[keyParam] === "object" &&
      !Array.isArray(cloneParamsObject[keyParam])
    ) {
      cloneParamsObject[keyParam] = cleanObject(
        cloneParamsObject[keyParam],
        ignoreKeys,
      );
    } else if (
      !ignoreKeys.includes(keyParam) &&
      (cloneParamsObject[keyParam] === null ||
        cloneParamsObject[keyParam] === "" ||
        cloneParamsObject[keyParam] === undefined)
    ) {
      delete cloneParamsObject[keyParam];
    } else if (typeof cloneParamsObject[keyParam] === "string") {
      cloneParamsObject[keyParam] = cloneParamsObject[keyParam].replace(
        /\n+/,
        "\n",
      );
    }
  }
  return cloneParamsObject;
};

export const removeDuplicateItem = (data, key = "id") => {
  return data.reduce((outArr, currentItem) => {
    const isExisted = outArr.some((item) => item[key] === currentItem[key]);
    if (isExisted) {
      return outArr;
    }
    outArr.push(currentItem);
    return outArr;
  }, []);
};

export const formatDateFromISOString = (
  value?: string | number,
  format = DATE_FORMAT_SLASH,
) => {
  if (typeof window === "undefined") return;
  if (!value) return value;

  if (typeof value === "number") {
    value = new Date(value).toISOString();
  }

  // 2023-02-05T14:13:58.000Z
  const years = value.slice(0, 4);
  const months = value.slice(5, 7);
  const days = value.slice(8, 10);
  const hours = value.slice(11, 13);
  const minutes = value.slice(14, 16);
  const seconds = value.slice(17, 19);

  let dateFormat = format.replace("yyyy", years);
  dateFormat = dateFormat.replace("MM", months);
  dateFormat = dateFormat.replace("dd", days);
  dateFormat = dateFormat.replace("HH", hours);
  dateFormat = dateFormat.replace("mm", minutes);
  dateFormat = dateFormat.replace("ss", seconds);

  return dateFormat;
};

export const capitalizeFirstLetter = (value?: string, fallback = "") => {
  if (!value) return fallback;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const stringifyURLSearchParams = (data) => {
  data = cleanObject(data);
  if (!Object.keys(data).length) return "";
  return (
    "?" +
    Object.entries(data || {})
      .reduce((out: string[], [key, value]) => {
        if (Array.isArray(value)) {
          out = [...out, ...value.map((valueItem) => `${key}=${valueItem}`)];
        } else {
          out.push(`${key}=${value}`);
        }
        return out;
      }, [])
      .join("&")
  );
};

export const getPath = (
  basePath: string,
  queries?: Params,
  data?: { [key: string]: string },
) => {
  queries = cleanObject(queries ?? {});
  const queryString = stringifyURLSearchParams(queries);
  const path = data ? StringFormat(basePath, data) : basePath;
  return path + queryString;
};

export const slugify = (text: string) => {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

export const parseURLSearchParams = (searchParams: URLSearchParams) => {
  const params: { [key: string]: string | string[] | undefined } | object = {};
  searchParams.forEach((value, key) => {
    params[key] = params[key]
      ? Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value]
      : value;
  });
  return params;
};

export const longTime = (value: number) => (value < 10 ? "0" + value : value);

export const formatTime = (time?: number) => {
  if (!time) return EMPTY_TEXT;

  const milliseconds = time % 1000;

  const minutes = parseInt(((time - milliseconds) / 1000 / 60).toString());
  const secs = ((time - milliseconds) / 1000) % 60;

  return `${longTime(minutes)}:${longTime(secs)}.${longTime(milliseconds)}`;
};

export const parseJSON = (
  data: string | undefined,
  defaultData: unknown,
): unknown => {
  try {
    if (!data) return defaultData;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};

export const groupData = (
  data: unknown[],
  keyGroup: string,
): { [key: number]: unknown[] } => {
  if (!data) return {};
  return data.reduce((r: { [key: number]: unknown[] }, a) => {
    if (a?.[keyGroup]) {
      r[a[keyGroup]] = r[a[keyGroup]] || [];
      r[a[keyGroup]].push(a);
    }
    return r;
  }, {});
};

export const formatCash = (
  value?: number,
  options?: OptionFormatNumber,
  tinyNumber = 0,
  maximumFractionDigits = 2,
) => {
  if (value === undefined) return formatNumber(value, options);
  const valueAbs = Math.abs(value);

  let _options = {
    ...options,
    numberOfFixed: maximumFractionDigits,
  };
  if (valueAbs < 1e3 - tinyNumber) {
    return formatNumber(value, _options);
  } else if (valueAbs < 1e6 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "K" + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e3), _options);
  } else if (valueAbs < 1e9 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "M" + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e6), _options);
  } else if (valueAbs < 1e12 - tinyNumber) {
    _options = {
      ..._options,
      space: false,
      suffix: "B" + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e9), _options);
  } else if (valueAbs > 0) {
    _options = {
      ..._options,
      space: false,
      suffix: "T" + (_options?.suffix ?? ""),
    };
    return formatNumber(+(value / 1e12), _options);
  }
  return formatNumber(value, _options);
};

export const isNil = (value) => value === undefined || value === null;

export const formatUSDCurrency = (
  number?: number,
  options?: OptionFormatNumber,
) => {
  return formatNumber(number, {
    minimumFractionDigits: 0,
    ...options,
    style: "currency",
    currency: "USD",
    emptyText: options?.emptyText ?? "$ --",
  });
};

export const joinQuery = (data, _schemaKeys?: { [key: string]: string }) => {
  return Object.entries(data)
    .reduce((out: string[], [key, value]) => {
      if (value !== undefined) {
        out.push(`${key},${value}`);
      }
      return out;
    }, [])
    .join(";");
};

export const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string | number } | object,
) => {
  const priorities: { [key in Breakpoint | "exs"]: (Breakpoint | "exs")[] } = {
    xl: ["xl", "lg", "md", "sm", "exs", "xs"],
    lg: ["lg", "md", "sm", "exs", "xs"],
    md: ["md", "sm", "exs", "xs"],
    sm: ["sm", "exs", "xs"],
    exs: ["exs", "xs"],
    xs: ["xs"],
  };

  for (const key of priorities[currentRatio]) {
    if (key in options) {
      return options[key];
    }
  }

  return;
};

export const spacingCapitalize = (text?: string, fallback = "N/A") => {
  if (!text) return fallback;
  text = text.trim();
  const isAllUpperCase = text.toUpperCase() === text;

  const spacedText = isAllUpperCase
    ? text
    : text.replace(/(?<!^)(?=[A-Z][a-z])/g, " ");

  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};

export const getFiltersFromQueries = (
  queries,
  skipValue = [undefined, null, ""],
) => {
  return Object.entries(queries || {}).reduce((out, [key, value]) => {
    if (
      !["pageSize", "pageIndex", "concat"].includes(key) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !skipValue.includes(value as any)
    ) {
      out[key] = value;
    }
    return out;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {}) as { [key: string]: any };
};

export const getMaxLinesCss = (lines = 2) => {
  return {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
  };
};

export const getTargetLink = (url?: string) =>
  url?.startsWith("http") ? "_blank" : undefined;

export const shortText = (
  value?: string,
  endCount = 4,
  startCount?: number,
) => {
  if (!value) return;
  return (
    value.slice(0, startCount || endCount) + "..." + value.slice(-endCount)
  );
};

const ERROR_FROM_RPC = "Internal JSON-RPC error";
const REJECT_MESSAGE = "User rejected the request.";
export const CANNOT_EST_GAS = "Cannot destructure property 'gas Limit'";

export const getMessageError = (error) => {
  let message =
    error?.["shortMessage"] || error?.["cause"]?.reason || error?.["message"];
  const shortMessage = message?.split(":\n")[1];

  message = shortMessage || message;

  if (message === REJECT_MESSAGE) {
    if (`${error}`.includes(ERROR_FROM_RPC)) {
      return ERROR_FROM_RPC;
    }
    return;
  }

  return (
    (typeof error === "string" ? error : spacingCapitalize(message)) ??
    AN_ERROR_TRY_AGAIN
  );
};

const formatDistanceLocaleShort = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}mo",
  xMonths: "{{count}}mo",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

const suffixes = {
  en: { ago: "ago", in: "in" },
};

const createShortLocale = (baseLocale, code) => ({
  ...baseLocale,
  formatDistance: (token, count, options = {} as any) => {
    const template = formatDistanceLocaleShort[token];
    if (!template) return "";
    const result = template.replace("{{count}}", count.toString());
    const sfx = suffixes[code] || suffixes.en;

    if (options.addSuffix) {
      if (Number(options.comparison) > 0) {
        return `${sfx.in} ${result}`;
      } else {
        return `${result} ${sfx.ago}`;
      }
    }
    return result;
  },
});

export const formatTextAsHTML = (text: string) => {
  return text
    .replace(/\n### (.+?)\n/g, "<h3>$1</h3>") // Convert to h3
    .replace(/\n\n/g, "<br><br>") // Convert empty line to <br>
    .replace(/\n/g, "<br>") // Convert \n to <br>
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Convert to bold text
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>') // Convert to link
    .replace(/```bash\n([\s\S]+?)\n```/g, "<pre><code>$1</code></pre>"); // Convert to code block
};

export const limitDecimalNumber = (
  value: number | string,
  decimalCount = 2,
  options?: OptionLimitDecimal,
) => {
  const { getMinDecimal = true } = (options || {}) as OptionLimitDecimal;

  const valueString = typeof value === "string" ? value : value.toFixed(26);
  const arraySplit = valueString.split(".");
  const decimal = arraySplit[1] || "";

  const minDecimal = getMinDecimal
    ? decimal.split("").findIndex((char) => Number(char) > 0) + 1
    : 0;

  const newValue = `${arraySplit[0]}.${decimal.slice(0, decimalCount > minDecimal ? decimalCount : minDecimal)}`;

  return Number(newValue);
};

export const setCookie = (key: string, data, options = {}) => {
  cookieCutter.set(key, data ? JSON.stringify(data) : data, {
    path: "/",
    ...options,
  });
};

export const getStepChart = (
  datasets: { data: number[] }[],
  fallbackMax = 100,
) => {
  const allData = [...datasets.map((item) => item.data).flat()];
  const maxData = Math.max(...allData.flat());

  let stepSize = maxData / 3;

  if (maxData > 5) {
    stepSize = Math.ceil(stepSize);
  }

  let max = stepSize * 4;
  let min = Math.min(...allData);

  if (max === 0 && min === 0) {
    max = fallbackMax;
    min = 0;
  }

  if (max == min) {
    max += 10;
  }

  return {
    max,
    stepSize,
    min,
  };
};

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}mo",
  xMonths: "{{count}}mo",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

export const shortDistance = (
  laterDate: DateArg<Date>,
  earlierDate: DateArg<Date>,
  options?: FormatDistanceOptions,
) => {
  return formatDistance(laterDate, earlierDate, {
    addSuffix: true,
    locale: {
      ...enUSLocale,
      formatDistance: (token, count, options = {}) => {
        const result = formatDistanceLocale[token].replace(
          "{{count}}",
          count.toString(),
        );

        if (options.addSuffix) {
          if (Number(options?.comparison) > 0) {
            return "in " + result;
          } else {
            return result + " ago";
          }
        }

        return result;
      },
    },
    ...options,
  });
};
export const getImageSizeFromUrl = (
  url: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = (err) => {
      reject(new Error("Loading image failed" + url));
    };
  });
};
export const isVideoUrl = (url: string): boolean => {
  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "m4v",
  ];

  try {
    const ext = new URL(url).pathname.split(".").pop()?.toLowerCase() || "";
    return videoExtensions.includes(ext);
  } catch {
    return false;
  }
};

export const getTime = (dateInput: string | number | Date) => {
  const now = new Date();
  const inputDate = new Date(dateInput);
  let diff = Math.max(
    0,
    Math.floor((now.getTime() - inputDate.getTime()) / 1000),
  );
  // let diff = Math.max(
  //   0,
  //   Math.floor(inputDate.getTime() - (now.getTime()) / 1000),
  // );
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = 30 * secondsInDay;
  const secondsInYear = 365 * secondsInDay;
  const years = Math.floor(diff / secondsInYear);
  diff %= secondsInYear;
  const months = Math.floor(diff / secondsInMonth);
  diff %= secondsInMonth;
  const days = Math.floor(diff / secondsInDay);
  diff %= secondsInDay;
  const hours = Math.floor(diff / secondsInHour);
  diff %= secondsInHour;
  const minutes = Math.floor(diff / secondsInMinute);
  const seconds = diff % secondsInMinute;
  if (years > 0) return `${years} ${years > 1 ? "years" : "year"}`;
  if (months > 0) return `${months} ${months > 1 ? "months" : "month"}`;
  if (days > 0) return `${days} ${days > 1 ? "days" : "day"}`;
  if (hours > 0) return `${hours} ${hours > 1 ? "hours" : "hour"}`;
  if (minutes > 0) return `${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
  return `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
};