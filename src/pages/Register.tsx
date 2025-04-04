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
  Container,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      
      toast({
        title: 'Registro exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/turnos')
    } catch (error: any) {
      toast({
        title: 'Error al registrar',
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
        <VStack spacing={8} as="form" onSubmit={handleRegister}>
          <Heading>Crear Cuenta</Heading>

          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </FormControl>

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
            Registrarse
          </Button>

          <Text>
            ¿Ya tienes cuenta?{' '}
            <Button
              variant="link"
              colorScheme="brand"
              onClick={() => navigate('/login')}
            >
              Inicia Sesión
            </Button>
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  )
} 