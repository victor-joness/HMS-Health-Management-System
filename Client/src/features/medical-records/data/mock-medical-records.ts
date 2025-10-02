import { MedicalRecord } from '@/entities/MedicalRecord'

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'MR001',
    patientId: 'P001',
    patientName: 'João Silva',
    status: 'Ativo',
    department: 'Cardiologia',
    doctorName: 'Dr. Ricardo Souza',
    doctorId: 'D001',
    admissionDate: '2024-01-15',
    lastUpdate: '2024-01-20',
    priority: 'Alta',
    chiefComplaint: 'Dor no peito e falta de ar',
    currentIllness: 'Paciente relata dor no peito há 3 dias, piorando com esforço físico',
    pastMedicalHistory: 'Hipertensão arterial, diabetes tipo 2',
    familyHistory: 'Pai faleceu de infarto aos 60 anos',
    socialHistory: 'Fumante há 20 anos, sedentário',
    assessment: 'Paciente apresenta quadro sugestivo de angina pectoris',
    diagnosis: ['Angina pectoris', 'Hipertensão arterial', 'Diabetes mellitus tipo 2'],
    differentialDiagnosis: ['Infarto agudo do miocárdio', 'Pericardite', 'Pneumonia'],
    vitalSigns: {
      bloodPressure: '140/90',
      heartRate: 85,
      temperature: 36.8,
      respiratoryRate: 18,
      oxygenSaturation: 96,
      weight: 75,
      height: 170
    },
    treatmentPlan: {
      medications: [
        {
          name: 'AAS 100mg',
          dosage: '100mg',
          frequency: '1x ao dia',
          duration: 'Indefinido',
          instructions: 'Tomar pela manhã'
        },
        {
          name: 'Atenolol 50mg',
          dosage: '50mg',
          frequency: '1x ao dia',
          duration: 'Indefinido',
          instructions: 'Tomar pela manhã'
        }
      ],
      procedures: [
        {
          name: 'Cateterismo cardíaco',
          description: 'Avaliação das artérias coronárias',
          date: '2024-01-22',
          doctor: 'Dr. Ricardo Souza'
        }
      ],
      recommendations: [
        'Suspender tabagismo',
        'Iniciar atividade física moderada',
        'Controle rigoroso da pressão arterial'
      ],
      followUp: 'Retorno em 7 dias'
    },
    progressNotes: [
      {
        date: '2024-01-20',
        time: '09:00',
        doctor: 'Dr. Ricardo Souza',
        note: 'Paciente evoluiu bem, dor no peito melhorou significativamente',
        vitalSigns: {
          bloodPressure: '135/85',
          heartRate: 78,
          temperature: 36.7,
          respiratoryRate: 16,
          oxygenSaturation: 98
        }
      }
    ],
    laboratoryTests: [
      {
        id: 'LAB001',
        name: 'Hemograma completo',
        date: '2024-01-16',
        results: 'Normal',
        status: 'Concluído',
        notes: 'Hemograma dentro dos parâmetros normais'
      },
      {
        id: 'LAB002',
        name: 'Troponina I',
        date: '2024-01-16',
        results: '0.02 ng/mL',
        status: 'Concluído',
        notes: 'Troponina normal, descarta infarto'
      }
    ],
    imagingTests: [
      {
        id: 'IMG001',
        type: 'Radiografia de tórax',
        date: '2024-01-16',
        results: 'Normal',
        status: 'Concluído',
        notes: 'Radiografia sem alterações significativas'
      }
    ],
    prescriptions: [
      {
        id: 'PRESC001',
        date: '2024-01-15',
        doctor: 'Dr. Ricardo Souza',
        medications: [
          {
            name: 'AAS 100mg',
            dosage: '100mg',
            frequency: '1x ao dia',
            duration: 'Indefinido',
            instructions: 'Tomar pela manhã'
          }
        ],
        status: 'Ativa'
      }
    ],
    nursingNotes: [
      {
        date: '2024-01-20',
        time: '08:00',
        nurse: 'Enf. Maria Santos',
        note: 'Paciente dormiu bem, sem queixas',
        vitalSigns: {
          bloodPressure: '135/85',
          heartRate: 78,
          temperature: 36.7,
          respiratoryRate: 16,
          oxygenSaturation: 98
        }
      }
    ]
  },
  {
    id: 'MR002',
    patientId: 'P002',
    patientName: 'Maria Oliveira',
    status: 'Finalizado',
    department: 'Neurologia',
    doctorName: 'Dra. Ana Pereira',
    doctorId: 'D002',
    admissionDate: '2024-01-10',
    dischargeDate: '2024-01-18',
    lastUpdate: '2024-01-18',
    priority: 'Média',
    chiefComplaint: 'Dor de cabeça intensa',
    currentIllness: 'Paciente relata cefaleia há 5 dias, de forte intensidade',
    pastMedicalHistory: 'Migrânea',
    familyHistory: 'Mãe com história de enxaqueca',
    socialHistory: 'Estudante universitária, estressada com provas',
    assessment: 'Paciente apresenta quadro de cefaleia tensional',
    diagnosis: ['Cefaleia tensional'],
    differentialDiagnosis: ['Migrânea', 'Hemorragia subaracnóidea', 'Tumor cerebral'],
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: 36.5,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 60,
      height: 165
    },
    treatmentPlan: {
      medications: [
        {
          name: 'Dipirona 500mg',
          dosage: '500mg',
          frequency: '6/6h',
          duration: '5 dias',
          instructions: 'Tomar quando necessário'
        }
      ],
      procedures: [],
      recommendations: [
        'Evitar estresse',
        'Praticar técnicas de relaxamento',
        'Manter boa higiene do sono'
      ],
      followUp: 'Retorno em 30 dias'
    },
    progressNotes: [
      {
        date: '2024-01-18',
        time: '10:00',
        doctor: 'Dra. Ana Pereira',
        note: 'Paciente evoluiu bem, dor de cabeça melhorou',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: 72,
          temperature: 36.5,
          respiratoryRate: 16,
          oxygenSaturation: 98
        }
      }
    ],
    laboratoryTests: [
      {
        id: 'LAB003',
        name: 'Hemograma completo',
        date: '2024-01-11',
        results: 'Normal',
        status: 'Concluído',
        notes: 'Hemograma normal'
      }
    ],
    imagingTests: [
      {
        id: 'IMG002',
        type: 'Tomografia computadorizada de crânio',
        date: '2024-01-11',
        results: 'Normal',
        status: 'Concluído',
        notes: 'TC sem alterações'
      }
    ],
    prescriptions: [
      {
        id: 'PRESC002',
        date: '2024-01-10',
        doctor: 'Dra. Ana Pereira',
        medications: [
          {
            name: 'Dipirona 500mg',
            dosage: '500mg',
            frequency: '6/6h',
            duration: '5 dias',
            instructions: 'Tomar quando necessário'
          }
        ],
        status: 'Finalizada'
      }
    ],
    nursingNotes: [
      {
        date: '2024-01-18',
        time: '09:00',
        nurse: 'Enf. João Silva',
        note: 'Paciente para alta, orientações fornecidas',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: 72,
          temperature: 36.5,
          respiratoryRate: 16,
          oxygenSaturation: 98
        }
      }
    ],
    discharge: {
      date: '2024-01-18',
      doctor: 'Dra. Ana Pereira',
      diagnosis: ['Cefaleia tensional'],
      treatment: 'Dipirona 500mg 6/6h por 5 dias',
      medications: ['Dipirona 500mg'],
      followUp: 'Retorno em 30 dias',
      instructions: 'Evitar estresse, praticar técnicas de relaxamento'
    }
  },
  {
    id: 'MR003',
    patientId: 'P003',
    patientName: 'Pedro Santos',
    status: 'Ativo',
    department: 'Ortopedia',
    doctorName: 'Dr. Fernando Costa',
    doctorId: 'D003',
    admissionDate: '2024-01-19',
    lastUpdate: '2024-01-21',
    priority: 'Urgente',
    chiefComplaint: 'Fratura de fêmur direito',
    currentIllness: 'Paciente sofreu queda de escada, fratura exposta',
    pastMedicalHistory: 'Hipertensão arterial',
    familyHistory: 'Sem história familiar relevante',
    socialHistory: 'Aposentado, mora sozinho',
    assessment: 'Paciente apresenta fratura exposta de fêmur direito',
    diagnosis: ['Fratura exposta de fêmur direito'],
    differentialDiagnosis: ['Fratura fechada', 'Luxação', 'Contusão'],
    vitalSigns: {
      bloodPressure: '150/95',
      heartRate: 95,
      temperature: 37.2,
      respiratoryRate: 20,
      oxygenSaturation: 94,
      weight: 80,
      height: 175
    },
    treatmentPlan: {
      medications: [
        {
          name: 'Cefazolina 1g',
          dosage: '1g',
          frequency: '8/8h',
          duration: '7 dias',
          instructions: 'Antibioticoterapia profilática'
        },
        {
          name: 'Dipirona 1g',
          dosage: '1g',
          frequency: '6/6h',
          duration: '5 dias',
          instructions: 'Analgesia'
        }
      ],
      procedures: [
        {
          name: 'Redução e fixação interna',
          description: 'Osteossíntese com placa e parafusos',
          date: '2024-01-20',
          doctor: 'Dr. Fernando Costa'
        }
      ],
      recommendations: [
        'Imobilização por 6 semanas',
        'Fisioterapia após 6 semanas',
        'Controle de infecção'
      ],
      followUp: 'Retorno em 7 dias'
    },
    progressNotes: [
      {
        date: '2024-01-21',
        time: '14:00',
        doctor: 'Dr. Fernando Costa',
        note: 'Paciente evoluiu bem pós-operatório, sem sinais de infecção',
        vitalSigns: {
          bloodPressure: '140/90',
          heartRate: 85,
          temperature: 36.8,
          respiratoryRate: 18,
          oxygenSaturation: 96
        }
      }
    ],
    laboratoryTests: [
      {
        id: 'LAB004',
        name: 'Hemograma completo',
        date: '2024-01-19',
        results: 'Leucocitose discreta',
        status: 'Concluído',
        notes: 'Leucócitos 12.000/mm³'
      }
    ],
    imagingTests: [
      {
        id: 'IMG003',
        type: 'Radiografia de fêmur direito',
        date: '2024-01-19',
        results: 'Fratura exposta terço médio',
        status: 'Concluído',
        notes: 'Fratura exposta confirmada'
      }
    ],
    prescriptions: [
      {
        id: 'PRESC003',
        date: '2024-01-19',
        doctor: 'Dr. Fernando Costa',
        medications: [
          {
            name: 'Cefazolina 1g',
            dosage: '1g',
            frequency: '8/8h',
            duration: '7 dias',
            instructions: 'Antibioticoterapia profilática'
          }
        ],
        status: 'Ativa'
      }
    ],
    nursingNotes: [
      {
        date: '2024-01-21',
        time: '13:00',
        nurse: 'Enf. Carlos Lima',
        note: 'Paciente sem queixas, curativo limpo',
        vitalSigns: {
          bloodPressure: '140/90',
          heartRate: 85,
          temperature: 36.8,
          respiratoryRate: 18,
          oxygenSaturation: 96
        }
      }
    ]
  },
  {
    id: 'MR004',
    patientId: 'P004',
    patientName: 'Ana Costa',
    status: 'Arquivado',
    department: 'Pediatria',
    doctorName: 'Dra. Mariana Lima',
    doctorId: 'D004',
    admissionDate: '2023-12-15',
    dischargeDate: '2023-12-20',
    lastUpdate: '2023-12-20',
    priority: 'Baixa',
    chiefComplaint: 'Febre e tosse',
    currentIllness: 'Criança com febre há 3 dias, tosse produtiva',
    pastMedicalHistory: 'Sem antecedentes patológicos',
    familyHistory: 'Sem história familiar relevante',
    socialHistory: 'Criança de 5 anos, frequenta escola',
    assessment: 'Paciente apresenta quadro de pneumonia',
    diagnosis: ['Pneumonia viral'],
    differentialDiagnosis: ['Bronquiolite', 'Asma', 'Tuberculose'],
    vitalSigns: {
      bloodPressure: '90/60',
      heartRate: 100,
      temperature: 38.5,
      respiratoryRate: 25,
      oxygenSaturation: 92,
      weight: 20,
      height: 110
    },
    treatmentPlan: {
      medications: [
        {
          name: 'Paracetamol 200mg',
          dosage: '200mg',
          frequency: '6/6h',
          duration: '5 dias',
          instructions: 'Para febre'
        }
      ],
      procedures: [],
      recommendations: [
        'Repouso',
        'Hidratação adequada',
        'Retorno se piorar'
      ],
      followUp: 'Retorno em 7 dias'
    },
    progressNotes: [
      {
        date: '2023-12-20',
        time: '11:00',
        doctor: 'Dra. Mariana Lima',
        note: 'Paciente evoluiu bem, sem febre há 2 dias',
        vitalSigns: {
          bloodPressure: '90/60',
          heartRate: 90,
          temperature: 36.8,
          respiratoryRate: 20,
          oxygenSaturation: 96
        }
      }
    ],
    laboratoryTests: [
      {
        id: 'LAB005',
        name: 'Hemograma completo',
        date: '2023-12-16',
        results: 'Leucocitose',
        status: 'Concluído',
        notes: 'Leucócitos 15.000/mm³'
      }
    ],
    imagingTests: [
      {
        id: 'IMG004',
        type: 'Radiografia de tórax',
        date: '2023-12-16',
        results: 'Infiltrado pulmonar',
        status: 'Concluído',
        notes: 'Infiltrado no lobo inferior direito'
      }
    ],
    prescriptions: [
      {
        id: 'PRESC004',
        date: '2023-12-15',
        doctor: 'Dra. Mariana Lima',
        medications: [
          {
            name: 'Paracetamol 200mg',
            dosage: '200mg',
            frequency: '6/6h',
            duration: '5 dias',
            instructions: 'Para febre'
          }
        ],
        status: 'Finalizada'
      }
    ],
    nursingNotes: [
      {
        date: '2023-12-20',
        time: '10:00',
        nurse: 'Enf. Paula Santos',
        note: 'Paciente para alta, orientações fornecidas aos pais',
        vitalSigns: {
          bloodPressure: '90/60',
          heartRate: 90,
          temperature: 36.8,
          respiratoryRate: 20,
          oxygenSaturation: 96
        }
      }
    ],
    discharge: {
      date: '2023-12-20',
      doctor: 'Dra. Mariana Lima',
      diagnosis: ['Pneumonia viral'],
      treatment: 'Paracetamol 200mg 6/6h por 5 dias',
      medications: ['Paracetamol 200mg'],
      followUp: 'Retorno em 7 dias',
      instructions: 'Repouso, hidratação adequada'
    }
  }
] 