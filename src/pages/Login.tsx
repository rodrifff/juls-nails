import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Divider,
  Container,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/turnos')
    } catch (error: any) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/turnos')
    } catch (error: any) {
      toast({
        title: 'Error al iniciar sesión con Google',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <VStack spacing={8} as="form" onSubmit={handleEmailLogin}>
          <Heading>Iniciar Sesión</Heading>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="brand"
            width="full"
            isLoading={loading}
          >
            Iniciar Sesión
          </Button>

          <Divider />

          <Button
            onClick={handleGoogleLogin}
            colorScheme="red"
            width="full"
            isLoading={loading}
          >
            Continuar con Google
          </Button>

          <Text>
            ¿No tienes cuenta?{' '}
            <Button
              variant="link"
              colorScheme="brand"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </Button>
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  )
} 