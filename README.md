# Portal de Publicaciones para Equipos de Marketing

Portal para crear y programar contenido digital sin depender del equipo de desarrollo, acelerando publicación y consistencia editorial.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** Next.js API Routes
- **Base de datos:** MongoDB Atlas (Mongoose)
- **Almacenamiento:** Cloudinary (imágenes)
- **Deploy:** Vercel

## Funcionalidades

- Crear, editar y eliminar publicaciones
- Editor de contenido con vista previa
- Subir imágenes de portada a Cloudinary
- Estados: borrador, publicado, programado
- Categorías y etiquetas
- Vista pública de artículos publicados
- Dashboard de administración

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Rybak1234/marketing-content-platform.git
cd marketing-content-platform
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
cp .env.example .env.local
```

- **MongoDB Atlas:** Crea un cluster gratuito en [mongodb.com/atlas](https://www.mongodb.com/atlas) y obtén la URI de conexión.
- **Cloudinary:** Crea una cuenta gratuita en [cloudinary.com](https://cloudinary.com) y obtén cloud name, API key y API secret.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 4. Deploy en Vercel

1. Sube el repo a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Agrega las variables de entorno en Vercel Dashboard
4. Deploy automático

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/posts/         # API REST de publicaciones
│   ├── dashboard/         # Panel de administración
│   └── page.tsx           # Página pública
├── components/            # Componentes reutilizables
├── lib/                   # Conexión a MongoDB
└── models/                # Modelos Mongoose
```
