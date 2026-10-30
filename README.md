# SIREB · Sistema de Reservas (MVP React)
### INF-322: Diseño de Interfaces Usuarias · Universidad Técnica Federico Santa María

## Integrantes
* Matías Acuña
* Ariel Espinoza
* Catalina Pérez
* Santiago Cifuentes
* Martina Mardones

---

## Descripción del Proyecto
Este repositorio contiene el desarrollo del **Producto Mínimo Viable (MVP)** funcional para la plataforma **SIREB (sireb.usm.cl)** de Relaciones Estudiantiles. 

Este MVP en React resuelve dichas deficiencias como el agendamiento digital de todos los servicios mediante una interfaz responsiva.

---

## Stack Tecnológico
* **Frontend:** React 18
* **Empaquetador & Build Tool:** Webpack 5 + Babel
* **Estilos:** Tailwind CSS

---

## Link de Despliegue
https://magenta-alpaca-286e36.netlify.app/

---

## Metas de Usuario Implementadas (Lean UX)

El MVP da respuesta a las necesidades de la Persona **Joaquín** y valida las hipótesis de activación y retención priorizadas:

### 1. Agendamiento de Hora Psicológica 100% Online (Activación)
* **Objetivo:** Permitir agendar atención psicológica directamente desde la plataforma sin requerir gestiones presenciales ni formularios aislados.
* **Flujo:** `Dashboard` ➔ `Especialistas (Psicología)` ➔ `Selección de Modalidad (Presencial/Online), Día y Bloque` ➔ `Generación de Comprobante de Reserva`.

### 2. Detección de la Hora Disponible Más Cercana (Retención)
* **Objetivo:** Facilitar la obtención rápida de cupos prioritarios en períodos de alta demanda o estrés académico.
* **Flujo:** En la lista de profesionales, cada tarjeta destaca una etiqueta (*badge*) con disponibilidad inmediata (ej. `🟠 Próxima hora: Hoy, 15:30`), precargando el calendario con solo presionar «Reservar».

### 3. Visualización y Cancelación de Horas (Retención / Eficiencia)
* **Objetivo:** Disminuir la tasa de inasistencia y la carga administrativa manual de las secretarías permitiendo liberar cupos de forma remota.
* **Flujo:** `Mis Horas` ➔ Botón `Anular hora` ➔ `Modal de confirmación` ➔ Actualización en tiempo real a estado vacío y alerta visual (*Toast*).

---

## Estructura de Componentes

```text
src/
├── components/
│   ├── booking/        # Vistas de agendamiento (Dashboard, Especialistas, Calendario, Comprobante)
│   ├── common/         # Componentes transversales (Modal de confirmación, Notificaciones Toast)
│   ├── layout/         # Shell responsivo (Sidebar, DesktopHeader, MobileHeader, BottomNav, Drawer)
│   └── tramites/       # Módulos informativos (Socioeconómico, Declaración, CAE, TNE, Perfil)
├── data/
│   └── servicesData.js # Catálogo de especialidades, profesionales y horarios disponibles
├── App.jsx             # Manejo de estado global (booking, historial de vistas)
└── index.js            # Punto de entrada de la aplicación