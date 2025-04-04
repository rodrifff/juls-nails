# Juls Nails

Aplicación web para la gestión de turnos de manicura y pedicura.

## Características

- Autenticación de usuarios
- Sistema de reserva de turnos
- Panel de administración
- Interfaz moderna y responsive
- Modo oscuro/claro
- Animaciones y transiciones suaves

## Tecnologías

- React
- TypeScript
- Vite
- Chakra UI
- Tailwind CSS
- Firebase
- Framer Motion

## Requisitos

- Node.js 16+
- npm 7+

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/juls-nails.git
cd juls-nails
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus credenciales de Firebase.

4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la aplicación construida
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código

## Estructura del proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── context/        # Contextos de React
  ├── pages/          # Páginas de la aplicación
  ├── services/       # Servicios y API
  ├── styles/         # Estilos globales
  ├── theme.ts        # Configuración del tema
  ├── App.tsx         # Componente principal
  └── main.tsx        # Punto de entrada
```

## Licencia

MIT
