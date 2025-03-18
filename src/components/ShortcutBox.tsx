import { Card, Flex, Text } from '@radix-ui/themes';

interface ShortcutItem {
  label: string;
  shortcut: string;
}

interface ShortcutBoxProps {
  shortcuts: ShortcutItem[];
}

export function ShortcutBox({ shortcuts }: ShortcutBoxProps) {
  return (
    <Card style={{
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      width: '400px',
      transition: 'background-color 0.2s',
    }}>
      {shortcuts.map((item, _) => (
        <div key={item.shortcut}>
          <Flex align="center" justify="between" p="2">
            <Text size="2" color="gray">
              {item.label}
            </Text>
            <Text style={{
              padding: '2px 10px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}>
              {item.shortcut}
            </Text>
          </Flex>
        </div>
      ))}
    </Card>
  );
} 