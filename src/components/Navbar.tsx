import { Box, Flex, Button, useColorMode, IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react'
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <MotionBox
      as="nav"
      position="fixed"
      w="100%"
      zIndex={1000}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        px={4}
        py={3}
        shadow="md"
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Box fontSize="2xl" fontWeight="bold" color="brand.500">
            Juls Nails
          </Box>
        </Link>

        <Flex align="center" gap={4}>
          <Link to="/turnos">
            <Button variant="ghost">Turnos</Button>
          </Link>

          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={<Avatar size="sm" name={user.displayName || undefined} />}
              >
                {user.displayName || 'Mi Cuenta'}
              </MenuButton>
              <MenuList>
                {user.isAdmin && (
                  <MenuItem onClick={() => navigate('/admin')}>
                    Panel de Administración
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">
              <Button colorScheme="brand">Iniciar Sesión</Button>
            </Link>
          )}

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </MotionBox>
  )
} 