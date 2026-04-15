# bci-dashboard-mf

Microfrontend encargado de mostrar el **dashboard financiero y climático**, consumiendo datos desde el Backend-for-Frontend (BFF).

---

# Tecnologías utilizadas

- React
- Vite
- TypeScript
- CSS (estilos personalizados)
- single-spa (integración con root-config)

---

# Descripción

Este microfrontend muestra un widget que combina:

- Información del clima
- Precio actual de Bitcoin

Los datos son obtenidos desde el BFF mediante el endpoint: /api/dashboard/widget


---

#  Rol en la arquitectura
root-config (single-spa)
↓
bci-dashboard-mf (este proyecto)
↓
backend (BFF)


---

# Requisitos

- Node.js 20+
- npm

---

# ▶Ejecución en local

```bash
npm install
npm run dev
```
---

#  Configuración

Este proyecto utiliza variables de entorno:

VITE_API_URL=http://localhost:3000