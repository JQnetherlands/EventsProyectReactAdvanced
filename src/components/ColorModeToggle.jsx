import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useTheme } from "next-themes";

export function ColorModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme ?? resolvedTheme;
  const isActive = (mode) => current === mode;
  if (!mounted) return null;

  return (
    <ButtonGroup size="sm" isAttached>
      <Button
        onClick={() => setTheme("light")}
        variant={isActive("light") ? "solid" : "ghost"}
        colorPalette="teal"
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        variant={isActive("dark") ? "solid" : "ghost"}
        colorPalette="teal"
      >
        Dark
      </Button>
      <Button
        onClick={() => setTheme("system")}
        variant={isActive("system") ? "solid" : "ghost"}
        colorPalette="teal"
      >
        System
      </Button>
    </ButtonGroup>
  );
}
