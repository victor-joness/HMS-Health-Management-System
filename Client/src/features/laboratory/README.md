# Seção de Laboratório

Esta seção gerencia os exames de laboratório do sistema hospitalar, permitindo o cadastro, edição e visualização de diferentes tipos de exames.

## Funcionalidades

### Para Administradores
- **Dashboard**: Visualização de estatísticas e métricas dos exames
- **Cadastro de Exames**: Adicionar novos exames com informações completas
- **Edição de Exames**: Modificar exames existentes
- **Exclusão de Exames**: Remover exames do sistema
- **Filtros Avançados**: Buscar e filtrar exames por diversos critérios

### Informações dos Exames
Cada exame contém as seguintes informações:

- **Nome**: Nome do exame
- **Descrição**: Descrição detalhada do exame
- **Categoria**: Sangue, Urina, Fezes, Tecido, Imagem, Cardíaco, Neurológico, Outro
- **Tipo**: Básico, Avançado, Especializado, Emergência
- **Preço**: Valor do exame
- **Duração**: Tempo estimado em minutos
- **Tempo de Entrega**: Tempo estimado para entrega dos resultados em horas
- **Laboratório**: Laboratório onde o exame é realizado
- **Instruções de Preparação**: Orientações para o paciente
- **Valores Normais**: Valores de referência
- **Equipamento**: Equipamento necessário
- **Status**: Ativo, Inativo, Em Manutenção

### Informações dos Laboratórios
Cada laboratório contém as seguintes informações:

- **Nome**: Nome do laboratório
- **Endereço**: Endereço completo
- **Telefone**: Número de contato
- **E-mail**: E-mail de contato
- **CNPJ**: CNPJ do laboratório
- **Especialidades**: Lista de especialidades do laboratório
- **Status**: Ativo, Inativo, Em Manutenção

## Estrutura de Arquivos

```
features/laboratory/
            ├── components/
            │   ├── index.ts                    # Exportações dos componentes
            │   ├── laboratory-columns.tsx      # Definição das colunas da tabela de exames
            │   ├── laboratory-action-dialog.tsx # Diálogo para adicionar/editar exames
            │   ├── laboratory-delete-dialog.tsx # Diálogo de confirmação de exclusão de exames
            │   ├── laboratory-dashboard.tsx    # Dashboard com estatísticas
            │   ├── laboratory-filters.tsx      # Componente de filtros para exames
            │   ├── laboratory-facility-columns.tsx # Definição das colunas da tabela de laboratórios
            │   └── laboratory-facility-action-dialog.tsx # Diálogo para adicionar/editar laboratórios
├── context/
│   └── laboratory-context.tsx      # Contexto para gerenciamento de estado
├── index.tsx                       # Página principal do laboratório
└── README.md                       # Esta documentação
```

## Componentes

### LaboratoryDashboard
Exibe estatísticas e métricas dos exames:
            - Total de exames cadastrados
            - Preço médio por exame
            - Tempo médio de duração
            - Tempo médio de entrega
            - Distribuição por categoria e tipo
            - Lista dos exames mais caros

### LaboratoryFilters
Permite filtrar os exames por:
- Nome (busca textual)
- Categoria
- Tipo
- Status
- Laboratório
- Faixa de preço (mínimo e máximo)
- Faixa de tempo de entrega (mínimo e máximo)

### LaboratoryFacilityActionDialog
Formulário para adicionar ou editar laboratórios com validação completa.

### LaboratoryFacilityColumns
Definição das colunas para a tabela de laboratórios.

### LaboratoryActionDialog
Formulário para adicionar ou editar exames com validação completa.

### LaboratoryDeleteDialog
Confirmação de exclusão com informações do exame.

## Traduções

Todas as strings estão localizadas no arquivo `locale/pt.json` sob a chave `Pages.Laboratory`.

## Dados Mockados

A aplicação inclui dados de exemplo para demonstração:
- Hemograma Completo
- Glicemia em Jejum
- Exame de Urina Completo
- Perfil Lipídico
- Ressonância Magnética Cardíaca

## Integração com Backend

Para integrar com o backend, substitua as funções mockadas por chamadas reais à API:

1. **Listagem**: `GET /api/laboratory/exams`
2. **Criação**: `POST /api/laboratory/exams`
3. **Atualização**: `PUT /api/laboratory/exams/:id`
4. **Exclusão**: `DELETE /api/laboratory/exams/:id`

## Permissões

Atualmente, apenas usuários com role `ADMIN` têm acesso à seção de laboratório. 