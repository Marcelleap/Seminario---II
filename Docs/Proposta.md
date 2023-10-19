## 2. Proposta de Projeto
O projeto deverá conter uma página em formato de calendário que permita ao usuário consultar e cadastrar o dia, horário de cada umas das disciplinas lecionadas, bem como o conteúdo de cada uma das aulas. 

### 2.1 Recursos Utilizados
A API do projeto será desenvolvida em modelo de página web com HTML, CSS e JavaScript e será executada em servidor local na máquina no próprio usuário. Todo o desenvolvimento da aplicação será atualizado por meio deste repositório do GitHub.

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