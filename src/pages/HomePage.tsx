import { JSX } from "react";
import { Theme, Flex, Text, Box } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { ShortcutBox } from "../components/ShortcutBox.tsx";

const shortcuts = [
  { label: "Open servers list", shortcut: "Ctrl + Tab" },
  { label: "Open command palette", shortcut: "/" },
];

export function HomePage(): JSX.Element {
  return (
    <Theme
      appearance="dark"
      grayColor="mauve"
      radius="large"
      panelBackground="translucent"
    >
      <Box style={{ height: "100vh", backgroundColor: "#1a1a1a" }}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            height: "100%",
          }}
        >
          <Text
            size="8"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "30px",
            }}
          >
            Welcome, {}!
          </Text>

          <ShortcutBox shortcuts={shortcuts} />
        </Flex>
      </Box>
    </Theme>
  );
}
