import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, Flex, Text, Box } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { globalStore } from '../store/globalStore.ts';
import { ShortcutBox } from '../components/ShortcutBox.tsx';

export function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    const success = await globalStore.auth.logout();
    if (success) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await globalStore.user.getUserData();
        const authState = await globalStore.auth.getAuthState();
        
        if (!userData || !authState.isAuthenticated) {
          await handleLogout();
          return;
        }
        
        setUsername(userData.username);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <Theme appearance="dark">
        <Flex justify="center" align="center" style={{ height: '100vh' }}>
          <Text size="2">Loading...</Text>
        </Flex>
      </Theme>
    );
  }

  const shortcuts = [
    { label: "Open servers list", shortcut: "Ctrl + Tab" },
    { label: "Open command palette", shortcut: "/" }
  ];

  return (
    <Theme appearance="dark" grayColor="mauve" radius="large" panelBackground="translucent">
      <Box style={{ height: '100vh', backgroundColor: '#1a1a1a' }}>
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          style={{
            height: '100%',
          }}
        >
          <Text 
            size="8" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '30px'
            }}
          >
            Welcome, {username}!
          </Text>

          <ShortcutBox shortcuts={shortcuts} />
        </Flex>
      </Box>
    </Theme>
  );
} 