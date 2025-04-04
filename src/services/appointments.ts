import { db } from './firebase'
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { format } from 'date-fns'

export interface Appointment {
  id?: string
  userId: string
  date: Date
  status: 'pending' | 'confirmed' | 'cancelled'
  userName: string
  userEmail: string
}

export const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointment,
      date: format(appointment.date, 'yyyy-MM-dd HH:mm'),
    })
    return { ...appointment, id: docRef.id }
  } catch (error) {
    console.error('Error al crear el turno:', error)
    throw error
  }
}

export const getUserAppointments = async (userId: string) => {
  try {
    const q = userId === 'all' 
      ? collection(db, 'appointments')
      : query(collection(db, 'appointments'), where('userId', '==', userId))
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: new Date(doc.data().date),
    })) as Appointment[]
  } catch (error) {
    console.error('Error al obtener los turnos:', error)
    throw error
  }
}

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status: 'cancelled',
    })
  } catch (error) {
    console.error('Error al cancelar el turno:', error)
    throw error
  }
}

export const updateAppointment = async (appointmentId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status: newStatus,
    })
  } catch (error) {
    console.error('Error al actualizar el turno:', error)
    throw error
  }
}

export const getAvailableAppointments = async (date: Date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd')
    const q = query(
      collection(db, 'appointments'),
      where('date', '>=', `${formattedDate} 00:00`),
      where('date', '<=', `${formattedDate} 23:59`),
      where('status', '!=', 'cancelled')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: new Date(doc.data().date),
    })) as Appointment[]
  } catch (error) {
    console.error('Error al obtener los turnos disponibles:', error)
    throw error
  }
} 