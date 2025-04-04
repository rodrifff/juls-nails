import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { AppointmentCalendar } from '../components/AppointmentCalendar'

export const Appointments = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" mb={4}>
          Reserva tu turno
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Selecciona el día y horario que prefieras para tu cita
        </Text>
      </Box>
      
      <Box 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="md"
        maxW="container.lg"
        mx="auto"
      >
        <AppointmentCalendar />
      </Box>
    </Container>
  )
} 