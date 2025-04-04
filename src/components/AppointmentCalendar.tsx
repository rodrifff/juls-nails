import { useState } from 'react'
import { Box, Grid, Button, Text, useToast } from '@chakra-ui/react'
import { format, addDays, isWeekend, setHours, setMinutes, isBefore } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAuth } from '../context/AuthContext'
import { createAppointment } from '../services/appointments'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { user } = useAuth()
  const toast = useToast()

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i)
      if (!isWeekend(date)) {
        dates.push(date)
      }
    }
    return dates
  }

  const generateTimeSlots = (date: Date) => {
    const slots = []
    const startHour = 9
    const endHour = 18

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes of [0, 30]) {
        const time = setMinutes(setHours(date, hour), minutes)
        if (!isBefore(time, new Date())) {
          slots.push(time)
        }
      }
    }
    return slots
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = async (time: Date) => {
    if (!user) {
      toast({
        title: 'Debes iniciar sesión',
        description: 'Para reservar un turno necesitas estar registrado',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      await createAppointment({
        userId: user.uid,
        date: time,
        status: 'pending',
        userName: user.displayName || 'Usuario',
        userEmail: user.email || '',
      })

      toast({
        title: 'Turno reservado',
        description: `Tu turno ha sido reservado para el ${format(time, "PPPp", { locale: es })}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setSelectedDate(null)
    } catch (error) {
      toast({
        title: 'Error al reservar el turno',
        description: 'Por favor intenta nuevamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Selecciona una fecha:
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={4} mb={6}>
        {generateDates().map((date) => (
          <MotionBox
            key={date.toISOString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleDateSelect(date)}
              colorScheme={selectedDate?.toDateString() === date.toDateString() ? 'brand' : 'gray'}
              width="100%"
              height="auto"
              py={2}
            >
              <Box>
                <Text>{format(date, "EEEE", { locale: es })}</Text>
                <Text>{format(date, "d MMM", { locale: es })}</Text>
              </Box>
            </Button>
          </MotionBox>
        ))}
      </Grid>

      {selectedDate && (
        <>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Horarios disponibles:
          </Text>
          <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={4}>
            {generateTimeSlots(selectedDate).map((time) => (
              <MotionBox
                key={time.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleTimeSelect(time)}
                  colorScheme="brand"
                  variant="outline"
                  width="100%"
                >
                  {format(time, "HH:mm")}
                </Button>
              </MotionBox>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
} 