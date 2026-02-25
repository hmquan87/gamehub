import { memo, useEffect, useRef, useState } from "react";
import { TextField, TextFieldProps } from "./shared";
import SearchIcon from "@/icons/SearchIcon";

type SearchProps = TextFieldProps & {
  onSearch?: (name: string, value: string) => void;
};

const Search = (props: SearchProps) => {
  const { name = "search", value, onSearch, sx, ...rest } = props;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [text, setText] = useState<string>((value as string) || "");

  const onChangeText = (newText) => {
    if (text == newText) return;

    setText(newText);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch?.(name, newText);
    }, 250);
  };

  useEffect(() => {
    setText((value as string) || "");
  }, [value]);

  return (
    <TextField
      placeholder="Search..."
      sx={{
        minHeight: 40,
        px: 3,
        maxWidth: 280,
        bgcolor: "background.paper",
        borderRadius: 250,
        ...sx,
      }}
      fullWidth
      endAdornment={<SearchIcon />}
      value={text}
      name={name}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

export default memo(Search);
