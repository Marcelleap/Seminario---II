//MINI CALENDARIO 

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let feriados = JSON.parse(localStorage.getItem('feriados')) || {};
let periodos = JSON.parse(localStorage.getItem('periodos')) || {};

function preencherCalendario(mes, ano) {
  const tabela = document.getElementById('calendario').getElementsByTagName('tbody')[0];
  tabela.innerHTML = '';

  const hoje = new Date();
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = primeiroDia.getDay();

  let diaAtual = 1;

  for (let i = 0; i < 6; i++) {
    const linha = tabela.insertRow(i);

    for (let j = 0; j < 7; j++) {
      const celula = linha.insertCell(j);

      if ((i === 0 && j < primeiroDiaSemana) || diaAtual > ultimoDia) {
        celula.innerHTML = '';
      } else {
        celula.innerHTML = diaAtual;
        diaAtual++;

        const dataAtual = new Date(ano, mes, celula.innerHTML);
        const dataString = dataAtual.toISOString().split('T')[0];
               

        if (feriados[dataString] && periodos[dataString]) {
          celula.classList.add('feriado');
          celula.classList.add('periodo');
        } else if (feriados[dataString]) {
          celula.classList.add('feriado');
        } else if (periodos[dataString]) {
          celula.classList.add('periodo');
        }

        if (dataAtual.getMonth() !== primeiroDia.getMonth()) {
          celula.classList.add('outro-mes');
        } else {
          celula.classList.remove('outro-mes');
        }

        if (dataAtual.getDay() === 6) {
          celula.classList.add('sunday');
        }

        if (
          dataAtual.getDate() === hoje.getDate() &&
          dataAtual.getMonth() === hoje.getMonth() &&
          dataAtual.getFullYear() === hoje.getFullYear()
        ) {
          celula.classList.add('dia-atual');
        }

      }
    }
  }

  const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(primeiroDia);
  document.getElementById('mes-ano').innerHTML = `${nomeMes} ${ano}`;
  exibirFeriados();
  exibirPeriodos();
}

function abrirModalFeriado() {
  document.getElementById('modalFeriado').style.display = 'block';
  exibirFeriados();
}

function abrirModalPeriodo() {
  document.getElementById('modalPeriodo').style.display = 'block';
  exibirPeriodos();
}

function fecharModal(idModal) {
  document.getElementById(idModal).style.display = 'none';
}

function adicionarFeriado() {
  const feriadoInput = document.getElementById('feriadoInput');
  const dataFeriado = feriadoInput.value;

  if (dataFeriado) {
    feriados[dataFeriado] = true;
    localStorage.setItem('feriados', JSON.stringify(feriados));
    feriadoInput.value = '';
    preencherCalendario(mesAtual, anoAtual);
  }
}

   function adicionarPeriodo() {
  const periodoInicial = document.getElementById('periodoInicial');
  const periodoFinal = document.getElementById('periodoFinal');

  const dataInicial = periodoInicial.value;
  const dataFinal = periodoFinal.value;

  if (dataInicial && dataFinal) {
    const periodoAtual = {
      inicio: new Date(dataInicial),
      fim: new Date(dataFinal)
    };

    const dataStringInicio = periodoAtual.inicio.toISOString().split('T')[0];
    const dataStringFim = periodoAtual.fim.toISOString().split('T')[0];

    // Remover o período se já existir para evitar duplicatas
    for (const dataPeriodo in periodos) {
      if (dataPeriodo >= dataStringInicio && dataPeriodo <= dataStringFim) {
        delete periodos[dataPeriodo];
      }
    }

    while (periodoAtual.inicio <= periodoAtual.fim) {
      const dataString = periodoAtual.inicio.toISOString().split('T')[0];
      periodos[dataString] = true;
      periodoAtual.inicio.setDate(periodoAtual.inicio.getDate() + 1);
    }

    localStorage.setItem('periodos', JSON.stringify(periodos));
    periodoInicial.value = '';
    periodoFinal.value = '';
    preencherCalendario(mesAtual, anoAtual);
  }
}



function removerPeriodo() {
  const periodoInicial = document.getElementById('periodoInicial');
  const periodoFinal = document.getElementById('periodoFinal');

  const dataInicial = periodoInicial.value;
  const dataFinal = periodoFinal.value;

  if (dataInicial && dataFinal) {
    const dataStringInicio = new Date(dataInicial).toISOString().split('T')[0];
    const dataStringFim = new Date(dataFinal).toISOString().split('T')[0];

    // Remover o período
    delete periodos[dataStringInicio];

    localStorage.setItem('periodos', JSON.stringify(periodos));
    periodoInicial.value = '';
    periodoFinal.value = '';
    preencherCalendario(mesAtual, anoAtual);
    exibirPeriodos();
  }
}

function exibirFeriados() {
  const feriadosLista = document.getElementById('feriadosLista');
  feriadosLista.innerHTML = '<h4>Feriados:</h4>';
  
  for (const dataFeriado in feriados) {
    const dataFormatada = new Date(dataFeriado + 'T00:00:00').toLocaleDateString('pt-BR');
    const feriadoItem = document.createElement('div');
    feriadoItem.innerHTML = `${dataFormatada} <span onclick="removerFeriado('${dataFeriado}')">&times;</span>`;
    feriadosLista.appendChild(feriadoItem);
  }
}

function exibirPeriodos() {
const periodosLista = document.getElementById('periodosLista');
periodosLista.innerHTML = '<h4>Períodos:</h4>';

for (const dataInicio in periodos) {
  const dataFim = new Date(dataInicio);
  dataFim.setDate(dataFim.getDate() + 1);

  const dataFormatadaInicio = new Date(dataInicio).toLocaleDateString('pt-BR');
  const dataFormatadaFim = dataFim.toLocaleDateString('pt-BR');

  const periodoItem = document.createElement('div');
  periodoItem.innerHTML = `${dataFormatadaInicio} até ${dataFormatadaFim} <span onclick="removerPeriodo('${dataInicio}')">&times;</span>`;

  periodosLista.appendChild(periodoItem);
}
}


function removerFeriado(dataFeriado) {
  delete feriados[dataFeriado];
  localStorage.setItem('feriados', JSON.stringify(feriados));
  preencherCalendario(mesAtual, anoAtual);
}

function removerPeriodo(dataPeriodo) {
  delete periodos[dataPeriodo];
  localStorage.setItem('periodos', JSON.stringify(periodos));
  preencherCalendario(mesAtual, anoAtual);
}

function mudarMes(delta) {
  mesAtual += delta;

  if (mesAtual < 0) {
    mesAtual = 11;
    anoAtual--;
  } else if (mesAtual > 11) {
    mesAtual = 0;
    anoAtual++;
  }

  preencherCalendario(mesAtual, anoAtual);
}

window.onload = function () {
  preencherCalendario(mesAtual, anoAtual);
};



// PLANNER 
document.addEventListener('DOMContentLoaded', function () {
  const calendarContainer = document.getElementById('calendar');
  const prevWeekBtn = document.getElementById('prevWeek');
  const nextWeekBtn = document.getElementById('nextWeek');
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('myModal');
  const subjectModal = document.getElementById('subjectModal');
  const saveEventBtn = document.getElementById('saveEventBtn');
  const saveSubjectBtn = document.getElementById('saveSubjectBtn');
  const subjectInput = document.getElementById('subject');
  const professorInput = document.getElementById('professor');
  const startTimeInput = document.getElementById('startTime');
  const endTimeInput = document.getElementById('endTime');
  const descriptionInput = document.getElementById('description');
  const colorInput = document.getElementById('color');
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  const subjectNameInput = document.getElementById('subjectName');
  const subjectColorInput = document.getElementById('subjectColor');
  const legend = document.getElementById('legend');
  const subjectList = document.getElementById('subjectList');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeSubjectModalBtn = document.getElementById('closeSubjectModalBtn');

  let currentWeek = new Date();

  renderCalendar(currentWeek);

  prevWeekBtn.addEventListener('click', function () {
      currentWeek.setDate(currentWeek.getDate() - 7);
      renderCalendar(currentWeek);
  });

  nextWeekBtn.addEventListener('click', function () {
      currentWeek.setDate(currentWeek.getDate() + 7);
      renderCalendar(currentWeek);
  });

  // Adicione um evento de clique ao botão para abrir o modal de cadastro de matéria
  addSubjectBtn.addEventListener('click', function () {
      openSubjectModal();
  });

  // Adicione um evento de clique ao botão "Fechar" no modal de adicionar evento
  closeModalBtn.addEventListener('click', function () {
      closeModals();
  });

  // Adicione um evento de clique ao botão "Fechar" no modal de cadastrar matéria
  closeSubjectModalBtn.addEventListener('click', function () {
      closeModals();
  });

  function renderCalendar(startOfWeek) {
      calendarContainer.innerHTML = '';
      legend.innerHTML = ''; // Limpa a legenda existente

      const subjects = getSubjects(); // Obtém as matérias cadastradas

      subjects.forEach(subject => {
          const legendItem = document.createElement('div');
          legendItem.className = 'legend-item';
          legendItem.style.backgroundColor = subject.color;
          legendItem.innerText = subject.name;
          legend.appendChild(legendItem);
      });

      for (let i = 0; i < 7; i++) {
          const currentDay = new Date(startOfWeek);
          currentDay.setDate(startOfWeek.getDate() + i);

          const dayElement = document.createElement('div');
          dayElement.classList.add('day');
          dayElement.innerHTML = `<strong>${getDayOfWeek(currentDay.getDay())}</strong><br>${currentDay.toLocaleDateString()}`;

          const addEventButton = document.createElement('span');
          addEventButton.classList.add('add-event');
          addEventButton.innerText ='+ Add';
          addEventButton.addEventListener('click', function () {
              openModal(currentDay);
          });

          const events = getEvents(currentDay);
          if (events.length > 0) {
              events.forEach(event => {
                  const eventElement = document.createElement('div');
                  eventElement.classList.add('event');
                  eventElement.style.backgroundColor = event.color || '#3498db';
                eventElement.innerHTML = `Matéria: ${event.subject}(${event.professor})<br>${event.startTime} - ${event.endTime}<br>Assunto: ${event.description}<br><span class="delete-event" onclick="deleteEvent('${currentDay.toISOString()}','${event.subject}','${event.startTime}','${event.endTime}')">Excluir</span>`;


                            dayElement.appendChild(eventElement);
              });
          }

          dayElement.appendChild(addEventButton);
          calendarContainer.appendChild(dayElement);
      }
  }


function openModal(date) {
  modalOverlay.style.display = 'block';
  modal.style.display = 'block';

clearEventModal();

  subjectInput.innerHTML = '';
  const subjects = getSubjects();
  subjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject.name;
      option.text = subject.name;
      subjectInput.add(option);
  });

  saveEventBtn.addEventListener('click', function () {
      const selectedSubject = subjectInput.value;
      const selectedSubjectData = subjects.find(subject => subject.name === selectedSubject);

      const event = {
          subject: selectedSubject,
          professor: professorInput.value,
          startTime: startTimeInput.value,
          endTime: endTimeInput.value,
          description: descriptionInput.value,
          color: selectedSubjectData ? selectedSubjectData.color : '#3498db'
      };

      if (event.subject) {
          const events = getEvents(date);
          const existingEventIndex = events.findIndex(e =>
              e.subject === event.subject &&
              e.startTime === event.startTime &&
              e.endTime === event.endTime
          );

          if (existingEventIndex !== -1) {
              // Atualiza o evento existente
              events[existingEventIndex] = event;
          } else {
              // Adiciona um novo evento
              events.push(event);
          }

          saveEvents(date, events);
          renderCalendar(currentWeek);
          closeModals();
      }
  });
}

function clearEventModal() {
professorInput.value = '';
startTimeInput.value = '';
endTimeInput.value = '';
descriptionInput.value = '';
}

  function openSubjectModal() {
      modalOverlay.style.display = 'block';
      subjectModal.style.display = 'block';

clearSubjectModal();

      const subjects = getSubjects();
      subjectList.innerHTML = ''; // Limpa a lista existente

      subjects.forEach(subject => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `${subject.name} - <span class="delete-subject" onclick="deleteSubject('${subject.name}')">Excluir</span>`;
          subjectList.appendChild(listItem);
      });

      saveSubjectBtn.addEventListener('click', function () {
          const subject = {
              name: subjectNameInput.value,
              color: subjectColorInput.value
          };

          if (subject.name) {
              saveSubject(subject);
              closeModals();
          }
      });
  }

function clearSubjectModal() {
      subjectNameInput.value = '';
      subjectColorInput.value = '#3498db';
  }

  function closeModals() {
      modalOverlay.style.display = 'none';
      modal.style.display = 'none';
      subjectModal.style.display = 'none';
  }

  function getDayOfWeek(dayIndex) {
      const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      return daysOfWeek[dayIndex];
  }

  function getEvents(date) {
      const eventsKey = getEventsKey(date);
      const events = localStorage.getItem(eventsKey);
      return events ? JSON.parse(events) : [];
  }

  function saveEvents(date, events) {
      const eventsKey = getEventsKey(date);
      localStorage.setItem(eventsKey, JSON.stringify(events));
  }

  function getSubjects() {
      const subjects = localStorage.getItem('subjects');
      return subjects ? JSON.parse(subjects) : [];
  }

  function saveSubject(subject) {
      const subjects = getSubjects();
      const existingSubject = subjects.find(s => s.name === subject.name);

      if (!existingSubject) {
          subjects.push(subject);
          localStorage.setItem('subjects', JSON.stringify(subjects));
      }
  }

window.deleteEvent = function (dateString, subject, startTime, endTime) {
const date = new Date(dateString);
const events = getEvents(date);
const updatedEvents = events.filter(e => !(e.subject === subject && e.startTime === startTime && e.endTime === endTime));
saveEvents(date, updatedEvents);
renderCalendar(currentWeek);
};


  window.deleteSubject = function (subjectName) {
      const subjects = getSubjects();
      const updatedSubjects = subjects.filter(subject => subject.name !== subjectName);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
      openSubjectModal(); // Atualiza a lista de matérias após excluir
      renderCalendar(currentWeek);
  }

  function getEventsKey(date) {
      return `events_${date.toISOString().split('T')[0]}`;
  }
});
    

    
