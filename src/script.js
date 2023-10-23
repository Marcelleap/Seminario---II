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
      locale: 'pt'
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

// Funções calendário

document.getElementById('openModalBtn').addEventListener('click', function () {
  document.getElementById('myModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
});

document.getElementById('closeModalBtn').addEventListener('click', function () {
  document.getElementById('myModal').style.display = 'none';
  document.body.style.overflow = 'visible';
});

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

document.getElementById('deleteSubject').addEventListener('click', function () {
  document.getElementById('myPopUp').style.display = 'block';
});

document.getElementById('closePopUpBtn').addEventListener('click', function () {
  document.getElementById('myPopUp').style.display = 'none';
  document.getElementById('myModal').style.display = 'none';
});

document
  .getElementById('popupDeleteConfirm')
  .addEventListener('click', function () {
    const data = returnFromLocalStorage();
    removeFromLocalStorage(data);
    document.getElementById('myPopUp').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
  });

document
  .getElementById('popupDeleteCancel')
  .addEventListener('click', function () {
    document.getElementById('myPopUp').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
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

    for (let i = 1; i <= classesPerWeek; i++) {
      const dayOfWeek = document.getElementById(`day${i}`).value;
      const classBeginning = document.getElementById(`beginning${i}`).value;
      const classEnding = document.getElementById(`classEnding${i}`).value;

      classSchedules.push({
        dayOfWeek,
        classBeginning,
        classEnding,
      });
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

    saveToLocalStorage(subjectForm);

    console.log(subjectForm);

    return subjectForm;
  } catch (error) {
    console.error(
      'Erro ao armazenar informações do formulário da disciplina no array (saveSubjectFormInArray).',
      error
    );
  }
}

function saveToLocalStorage(data) {
  try {
    localStorage.setItem('database', JSON.stringify(data));
  } catch (error) {
    console.error(
      'Erro ao salvar formulário da disciplina no localStorage (saveToLocalStorage).',
      error
    );
  }
}

function returnFromLocalStorage() {
  try {
    const data = JSON.parse(localStorage.getItem('database')) || [];
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
    localStorage.removeItem('database');
    resetFormFields();
    generateCalendar();
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

    endDateObj.setDate(endDateObj.getDate() + 1);

    const nextEndDate = endDateObj;

    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    while (current <= endDateObj) {
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

    // Linhas da tabela com dados
    classesRange.forEach((classInfo) => {
      const row = tbody.insertRow();
      const { dayOfMonth, dayOfWeek, classBeginning, classEnding } = classInfo;

      const cellDayOfMonth = row.insertCell(0);
      cellDayOfMonth.textContent = dayOfMonth;
      cellDayOfMonth.style.textAlign = 'center';

      const cellDayOfWeek = row.insertCell(1);
      cellDayOfWeek.textContent = dayOfWeek;
      cellDayOfWeek.style.textAlign = 'center';

      const cellTime = row.insertCell(2);
      cellTime.textContent = `${classBeginning} - ${classEnding}`;
      cellTime.style.textAlign = 'center';

      const cellContent = row.insertCell(3);
      const input = document.createElement('input');
      input.type = 'text';
      cellContent.appendChild(input);
      cellContent.style.textAlign = 'center';
    });

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

    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';

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

window.addEventListener('load', function () {
  const savedData = returnFromLocalStorage();
  if (savedData) {
    fillFormFields(savedData);
    generateCalendar();
  }
});

function generateCalendar() {
  const subjectForm = saveSubjectFormInArray();
  const startDate = new Date(subjectForm.startDate);
  const endDate = new Date(subjectForm.endDate);
  const semesterRange = getSemesterRange(startDate, endDate);
  const classesRange = getClassesRange(subjectForm, semesterRange);
  console.log(classesRange);

  const existingTable = document.getElementById('calendarTable');
  if (existingTable) {
    existingTable.remove();
  }

    const table = createTableWithClasses(classesRange);
    table.id = 'calendarTable';
    document.body.appendChild(table);
  addClassesToCalendar(classesRange, subjectForm.subjectName);
}

function main() {
  const generateCalendarButton = document.getElementById(
    'generateCalendarButton'
  );
  generateCalendarButton.addEventListener('click', generateCalendar);
}

main();
