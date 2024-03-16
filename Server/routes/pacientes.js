const router = require("express").Router();

// GET ALL USERS
router.get("/getPacientes", async (req, res) => {
  try {
    const [pacientes, fields] = await req.dbConnection.query(
      "SELECT * FROM pacientes INNER JOIN pacientesinfos ON pacientes.id = pacientesinfos.PacienteID"
    );
    res.status(200).send(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os pacientes");
  } finally {
    // Vai liberar a pool automaticamente.
  }
});

router.get("/getPaciente/:id", async (req, res) => {
  try {
    const [pacienteRequest, fields] = await req.dbConnection.query(
      "SELECT * FROM pacientes INNER JOIN pacientesinfos ON pacientes.id = pacientesinfos.PacienteID WHERE pacientes.id = ?",
      [req.params.id]
    );

    const paciente = [{
      Id: pacienteRequest[0].id,
      Name: pacienteRequest[0].PacienteName,
      Email: pacienteRequest[0].PacienteEmail,
      Img: pacienteRequest[0].PacienteImg,
      Idade: pacienteRequest[0].PacienteIdade,
      Cargo: pacienteRequest[0].PacienteCargo,
      Descricao: pacienteRequest[0].PacienteDetalhes,
      Numero: pacienteRequest[0].PacienteNumero,
      Endereco: pacienteRequest[0].PacienteEndereco,
      SUS: pacienteRequest[0].PacienteSUS,
      RG: pacienteRequest[0].PacienteRG,
      Historico: [],
      Report: {
        Genero: pacienteRequest[0].PacienteGenero,
        Peso: pacienteRequest[0].PacientePeso,
        Tamanho: pacienteRequest[0].PacienteTamanho,
        Pressao: pacienteRequest[0].PacientePressao,
        Glicose: pacienteRequest[0].PacienteGlicose,
        TipoSanguineo: pacienteRequest[0].PacienteTipoSangue,
        Alergia: pacienteRequest[0].PacienteAlergia,
        Doenca: pacienteRequest[0].PacienteDoenca,
        BPM: pacienteRequest[0].PacienteBPM,
        Status: pacienteRequest[0].PacienteStatus,
        Fluxo: pacienteRequest[0].PacienteFluxo,
      },
      DataInicio: pacienteRequest[0].PacienteDataInicio,
      DataFim: pacienteRequest[0].PacienteDataFim,
    }];

    res.status(200).send(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar paciente");
  } finally {
    // Vai liberar a pool automaticamente.
  }
});

module.exports = router;
