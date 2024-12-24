import { UserRole, Gender, TypeFile } from "./Enum";
import { HeartRateRange } from "../Types/TypesExport";

interface Auth {
  role: UserRole;
}

function getRole(auth: Auth): string | undefined {
  switch (auth.role) {
    case UserRole.ADMIN:
      return "Admin";
    case UserRole.DOUTOR:
      return "Doutor";
    case UserRole.ENFERMEIRA:
      return "Enfermeira";
    case UserRole.PACIENTE:
      return "Paciente";
    case UserRole.VIEWER:
      return "Viewer";
    default:
      return undefined;
  }
}

function calculateHeartRate(
  frequenciaCardiaca: number,
  idade: number,
  sexo: Gender
): string {
  const ranges: { [key: string]: HeartRateRange[] } = {
    "0-2": [{ Min: 120, Max: 140, Color: "verde" }], // Crianças de até 2 anos
    "8-17": [{ Min: 80, Max: 100, Color: "amarelo" }], // De 8 a 17 anos
    "18-65": [
      { Min: 73, Max: 78, Color: "vermelho", Gender: Gender.FEMININO },
      { Min: 70, Max: 76, Color: "vermelho", Gender: Gender.MASCULINO },
      { Min: 70, Max: 76, Color: "vermelho", Gender: Gender.OUTRO },
    ], // De 18 a 65 anos
  };

  // Determinar o intervalo de idade correspondente
  const ageGroup =
    idade <= 2 ? "0-2" : idade >= 8 && idade <= 17 ? "8-17" : "18-65";

  const groupRanges = ranges[ageGroup];

  if (groupRanges) {
    for (const range of groupRanges) {
      if (
        frequenciaCardiaca >= range.Min &&
        frequenciaCardiaca <= range.Max &&
        (!range.Gender || range.Gender === sexo)
      ) {
        return range.Color;
      }
    }
  }

  return "indefinido";
}

function isUrlOrFileName(imagePath: string): string {
  const urlPattern = /^https?:\/\//i;
  const filePattern = /^[\w,\s-]+\.(jpg|jpeg|png|gif|webp|svg)$/i;

  if (urlPattern.test(imagePath)) {
    return TypeFile.URL;
  } else if (filePattern.test(imagePath)) {
    return TypeFile.FILE;
  } else {
    return TypeFile.INVALID;
  }
}

export { calculateHeartRate, getRole, isUrlOrFileName };
