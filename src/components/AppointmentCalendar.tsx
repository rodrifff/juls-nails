import { useState } from 'react'
import { Box, Button, Grid, Text, useToast } from '@chakra-ui/react'
import { format, addDays, isWithinInterval, setHours, setMinutes } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface AppointmentCalendarProps {
  onSelectTime: (date: Date) => void
}

export const AppointmentCalendar = ({ onSelectTime }: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const toast = useToast()

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6
  }

  const isWithinBusinessHours = (date: Date) => {
    const morningStart = setHours(setMinutes(date, 0), 8)
    const morningEnd = setHours(setMinutes(date, 0), 10)
    const afternoonStart = setHours(setMinutes(date, 0), 14)
    const afternoonEnd = setHours(setMinutes(date, 0), 19)

    return (
      isWithinInterval(date, { start: morningStart, end: morningEnd }) ||
      isWithinInterval(date, { start: afternoonStart, end: afternoonEnd })
    )
  }

  const generateTimeSlots = () => {
    const slots = []
    const currentDate = new Date(selectedDate)

    if (isWeekend(currentDate)) {
      return []
    }

    // Horario de la mañana (8:00 - 10:00)
    for (let hour = 8; hour < 10; hour++) {
      slots.push(setHours(setMinutes(currentDate, 0), hour))
    }

    // Horario de la tarde (14:00 - 19:00)
    for (let hour = 14; hour < 19; hour++) {
      slots.push(setHours(setMinutes(currentDate, 0), hour))
    }

    return slots
  }

  const handleDateSelect = (date: Date) => {
    if (isWeekend(date)) {
      toast({
        title: 'No se pueden seleccionar fines de semana',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: Date) => {
    if (!isWithinBusinessHours(time)) {
      toast({
        title: 'Horario no disponible',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    onSelectTime(time)
  }

  return (
    <Box>
      <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
        {Array.from({ length: 7 }).map((_, index) => {
          const date = addDays(new Date(), index)
          return (
            <MotionBox
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                w="100%"
                colorScheme={format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'brand' : 'gray'}
                onClick={() => handleDateSelect(date)}
                disabled={isWeekend(date)}
              >
                <Box>
                  <Text fontSize="sm">{format(date, 'EEE', { locale: es })}</Text>
                  <Text fontSize="lg">{format(date, 'd')}</Text>
                </Box>
              </Button>
            </MotionBox>
          )
        })}
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {generateTimeSlots().map((time, index) => (
          <MotionBox
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              w="100%"
              onClick={() => handleTimeSelect(time)}
            >
              {format(time, 'HH:mm')}
            </Button>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  )
} 