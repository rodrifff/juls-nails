import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, useToast, SimpleGrid, Button } from '@chakra-ui/react'
import { AppointmentCalendar } from '../components/AppointmentCalendar'
import { useAuth } from '../context/AuthContext'
import { createAppointment, getAvailableAppointments, Appointment } from '../services/appointments'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Appointments = () => {
  const { user } = useAuth()
  const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const toast = useToast()

  useEffect(() => {
    if (selectedDate) {
      loadAvailableAppointments(selectedDate)
    }
  }, [selectedDate])

  const loadAvailableAppointments = async (date: Date) => {
    try {
      const appointments = await getAvailableAppointments(date)
      setAvailableAppointments(appointments)
    } catch (error) {
      toast({
        title: 'Error al cargar los turnos disponibles',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleTimeSelect = async (date: Date) => {
    if (!user) {
      toast({
        title: 'Debes iniciar sesión para reservar un turno',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      await createAppointment({
        userId: user.uid,
        date,
        status: 'pending',
        userName: user.displayName || 'Usuario',
        userEmail: user.email || '',
      })

      toast({
        title: 'Turno reservado',
        description: `Tu turno ha sido reservado para el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      loadAvailableAppointments(date)
    } catch (error) {
      toast({
        title: 'Error al reservar el turno',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.xl" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Reserva tu Turno
        </Heading>
        <Text mb={8} textAlign="center">
          Selecciona el día y horario que más te convenga
        </Text>

        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxW="800px"
          mx="auto"
        >
          <AppointmentCalendar onSelectTime={handleTimeSelect} />
        </Box>

        {selectedDate && (
          <Box mt={8}>
            <Heading as="h2" size="md" mb={4}>
              Turnos disponibles para {selectedDate.toLocaleDateString()}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {availableAppointments.map((appointment) => (
                <MotionBox
                  key={appointment.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg={appointment.status === 'cancelled' ? 'gray.100' : 'white'}
                  >
                    <Text fontWeight="bold">
                      {new Date(appointment.date).toLocaleTimeString()}
                    </Text>
                    <Text>{appointment.userName}</Text>
                    <Text color="gray.500">{appointment.status}</Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </MotionBox>
    </Container>
  )
} 