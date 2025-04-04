import { Box, Container, Heading, Text, Button, SimpleGrid, Image, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Home = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Container maxW="container.xl" py={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} align="center">
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" size="2xl" mb={4} color={textColor}>
            Juls Nails
          </Heading>
          <Text fontSize="xl" mb={8} color={textColor}>
            Tu lugar para lucir unas uñas hermosas y bien cuidadas. Ofrecemos servicios profesionales de manicura y pedicura con los mejores productos del mercado.
          </Text>
          <Link to="/turnos">
            <Button colorScheme="brand" size="lg">
              Reservar Turno
            </Button>
          </Link>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/nail-salon.jpg"
            alt="Salón de uñas"
            borderRadius="lg"
            shadow="lg"
          />
        </MotionBox>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          bg={bgColor}
          p={6}
          borderRadius="lg"
          shadow="md"
        >
          <Heading as="h3" size="md" mb={4}>
            Manicura
          </Heading>
          <Text>
            Servicios de manicura profesional con esmaltes de alta calidad y diseños personalizados.
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          bg={bgColor}
          p={6}
          borderRadius="lg"
          shadow="md"
        >
          <Heading as="h3" size="md" mb={4}>
            Pedicura
          </Heading>
          <Text>
            Tratamientos de pedicura para mantener tus pies saludables y hermosos.
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          bg={bgColor}
          p={6}
          borderRadius="lg"
          shadow="md"
        >
          <Heading as="h3" size="md" mb={4}>
            Diseños
          </Heading>
          <Text>
            Crea diseños únicos y personalizados para tus uñas con nuestros especialistas.
          </Text>
        </MotionBox>
      </SimpleGrid>
    </Container>
  )
} 