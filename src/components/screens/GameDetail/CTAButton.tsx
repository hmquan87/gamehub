"use client";

import { Button, ButtonProps } from "@mui/material";
import { forwardRef } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { LinkProps } from "@/components/Link";

const CTA_BASE_SX: SxProps<Theme> = {
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  fontWeight: 600,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#f8fafc",
  position: "relative",
  overflow: "hidden",
  background: "rgba(5,5,15,0.88)",
  boxShadow: "0 12px 40px rgba(2,6,23,0.45)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  px: 4,
  py: 1.5,
  minWidth: 200,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 18px 50px rgba(2,6,23,0.55)",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    inset: -6,
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 50% 50%, rgba(250,204,21,0.2), rgba(5,5,15,0))",
    filter: "blur(8px)",
    opacity: 0.7,
    zIndex: 0,
  },
  "&::after": {
    content: "''",
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    padding: "2px",
    background:
      "linear-gradient(90deg, rgba(250,204,21,0), rgba(250,204,21,0.85), rgba(250,204,21,0))",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)" as any,
    WebkitMaskComposite: "xor" as any,
    maskComposite: "exclude",
    animation: "border-sheen 3s ease-in-out infinite",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
    zIndex: 1,
  },
  "& > span, & .MuiButton-startIcon, & .MuiButton-endIcon": {
    position: "relative",
    zIndex: 2,
  },
  "@keyframes border-sheen": {
    "0%": { backgroundPosition: "0% 50%" },
    "60%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "100% 50%" },
  },
};

const CTAButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & Partial<LinkProps>
>((props, ref) => {
  const { sx, variant = "contained", ...rest } = props;
  return (
    <Button
      ref={ref}
      variant={variant}
      sx={{ ...CTA_BASE_SX, ...sx }}
      {...rest}
    />
  );
});

CTAButton.displayName = "CTAButton";

export default CTAButton;
