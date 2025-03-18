import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, Flex, Text, Box, Card, Button } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import '@radix-ui/themes/styles.css';
import { globalStore } from '../store/globalStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await globalStore.auth.register(
        formData.email,
        formData.password,
        formData.username
      );
      
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Theme appearance="dark" grayColor="mauve" radius="large" panelBackground="translucent">
      <Box style={{ 
        height: '100vh', 
        backgroundColor: '#1a1a1a',
        padding: '20px'
      }}>
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          style={{ height: '100%' }}
        >
          <Card 
            style={{ 
              width: '100%', 
              maxWidth: '360px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Form.Root onSubmit={handleSubmit}>
              <Flex direction="column" gap="2" p="2" style={{ width: '100%' }}>
                <Text 
                  size="6" 
                  align="center" 
                  weight="medium"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '16px'
                  }}
                >
                  Create account
                </Text>

                {error && (
                  <Text 
                    size="2" 
                    align="center" 
                    style={{ color: '#ef4444' }}
                  >
                    {error}
                  </Text>
                )}

                <Form.Field name="username" className="FormField">
                  <Form.Label style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Username
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      value={formData.username}
                      onChange={handleChange('username')}
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        padding: '8px 1px',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      required
                    />
                  </Form.Control>
                  <Form.Message 
                    match="valueMissing" 
                    style={{ 
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}
                  >
                    Please enter your username
                  </Form.Message>
                </Form.Field>

                <Form.Field name="email" className="FormField">
                  <Form.Label style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Email
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        padding: '8px 1px',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      required
                    />
                  </Form.Control>
                  <Form.Message 
                    match="valueMissing"
                    style={{ 
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}
                  >
                    Please enter your email
                  </Form.Message>
                  <Form.Message 
                    match="typeMismatch"
                    style={{ 
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}
                  >
                    Please provide a valid email
                  </Form.Message>
                </Form.Field>

                <Form.Field name="password" className="FormField">
                  <Form.Label style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Password
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={handleChange('password')}
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        padding: '8px 1px',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      required
                      minLength={6}
                    />
                  </Form.Control>
                  <Form.Message 
                    match="valueMissing"
                    style={{ 
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}
                  >
                    Please enter your password
                  </Form.Message>
                  <Form.Message 
                    match="tooShort"
                    style={{ 
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}
                  >
                    Password must be at least 6 characters
                  </Form.Message>
                </Form.Field>

                <Form.Submit asChild>
                  <Button 
                    size="3"
                    disabled={isLoading}
                    style={{ 
                      width: '100%',
                      backgroundColor: '#4f46e5',
                      marginTop: '16px'
                    }}
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </Form.Submit>

                <Flex justify="center" style={{ marginTop: '16px' }}>
                  <Text 
                    size="2" 
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    Already have an account?{' '}
                    <Text 
                      asChild
                      style={{ 
                        color: '#4f46e5',
                        cursor: 'pointer',
                        textDecoration: 'none'
                      }}
                    >
                      <span onClick={() => !isLoading && navigate('/login')}>
                        Sign in
                      </span>
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Form.Root>
          </Card>
        </Flex>
      </Box>
    </Theme>
  );
} 