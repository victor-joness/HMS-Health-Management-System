function getCargo(auth) {
  if (auth.isAdmin) {
    return "Admin";
  } else if (auth.isDoutor) {
    return "Doutor";
  } else if (auth.isEnfermeira) {
    return "Enfermeira";
  } else if (auth.isPaciente) {
    return "Paciente";
  } else {
    return "Undefined";
  }
}

function calcularFrequencia(frequenciaCardiaca, idade, sexo) {
  if (idade <= 2 && frequenciaCardiaca >= 120 && frequenciaCardiaca <= 140) {
    return "verde"; // Crianças de até 2 anos: 120 a 140 bpm
  } else if (
    idade >= 8 &&
    idade <= 17 &&
    frequenciaCardiaca >= 80 &&
    frequenciaCardiaca <= 100
  ) {
    return "amarelo"; // De 8 até 17 anos: 80 a 100 bpm
  } else if (idade >= 18 && idade <= 65) {
    if (
      sexo === "FEMININO" &&
      frequenciaCardiaca >= 73 &&
      frequenciaCardiaca <= 78
    ) {
      return "vermelho"; // Mulheres de 18 a 65 anos: 73 a 78 bpm
    } else if (
      sexo === "MASCULINO" &&
      frequenciaCardiaca >= 70 &&
      frequenciaCardiaca <= 76
    ) {
      return "vermelho"; // Homens de 18 a 65 anos: 70 a 76 bpm
    } else if (
      sexo === "OUTRO" &&
      frequenciaCardiaca >= 70 &&
      frequenciaCardiaca <= 76
    ) {
      return "vermelho"; // Outros de 18 a 65 anos: 70 a 76 bpm
    }
  }
  return "indefinido"; // Cor padrão
}

export {calcularFrequencia, getCargo};