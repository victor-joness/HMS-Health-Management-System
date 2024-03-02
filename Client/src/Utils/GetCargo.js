export default function getCargo(auth) {
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