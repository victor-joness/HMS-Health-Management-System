import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { Auth } from '@/entities/Auth'
import { Patient } from '@/entities/Patients'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  PatientStatus,
  Gender,
  BloodType,
  PatientFluxo,
  IdentificationType,
  PatientAtendimentTypeEnum,
  UserRoleEnum,
} from '@/utils/Enum'
import { converterStringParaData } from '@/utils/functions'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Main } from '@/components/layout/main'
import PacientesContainer from './components/PatientsContainer'
import { PatientActionDialog } from './components/patients-action-dialog'
import PatientsContextProvider, {
  PatientsDialogType,
} from './context/patients-context'

const Patients = ({ auth = null }: { auth: Auth | null }) => {
  const pacientesStatic: Patient[] = [
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
    {
      Id: 1,
      Medications: [],
      EmergencyContact: '88999999999',
      InsuranceDetailsId: 1,
      MedicalHistory: [],
      PreferredDoctorId: 1,
      LastVisitDate: '25/02/2024 10:00:00',
      CovidVaccinationStatus: true,
      Disabilities: [],
      OrganDonor: true,
      AdditionalNotes:
        'Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos',
      WorkInfo: 'Trabalha em casa',
      IdentificationNumber: '123456789',
      IdentificationType: IdentificationType.RG,
      PatientAtendimentType: PatientAtendimentTypeEnum.CONSULTA,
      Address: 'rua do centro, 123',
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: '25/02/2024 10:00:00',
      Report: {
        Gender: Gender.MASCULINO,
        Weight: 80,
        Height: 170,
        BloodPressure: '10/80',
        GlucoseLevel: 80,
        BloodType: BloodType.O_POSITIVO,
        Allergies: ['Amendoin'],
        HeartRate: 75,
        PatientStatus: PatientStatus.ALTA,
        PatientFluxo: PatientFluxo.INTERNADO,
        Symptoms: ['Dor de cabeça'],
        Exams: ['Exame de sangue', 'Exame de urina'],
        Medications: ['Dipirona'],
        Diagnosis: 'Dor de cabeça',
        Treatment: 'Descanso',
        ChronicDiseases: ['Diabetes'],
      },
      UserInfo: {
        Id: 1,
        Name: 'Victor Mesquita',
        Email: 'Teset@gmail.com',
        Age: '20',
        PhoneNumber: '88999999999',
        Img: 'https://tucurui.ifpa.edu.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
        Gender: Gender.MASCULINO,
        Role: UserRoleEnum.PACIENTE,
        CreationDate: '25/02/2024 10:00:00',
        ModifiedDate: null,
        DeletionDate: null,
      },
    },
  ]

  const [status, setStatus] = useState(true)
  const [searchPalavra, setSearchPalavra] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedPriority, setSelectedPriority] = useState()

  const [filteredItems, setFilteredItems] = useState(pacientesStatic)

  const handleFilterSubmit = (e: any) => {
    e.preventDefault()

    let searchCategoria =
      (window.document.getElementById('type') as HTMLSelectElement)?.value || ''

    let filteredByCategory = []
    if (
      searchCategoria == '1' ||
      searchCategoria == '2' ||
      searchCategoria == '4' ||
      searchCategoria == '6'
    ) {
      filteredByCategory = pacientesStatic.filter(
        (paciente) =>
          paciente.UserInfo?.Name.toLowerCase().includes(
            searchPalavra.toLowerCase()
          ) && paciente.Report?.PatientFluxo === Number(searchCategoria)
      )
    } else if (searchCategoria == '7') {
      filteredByCategory = pacientesStatic.filter((paciente) => {
        return (
          (paciente.UserInfo?.Name.toLowerCase().includes(
            searchPalavra.toLowerCase()
          ) &&
            paciente.Report?.PatientFluxo == 1) ||
          paciente.Report?.PatientFluxo == 2 ||
          paciente.Report?.PatientFluxo == 4
        )
      })
    } else if (
      searchCategoria == 'hoje' ||
      searchCategoria == 'mes' ||
      searchCategoria == 'ano'
    ) {
      if (searchCategoria == 'hoje') {
        filteredByCategory = pacientesStatic.filter((paciente) => {
          const dataInicio = converterStringParaData(paciente.LastVisitDate)
          const dataAtual = new Date()
          return (
            paciente.UserInfo?.Name.toLowerCase().includes(
              searchPalavra.toLowerCase()
            ) &&
            dataInicio.dia === dataAtual.getDate() &&
            dataInicio.mes === dataAtual.getMonth() + 1 &&
            dataInicio.ano === dataAtual.getFullYear()
          )
        })
      } else if (searchCategoria == 'mes') {
        filteredByCategory = pacientesStatic.filter((paciente) => {
          const dataInicio = converterStringParaData(paciente.LastVisitDate)
          const dataAtual = new Date()
          return (
            paciente.UserInfo?.Name.toLowerCase().includes(
              searchPalavra.toLowerCase()
            ) &&
            dataInicio.mes === dataAtual.getMonth() &&
            dataInicio.ano === dataAtual.getFullYear()
          )
        })
      } else {
        filteredByCategory = pacientesStatic.filter((paciente) => {
          const dataInicio = converterStringParaData(paciente.LastVisitDate)
          const dataAtual = new Date()
          const mesmoAno =
            dataInicio.ano === dataAtual.getFullYear() ||
            dataInicio.ano === dataAtual.getFullYear() - 1
          const nomeIncluido =
            searchPalavra.trim() === '' ||
            paciente.UserInfo?.Name.toLowerCase().includes(
              searchPalavra.toLowerCase()
            )
          return mesmoAno && nomeIncluido
        })
      }
    } else {
      filteredByCategory = pacientesStatic.filter((paciente) =>
        paciente.UserInfo?.Name.toLowerCase().includes(
          searchPalavra.toLowerCase()
        )
      )
    }

    const prioAtiva = Object.keys(prioridades).filter(
      (key) => prioridades[key as keyof typeof prioridades]
    )
    const filteredItems = filteredByCategory.filter((paciente) =>
      prioAtiva.includes(paciente.Report?.PatientStatus)
    )

    setFilteredItems(filteredItems)
  }

  const handleAddNewPatient = (e: any) => {
    console.log('add new patient')
    console.log(e)
  }

  const [prioridades, setPrioridade] = useState({
    NENHUM: true,
    ESTAVEL: true,
    NORMAL: true,
    ALTA: true,
    CRITICO: true,
    TODOS: true,
  })

  const [currentRow, setCurrentRow] = useState<Patient | null>(null)
  const [open, setOpen] = useDialogState<PatientsDialogType>(null)

  return (
    <PatientsContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main className='flex items-center justify-between flex-wrap w-full h-full'>
        {status ? (
          <div>
            <form id='' className='filters ' onSubmit={handleFilterSubmit}>
              <div className='flex flex-wrap flex-grow gap-4 pb-8 w-100% rounded-lg'>
                <Input
                  placeholder='Buscar por paciente'
                  className='w-full xl:w-[20rem] h-[2.5rem] text-[1.7rem] p-2 border border-gray-500 rounded-lg'
                  value={searchPalavra}
                  onChange={(e) => setSearchPalavra(e.target.value)}
                />
                <Select onValueChange={(value) => setSelectedType(value)}>
                  <SelectTrigger className='w-full lg:w-[20rem] h-[2.5rem] p-2 border border-gray-500 rounded-lg'>
                    <SelectValue placeholder='Escolher Categoria' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Em Espera</SelectItem>
                    <SelectItem value='2'>Em Atendimento</SelectItem>
                    <SelectItem value='4'>Internados</SelectItem>
                    <SelectItem value='7'>Não-Concluidos</SelectItem>
                    <SelectItem value='6'>Concluidos</SelectItem>
                    <SelectItem value='hoje'>Hoje</SelectItem>
                    <SelectItem value='mes'>Mês</SelectItem>
                    <SelectItem value='ano'>Ano</SelectItem>
                    <SelectItem value='todos'>Todos</SelectItem>
                  </SelectContent>
                </Select>

                <div className='flex'>
                  <Select
                    value={selectedPriority}
                    onValueChange={(value) => setSelectedPriority(value)}
                  >
                    <SelectTrigger className='w-[15rem] h-[2.5rem] p-2 border border-gray-500 rounded-lg'>
                      <SelectValue placeholder='Selecione a prioridade' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(prioridades).map(
                        ([prioridade, isActive]) => {
                          const corClass = (() => {
                            switch (prioridade) {
                              case 'CRITICO':
                                return 'bg-red-500'
                              case 'ALTA':
                                return 'bg-orange-500'
                              case 'NORMAL':
                                return 'bg-green-500'
                              case 'ESTAVEL':
                                return 'bg-blue-500'
                              case 'NENHUM':
                                return 'bg-purple-500'
                              default:
                                return 'bg-gray-100'
                            }
                          })()

                          return (
                            <SelectItem key={prioridade} value={prioridade}>
                              <div className='flex items-center gap-2'>
                                <div
                                  className={`w-3 h-3 rounded-full ${corClass}`}
                                />
                                <span>
                                  {prioridade.charAt(0).toUpperCase() +
                                    prioridade.slice(1).toLowerCase()}
                                </span>
                              </div>
                            </SelectItem>
                          )
                        }
                      )}
                    </SelectContent>
                  </Select>
                  <Button className='flex ml-3 justify-center items-center w-[10rem] h-[2.5rem] bg-[#ca79c6] text-white p-4 rounded-xl cursor-pointer transition-all hover:tracking-wider'>
                    {t('Common.Search')}
                  </Button>
                  {auth?.Role === UserRoleEnum.RECEPCIONISTA && (
                    <Button
                      className='flex ml-3 justify-center items-center w-[10rem] h-[2.5rem] bg-[#ca79c6] text-white p-4 rounded-xl cursor-pointer transition-all hover:tracking-wider'
                      onClick={() => setOpen('add')}
                    >
                      <span>{t('Pages.Patient.AddPatient')}</span>{' '}
                      <IconUserPlus size={18} />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            <div>
              <PacientesContainer pacientesData={filteredItems} />
            </div>

            <PatientActionDialog
              key='user-add'
              open={open === 'add'}
              onOpenChange={(isOpen) => {
                setOpen(isOpen ? 'add' : null)
              }}
            />
          </div>
        ) : (
          <div>qualquer coisa</div>
        )}
      </Main>
    </PatientsContextProvider>
  )
}

export default Patients
