const immediateAvailability = 'Disponibilidad Inmediata'

export const servicesData = {
  psicologia: {
    id: 'psicologia',
    title: 'Psicología',
    cardTitle: 'Psicología',
    description: 'Apoyo emocional',
    icon: '🧩',
    specialists: [
      { id: 'camila-herrera', name: 'Psic. Camila Herrera', specialty: 'Psicología clínica', availabilityLabel: immediateAvailability, tag: 'Hoy, 15:30', modality: 'Presencial / Online' },
      { id: 'rodrigo-salas', name: 'Psic. Rodrigo Salas', specialty: 'Orientación vocacional', availabilityLabel: immediateAvailability, tag: 'Mañana, 10:00', modality: 'Online' },
      { id: 'fernanda-iturra', name: 'Psic. Fernanda Iturra', specialty: 'Manejo de ansiedad', availabilityLabel: immediateAvailability, tag: 'Hoy, 17:00', modality: 'Presencial' }
    ]
  },
  dental: {
    id: 'dental',
    title: 'Servicio Dental',
    cardTitle: 'Servicio Dental',
    description: 'Odontología general',
    icon: '🦷',
    specialists: [
      { id: 'valentina-munoz', name: 'Dra. Valentina Muñoz', specialty: 'Odontología general', availabilityLabel: immediateAvailability, tag: 'Hoy, 16:00', modality: 'Presencial' },
      { id: 'ignacio-vera', name: 'Dr. Ignacio Vera', specialty: 'Urgencias dentales', availabilityLabel: immediateAvailability, tag: 'Mañana, 09:00', modality: 'Presencial' }
    ]
  },
  medico: {
    id: 'medico',
    title: 'Servicio Médico',
    cardTitle: 'Servicio Médico',
    description: 'Medicina general',
    icon: '🩺',
    specialists: [
      { id: 'sebastian-contreras', name: 'Dr. Sebastián Contreras', specialty: 'Medicina general', availabilityLabel: immediateAvailability, tag: 'Hoy, 12:30', modality: 'Presencial' },
      { id: 'antonia-reyes', name: 'Dra. Antonia Reyes', specialty: 'Medicina general', availabilityLabel: immediateAvailability, tag: 'Mañana, 08:30', modality: 'Presencial' }
    ]
  },
  kinesiologia: {
    id: 'kinesiologia',
    title: 'Kinesiología',
    cardTitle: 'Kinesiología',
    description: 'Rehabilitación física',
    icon: '🦵',
    specialists: [
      { id: 'matias-rojas', name: 'Klgo. Matías Rojas', specialty: 'Rehabilitación deportiva', availabilityLabel: immediateAvailability, tag: 'Hoy, 11:30', modality: 'Presencial' },
      { id: 'paula-fuentes', name: 'Klga. Paula Fuentes', specialty: 'Rehabilitación traumatológica', availabilityLabel: immediateAvailability, tag: 'Mañana, 14:00', modality: 'Presencial' }
    ]
  }
}

export const serviceList = Object.values(servicesData)

export const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30'
]

export const occupiedTimeSlots = ['10:00', '11:30', '16:30']
