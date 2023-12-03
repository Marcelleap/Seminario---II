let calendar = new EventCalendar(document.getElementById('calendar'), {
  view: 'dayGridMonth',
  locale: 'pt',
  height: '100%',
  headerToolbar: {
    start: 'prev,next today',
    center: 'title',
    end: 'dayGridMonth,timeGridWeek,timeGridDay,listDay',
  },
  allDaySlot: false,
  buttonText: {
    close: 'Close',
    dayGridMonth: 'Mês',
    listDay: 'Lista',
    listMonth: 'Lista',
    listWeek: 'Lista',
    listYear: 'Lista',
    resourceTimeGridDay: 'day',
    resourceTimeGridWeek: 'week',
    timeGridDay: 'Dia',
    timeGridWeek: 'Semana',
    today: 'Hoje',
  },
  eventTimeFormat: {
    hour: '2-digit',
    minute: 'numeric',
    hour12: false,
  },
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  },
  titleFormat: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'pt',
  },
});

function createEvent(dayOfMonth, classBeginning, classEnding, subjectName) {
  let event = {
    title: subjectName,
    start: `${dayOfMonth}T${classBeginning}:00`,
    end: `${dayOfMonth}T${classEnding}:00`,
  };

  calendar.addEvent(event);
}

function show(value) {
  document.querySelector('.text-box').value = value;
}

let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function () {
  dropdown.classList.toggle('active');
};

// Funções calendário

document.getElementById('openModalBtn').addEventListener('click', function () {
  document.getElementById('myModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
});

document.getElementById('closeModalBtn').addEventListener('click', function () {
  document.getElementById('myModal').style.display = 'none';
  document.body.style.overflow = 'visible';
});

document
  .getElementById('createScheduleInput')
  .addEventListener('click', createClassesSchedulesForm);

window.onclick = function (event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }

  var buttonSave = document.getElementById('generateCalendarButton');
  if (event.target == buttonSave) {
    modal.style.display = 'none';
  }
};

document.getElementById('deleteButton').addEventListener('click', function () {
  console.log('delete');
  const overlay = document.getElementById('overlay');
  const deletePopup = document.getElementById('deletePopup');
  overlay.classList.remove('hide');
  deletePopup.classList.remove('hide');
});

document.getElementById('overlay').addEventListener('click', () => {
  overlay.classList.add('hide');
  deletePopup.classList.add('hide');
});

document.getElementById('cancelPopupButton').addEventListener('click', () => {
  overlay.classList.add('hide');
  deletePopup.classList.add('hide');
});

document.getElementById('confirmPopupButton').addEventListener('click', () => {
  console.log('confirma');
  removeFromLocalStorage();
  overlay.classList.add('hide');
  deletePopup.classList.add('hide');
});

function adjustTextAreaHeight(textarea) {
  const scrollHeight = textarea.scrollHeight;
  textarea.style.height = scrollHeight + 'px';
}

// Alternar entre lista e calendario

let calendarScreen = true;

document.getElementById('listButton').addEventListener('click', () => {
  console.log('List');
  document.getElementById('calendarTable').setAttribute('class', 'table-show');
  document.getElementById('calendar').setAttribute('class', 'hide');
  calendarScreen = false;
});

document.getElementById('calendarButton').addEventListener('click', () => {
  console.log('Calendar');
  document.getElementById('calendarTable').setAttribute('class', 'hide');
  document.getElementById('calendar').setAttribute('class', 'block-show');
  calendarScreen = true;
});

function saveSubjectFormInArray() {
  try {
    const subjectName = document.getElementById('subjectName').value;
    const className = document.getElementById('className').value;
    const institution = document.getElementById('institution').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const classesPerWeek = parseInt(document.getElementById('classes').value);
    const classSchedules = [];
    const classContent = [];

    for (let i = 1; i <= classesPerWeek; i++) {
      const dayOfWeek = document.getElementById(`day${i}`).value;
      const classBeginning = document.getElementById(`beginning${i}`).value;
      const classEnding = document.getElementById(`classEnding${i}`).value;

      classSchedules.push({
        dayOfWeek,
        classBeginning,
        classEnding,
      });
      console.log(i);
    }

    const subjectForm = {
      subjectName,
      className,
      institution,
      startDate,
      endDate,
      classesPerWeek,
      classSchedules,
    };

    const formattedStartDate = new Date(subjectForm.startDate);
    const formattedEndDate = new Date(subjectForm.endDate);
    const semesterRange = getSemesterRange(
      formattedStartDate,
      formattedEndDate
    );
    const classesRange = getClassesRange(subjectForm, semesterRange);

    const existingTable = document.getElementById('calendarTable');
    if (existingTable) {
      existingTable.remove();
    }

    const table = createTableWithClasses(classesRange);
    table.id = 'calendarTable';
    document.querySelector('#centerContainer').appendChild(table);
    addClassesToCalendar(classesRange, subjectForm.subjectName);

    const textAreaQuantity = document.querySelectorAll('textarea').length;
    for (let i = 0; i < textAreaQuantity; i++) {
      const contentNode = document.getElementById(`textarea${i}`);
      const contentId = i;

      if (contentNode.value !== null) {
        const content = contentNode.value;
        classContent.push({ content, contentId });
      }
    }

    subjectForm.classContent = classContent;

    saveToLocalStorage(subjectForm, subjectName);

    console.log(subjectForm);

    return subjectForm;
  } catch (error) {
    console.error(
      'Erro ao armazenar informações do formulário da disciplina no array (saveSubjectFormInArray).',
      error
    );
  }
}

function createClassesSchedulesForm() {
  var classes = parseInt(document.getElementById('classes').value);
  var container = document.getElementById('classesContainer');
  container.innerHTML = ''; // Limpa os campos anteriores

  for (var i = 1; i <= classes; i++) {
    var div = document.createElement('div');
    div.innerHTML = `
              <label for="day${i}">Dia da semana:</label>
              <select id="day${i}" name="days[${i}]">
                  <option value="Segunda">Segunda-feira</option>
                  <option value="Terça">Terça-feira</option>
                  <option value="Quarta">Quarta-feira</option>
                  <option value="Quinta">Quinta-feira</option>
                  <option value="Sexta">Sexta-feira</option>
                  <option value="Sábado">Sábado</option>
                  <option value="Domingo">Domingo</option>
              </select>
              <label for="classBeginning${i}">Hora de início:</label>
              <input type="time" id="beginning${i}" name="classBeginning[${i}]">
              <label for="classEnding${i}">Hora de fim:</label>
              <input type="time" id="classEnding${i}" name="classEnding[${i}]">
          `;
    container.appendChild(div);
  }
}

function saveToLocalStorage(data, subjectName) {
  try {
    console.log(subjectName);
    localStorage.setItem(`subject${subjectName}`, JSON.stringify(data));
  } catch (error) {
    console.error(
      'Erro ao salvar formulário da disciplina no localStorage (saveToLocalStorage).',
      error
    );
  }
}

function returnFromLocalStorage(subjectName) {
  try {
    const data =
      JSON.parse(localStorage.getItem(`subject${subjectName}`)) || [];
    return data;
  } catch (error) {
    console.error(
      'Erro ao retornar formulário da disciplina no localStorage (returnFromLocalStorage).',
      error
    );
    return [];
  }
}

function resetFormFields() {
  document.getElementById('subjectName').value = '';
  document.getElementById('className').value = '';
  document.getElementById('institution').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('classes').value = '';
  document.getElementById('classesContainer').innerHTML = '';
}

function removeFromLocalStorage() {
  try {
    const currentPage = document.getElementById('title').textContent;
    localStorage.removeItem(`subject${currentPage}`);
    const subjects = document
      .getElementById('subjectOptions')
      .querySelectorAll('div');
    for (const subject of subjects) {
      if (subject.textContent === currentPage) {
        subject.remove();
      }
    }
    document
      .querySelectorAll('.ec-event')
      .forEach((element) => element.remove());
    document
      .querySelector('.optionsContainer')
      .querySelectorAll('button')
      .forEach((button) => button.classList.add('hide'));

    document.getElementById('title').textContent = '';
    document.querySelector('.text-box').value = '';
    document.getElementById('calendarTable').setAttribute('class', 'hide');

    resetFormFields();
  } catch (error) {
    console.error(
      'Erro ao remover formulário da disciplina do localStorage (removeFromLocalStorage).',
      error
    );
  }
}

function getSemesterRange(startDate, endDate) {
  try {
    const weekdays = [];
    const current = new Date(startDate);
    console.log(current);

    const endDateObj = new Date(endDate);

    const nextEndDate = endDateObj.setDate(endDateObj.getDate() + 1);

    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    while (current <= nextEndDate) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek >= 0 && dayOfWeek <= 6) {
        const formattedDate = `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`;
        const dayName = daysOfWeek[dayOfWeek];
        weekdays.push({
          dayOfMonth: formattedDate,
          dayOfWeek: dayName,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    weekdays.shift();

    return weekdays;
  } catch (error) {
    console.error(
      'Erro ao gerar array contendo as datas do calendário (getSemesterRange).',
      error
    );
  }
}

function getClassesRange(subjectForm, semesterRange) {
  try {
    const classesRange = [];
    const formDaysOfWeek = subjectForm.classSchedules.map(
      (schedule) => schedule.dayOfWeek
    );

    for (const semesterDay of semesterRange) {
      for (const formDayOfWeek of formDaysOfWeek) {
        if (semesterDay.dayOfWeek.includes(formDayOfWeek)) {
          const classSchedule = subjectForm.classSchedules.find(
            (schedule) => schedule.dayOfWeek === formDayOfWeek
          );
          if (classSchedule) {
            const classInfo = {
              dayOfMonth: semesterDay.dayOfMonth,
              dayOfWeek: semesterDay.dayOfWeek,
              classBeginning: classSchedule.classBeginning,
              classEnding: classSchedule.classEnding,
            };
            classesRange.push(classInfo);
          }
        }
      }
    }

    return classesRange;
  } catch (error) {
    console.error(
      'Erro ao gerar calendário da disciplina (getClassesRange).',
      error
    );
    return [];
  }
}

function addClassesToCalendar(classesRange, subjectName) {
  classesRange.forEach((classInfo) => {
    const { dayOfMonth, dayOfWeek, classBeginning, classEnding } = classInfo;

    createEvent(dayOfMonth, classBeginning, classEnding, subjectName);
  });
}

function createTableWithClasses(classesRange) {
  try {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    if (calendarScreen) {
      table.setAttribute('class', 'hide');
      document.getElementById('calendar').setAttribute('class', 'block-show');
    } else {
      table.setAttribute('class', 'table-show');
      document.getElementById('calendar').setAttribute('class', 'hide');
    }

    let subject = returnFromLocalStorage(
      document.getElementById('title').textContent
    );
    // Linhas da tabela com dados
    for (let i = 0; i < classesRange.length; i++) {
      const row = tbody.insertRow();
      const { dayOfMonth, dayOfWeek, classBeginning, classEnding } =
        classesRange[i];

      const cellDayOfMonth = row.insertCell(0);
      cellDayOfMonth.textContent = dayOfMonth;

      const cellDayOfWeek = row.insertCell(1);
      cellDayOfWeek.textContent = dayOfWeek;

      const cellTime = row.insertCell(2);
      cellTime.textContent = `${classBeginning} - ${classEnding}`;

      const cellContent = row.insertCell(3);
      const input = document.createElement(`textarea`);
      console.log(subject);
      input.value = subject.classContent[i].content;

      input.setAttribute('id', `textarea${i}`);
      input.addEventListener('input', () => {
        adjustTextAreaHeight(input);
        const subjectName = document.getElementById('title').textContent;
        let object = returnFromLocalStorage(subjectName);
        object.classContent[i].content = input.value;
        // if (input.value === undefined) {
        //   object.classContent[i].content = '';
        // } else {
        // }
        saveToLocalStorage(object, subjectName);
      });
      cellContent.appendChild(input);
    }

    // Cabeçalho da tabela
    if (classesRange.length > 0) {
      const headerRow = thead.insertRow();
      const headers = [
        'Dia do Mês',
        'Dia da Semana',
        'Horário',
        'Conteúdo da Aula',
      ];

      headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    const cells = table.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.border = '1px solid #dddddd';
      cells[i].padding = '8px';
    }

    return table;
  } catch (error) {
    console.error(
      'Erro ao criar tabela da disciplina (createTableWithClasses).',
      error
    );
  }
}

function fillFormFields(savedData) {
  document.getElementById('subjectName').value = savedData.subjectName;
  document.getElementById('className').value = savedData.className;
  document.getElementById('institution').value = savedData.institution;
  document.getElementById('startDate').value = savedData.startDate;
  document.getElementById('endDate').value = savedData.endDate;

  const classesPerWeek = savedData.classesPerWeek;
  document.getElementById('classes').value = classesPerWeek;
  createClassesSchedulesForm();

  for (let i = 1; i <= classesPerWeek; i++) {
    document.getElementById(`day${i}`).value =
      savedData.classSchedules[i - 1].dayOfWeek;
    document.getElementById(`beginning${i}`).value =
      savedData.classSchedules[i - 1].classBeginning;
    document.getElementById(`classEnding${i}`).value =
      savedData.classSchedules[i - 1].classEnding;
  }
}

function addSubjectToDropdown(subjectName) {
  const subjectOptions = document.getElementById('subjectOptions');
  const subject = document.createElement('div');
  subject.textContent = subjectName;
  subject.addEventListener('click', () => {
    document.querySelector('#title').textContent = `${subjectName}`;
    document
      .querySelectorAll('.ec-event')
      .forEach((element) => element.remove());
    document
      .querySelector('.optionsContainer')
      .querySelectorAll('button')
      .forEach((element) => element.classList.remove('hide'));

    show(subjectName);
    const savedData = returnFromLocalStorage(subjectName);
    if (savedData) {
      fillFormFields(savedData);
      generateCalendar();
    }
  });
  subjectOptions.appendChild(subject);
}

function generateCalendar() {
  const subjectForm = saveSubjectFormInArray();
  const startDate = new Date(subjectForm.startDate);
  const endDate = new Date(subjectForm.endDate);
  const semesterRange = getSemesterRange(startDate, endDate);
}

function main() {
  const generateCalendarButton = document.getElementById(
    'generateCalendarButton'
  );
  generateCalendarButton.addEventListener('click', () => {
    generateCalendar();
    addSubjectToDropdown(document.getElementById('subjectName').value);
  });

  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // console.log(key);
    if (key.startsWith('subject')) {
      const subject = localStorage.getItem(key);
      const parsedSubject = JSON.parse(subject);
      keys.push(parsedSubject);
      console.log(parsedSubject.subjectName);
      addSubjectToDropdown(parsedSubject.subjectName);
    }
  }

  console.log(keys);
}

main();
