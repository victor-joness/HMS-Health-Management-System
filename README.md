# HMS-HOSPITALAR


# Legenda (Numero da demanda) -> (Complexidade/prioridade) -> Descrição

### UUID -> 00024 e 0000A
### () -> () -> 

<!-- IDEIAS -->

<!-- EM ANALISE  -->

### () -> () -> Fazer a refatoração do HandleLogout, pq ta sendo chamando em todas as telas, e podemos apenas importa isso.
### () -> () -> Fazer a tela de pacientes na pagina de "Doutor" e "Enfermeira" que serao a mesma;

<!-- BUGS/IMPROVEMENT -->

### () -> () -> Fazer a verificação do 

<!-- PRONTAS PARA SEREM FEITAS -->


### () -> () -> trocar todos os icons com GI, pois eles pesam 7mb e estão atrasando o carregamento do site.

### (0000A) -> PACOTE DE DEMANDA (00001) A (00007)
Foi juntada em um pacote, pois vai ser um só componente reaproveitado para as 4 telas.

OBS: USAR A SEGUINTE TEMPLATE (OBS: SEGUIR O SEGUINTE DESIGNE (https://www.figma.com/file/TCAutU7d73sJWUHwGMWJF9/Hospitality-Dashboard-(Community)?type=design&node-id=0-1&mode=design&t=wf52CZXlCDCoZ92k-0))

    ### (00001) -> (1) -> criar pagina do "perfil" ADMIN
    Não estamos com atualmente com uma pagina funcional do "perfil" admin, a demanda é criar essa página, (incluir rota), seguindo o seguinte template.

    ### (00005) -> (1) -> criar pagina do "perfil" DOUTOR
    Não estamos com atualmente com uma pagina funcional do "doutor" admin, a demanda é criar essa página, (incluir rota), seguindo o seguinte template.

    ### (00006) -> (1) -> criar pagina do "perfil" ENFERMEIRA
    Não estamos com atualmente com uma pagina funcional do "enfermeira" admin, a demanda é criar essa página, (incluir rota), seguindo o seguinte template.

    ### (00007) -> (1) -> criar pagina do "perfil" PACIEINTE
    Não estamos com atualmente com uma pagina funcional do "perfil" admin, a demanda é criar essa página, (incluir rota), seguindo o seguinte template.

### (00012) -> (1) -> Realizar todos os testes unitairos da rota USERS
### (00013) -> (1) -> Realizar todos os testes unitairos da rota REGISTER
### (00014) -> (1) -> Realizar todos os testes unitairos da rota LOGIN
### (00015) -> (1) -> Realizar todos os testes unitairos da rota FARMACIA
### (00016) -> (1) -> Realizar todos os testes unitairos da rota ENFERMEIRA
### (00017) -> (1) -> Realizar todos os testes unitairos da rota DOUTORES
### (00018) -> (1) -> Realizar todos os testes unitairos da rota DOADORES
### (00019) -> (1) -> Realizar todos os testes unitairos da rota CIRURGIAS
### (00020) -> (1) -> Realizar todos os testes unitairos da rota CAMAS
### (00021) -> (1) -> Realizar todos os testes unitairos da rota ADMIN

### (00022) -> (1) -> Quando aperta a seta de voltar com um modal aberto, é para fechar o modal
Devemos fechar o modal (caso esteja aberto), quando se é apertado a tecla de voltar, pois isso é uma forma de acessibilidade.

### (00024) -> (2) -> Fazer a tela de admin, dentro da rota admin
É uma rota onde é possivel atribuir cargos, fazer reembolsos, ter acessos a arquivos, e outras coisas que apenas o admin pode ter ou fazer.
EX: atribuir o cargo de enfermeiro para a enfermeira, pois não vamos fazer isso manualmente no banco de dados.
OBS: outras funcionalidados futuras serão implementadas, pensar no espaçamneto, e nos botões que vao abrir modal.

### (00002) -> (2) -> criar enum (Mudança na login/register/auth/navbar)
estamos passando um isAdmin, isDoutor, isEnfermeira, porem isso pode ficar muito grande futuramente, pois esta vindo com os dados do usuario, entáo temos um objetivo que é resumir o objetivo do usuario em questão, portanto deve-se criar algum parametro para definir o "cargo" do user.
OBS: Validar se isso é realmente viavel, pois um user pode ser admin e paciente ao mesmo tempo.

### (00010) -> (2) -> Criação do dashboard do ADMIN
fazer uma rota/metodo que vai resgatar as 8 informações que vai ser necessario na tela de dashboard do admin, as 8 tem que vim em 1 requisição, também deve retorna na requisição oq for necessario na () pois a mesma vai usar os dados.
OBS:USAR INNER JOIN ao inves de fazer varios select por conta da perfomace.

### (00011) -> (2) -> Criação do dashboard do ADMIN pt2
Fazer uso de uma biblioteca de graficos (chartsJS ou apexcharts), a principio serão feitos 4 graficos, esses graficos vao consumir tambem a requisição da (), portato, essa demanda deve ficar com a mesma pessoa que ficar com a ().
OBS: SEGUIR O SEGUINTE DESIGNE (https://www.figma.com/file/TCAutU7d73sJWUHwGMWJF9/Hospitality-Dashboard-(Community)?type=design&node-id=0-1&mode=design&t=wf52CZXlCDCoZ92k-0)

### (00003) -> (3) -> mudança em todas as tabelas/requisições etc
fazer a refatoração do objetos que recebemos/enviamos, pois da forma que ta é a seguinte enfermeira: { enfermeiraName, enfermeiraSenha}, só que ja temos o nome do objeto que é enfermeira então obviamente os dados são dela.

### (00004) -> (4) -> mudança de banco de dados -> mongoDb ou mysql na web
estamos atualmente usando mySql workbanch(local), porém é muito dificil deixar a database sempre atualizada entre os usuarios, pois é uma base local, estamos fazendo isso manualmente, portanto uma ideia é centralizar isso em um DBonline (que todos tenham acesso), mais isso iria exigir uma grande fatoração da api.

### (00009) -> (4) -> proteger as rotas da api
Apois a implementação da (00008) devemos agora limitar as rotas dos usuarios, por exemplo, um user que só tem permição de doutor, não pode conseguir fazer requisições para a routa de admin ou de enfemeira

### (00008) -> (4) -> proteger as rotas da api
Criar um middleware para que as rotas da api so esteja disponivel (ou enviar junto na requisição) um header/data que vai fazer a validação se o user está logado
