# PROJETO DE SEMINÁRIOS III: Sistema para Cadastros e Controle de Calendário em Disciplinas

> - *Tema:* Sistema para Cadastros e Controle de Calendário em Disciplinas
> - *Professor:* Harison Herman Silva
> - *Grupo:* Hadassa Alves de Gouvea, João Henrique dos Santos Ferreira, Leonardo Silva Melo Santos, Marcelle Andrade Pereira e Vinicius Henrique Muniz Penido

# Sumário

1. [Temática](#temática)
   - 1.1 [Descrição do tema](#descrição-do-tema)
   - 1.2 [Desafios no Gerenciamento de Disciplinas](#desafios-no-gerenciamento-de-disciplinas)
   - 1.3 [Benefícios de um Sistema de Gerenciamento de Disciplinas](#benefícias-de-um-sistema-de-gerenciamento-de-disciplinas)

2. [Proposta de Projeto](#proposta-de-projeto)
   - 2.1 [Recursos Utilizados](#recursos-utilizados)
   - 2.2 [Armazenamento de Dados](#armazenamento-de-dados)
   - 2.3 [Funcionalidades-Chave do Sistema](#funcionalidades-chave-do-sistema)
   - 2.4 [Configurações Operacionais do Sistema do Calendário](#configurações-operacionais-do-sistema-do-calendário)
   - 2.5 [Configurações do Cadastro e Gerenciamento das Disciplinas](#configurações-do-cadastro-e-gerenciamento-das-disciplinas)
   - 2.6 [Dashboard](#dashboard)

3. [Conclusão](#conclusão)


## 1. Temática
O gerenciamento eficaz do currículo em uma instituição é crucial para o sucesso dos professores e o progresso dos alunos. Quando um professor assume uma nova disciplina, é comum enfrentar desafios na organização do conteúdo a ser ministrado, especialmente em relação ao calendário letivo. Para resolver esse problema, propomos aos professores cadastrar e controlar as atividades ao longo do ano letivo. Esse sistema possibilitará a manutenção do cronograma de aulas de acordo com as práticas de professores mais experientes na disciplina e no contexto da escola.

### 1.1 Desafios no Gerenciamento de Disciplinas
A implementação de um sistema de gerenciamento de disciplinas oferece vários benefícios, incluindo:

- *Falta de Consistência:* Professores novos podem enfrentar dificuldades para criar um plano de ensino consistente com as práticas da escola e de seus colegas.
- *Continuidade:* Quando um professor deixa a disciplina, pode ser difícil para um substituto entender o progresso e os planos de aula já estabelecidos.
- *Necessidade de Flexibilidade:* É essencial permitir que os professores adaptem seus planos de aula de acordo com as necessidades dos alunos e mudanças no currículo.

### 1.2 Benefícios de um Sistema de Gerenciamento de Disciplinas
A implementação de um sistema de gerenciamento de disciplinas oferece vários benefícios, incluindo:

- *Padronização:* Um sistema de gerenciamento de disciplinas oferece uma estrutura para a padronização dos planos de ensino, garantindo que os currículos sigam as diretrizes da escola.
- *Continuidade:* Possibilita a transição suave entre professores, com informações detalhadas sobre o progresso da disciplina.
- *Colaboração:* Os professores podem compartilhar práticas eficazes e recursos com seus colegas, melhorando o ensino em toda a escola.
- *Flexibilidade:* O sistema permite a adaptação contínua dos planos de aula, garantindo que as necessidades dos alunos sejam atendidas.

## 2. Proposta de Projeto
O projeto deverá conter uma página em formato de calendário que permita ao usuário consultar e cadastrar o dia, horário de cada umas das disciplinas lecionadas, bem como o conteúdo de cada uma das aulas. 

### 2.1 Recursos Utilizados
A API do projeto será desenvolvida em modelo de página web com HTML, CSS e JavaScript e será executada em servidor local na máquina no próprio usuário.

### 2.2 Armazenamento de Dados
O armazenamento de todos os dados gerados pela aplicação será feito em local storage (armazenamento local).

### 2.3 Funcionalidades-Chave do Sistema
- *Cadastro de Atividades:* Os professores poderão cadastrar atividades individuais, especificando títulos, datas, descrições e recursos relacionados.
- *Calendário Letivo:* O sistema oferecerá um calendário interativo que exibirá todas as atividades programadas.
- *Compartilhamento de Práticas:* Os professores poderão compartilhar práticas eficazes e recursos com seus colegas, melhorando o ensino em toda a escola.
- *Flexibilidade de Edição:* Os professores poderão editar, adicionar ou remover atividades de acordo com as mudanças nas necessidades do currículo.

### 2.4 Configurações Operacionais do Sistema do Calendário:
- *Ano Letivo:* Seleção do ano letivo para o qual o calendário será configurado.
- *Feriados:* Gerenciamento de feriados, incluindo recesso, feriado nacional, feriado municipal e outros com observações.
- *Professores [CRUD]:* Possibilidades de adicionar, editar, visualizar e excluir professores.
  - Dados incluídos no CRUD: nome, informações de contato, disciplinas lecionadas, entre outros.
- *Matérias Lecionadas [CRUD]:* Capacidade de adicionar, editar, visualizar e excluir matérias lecionadas.
  - Dados Incluídos no CRUD: nome da matéria, descrição e associação ao professor.
- *Configurações do Calendário:* Acesso às configurações do calendário, incluindo o ano letivo e feriados.

### 2.5 Configurações do Cadastro e Gerenciamento das Disciplinas
- *Matéria [CRUD]:* Gerenciamento de matérias, incluindo adicionar, editar, visualizar e excluir matérias.
  - Dados incluídos no CRUD: nome da matéria, cor associada, professor responsável, observações (campo de texto - matéria lecionada).
- *Tooltip na Matéria:* Exibição de informações detalhadas sobre a matéria quando o mouse paira sobre ela no calendário.
  - Informações exibidas incluem nome da matéria, professor responsável e detalhes da matéria lecionada.
- *Toolbar com Ícones:* Toolbar no calendário com ícones para alternar entre três modos: grade, professor e calendário.
  - Botão "Adicionar" para criar novas atividades e matérias no calendário.

### 2.6 Dashboard
- *Visualização do Calendário:* Exibição interativa do calendário com informações sobre atividades, matérias e professores associados.
- *Configurações Modais:* Acesso às configurações do calendário por meio de modais que permitem configurar o ano letivo e feriados.

# 3. Conclusão

A criação de um sistema para o cadastro e controle de calendário em disciplinas pode revolucionar a forma como as escolas abordam o gerenciamento do currículo. Ao fornecer uma estrutura para padronização, continuidade e flexibilidade, esse sistema pode melhorar significativamente a qualidade do ensino e a colaboração entre os professores. A implementação bem-sucedida desse sistema pode ser um ativo valioso para qualquer instituição educacional em busca de excelência no ensino.
