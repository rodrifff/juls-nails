import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Badge,
  Select,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { getUserAppointments, updateAppointment, Appointment } from '../services/appointments'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const AdminPanel = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const allAppointments = await getUserAppointments('all')
      setAppointments(allAppointments)
    } catch (error) {
      toast({
        title: 'Error al cargar los turnos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (appointmentId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await updateAppointment(appointmentId, newStatus)
      toast({
        title: 'Estado actualizado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      loadAppointments()
    } catch (error) {
      toast({
        title: 'Error al actualizar el estado',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow'
      case 'confirmed':
        return 'green'
      case 'cancelled':
        return 'red'
      default:
        return 'gray'
    }
  }

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <Container maxW="container.xl" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h1" size="xl" mb={8}>
          Panel de Administración
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
          <Stat>
            <StatLabel>Total de Turnos</StatLabel>
            <StatNumber>{stats.total}</StatNumber>
            <StatHelpText>Este mes</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Pendientes</StatLabel>
            <StatNumber>{stats.pending}</StatNumber>
            <StatHelpText>Por confirmar</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Confirmados</StatLabel>
            <StatNumber>{stats.confirmed}</StatNumber>
            <StatHelpText>Activos</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Cancelados</StatLabel>
            <StatNumber>{stats.cancelled}</StatNumber>
            <StatHelpText>Este mes</StatHelpText>
          </Stat>
        </SimpleGrid>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Fecha</Th>
                <Th>Cliente</Th>
                <Th>Email</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appointment) => (
                <Tr key={appointment.id}>
                  <Td>
                    {format(new Date(appointment.date), "PPPp", { locale: es })}
                  </Td>
                  <Td>{appointment.userName}</Td>
                  <Td>{appointment.userEmail}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id!, e.target.value as any)}
                      size="sm"
                      width="150px"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="cancelled">Cancelado</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </MotionBox>
    </Container>
  )
} 