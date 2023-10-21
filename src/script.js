import main from "./calendarFuncs.js";

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
  
  export function createEvent(dayOfMonth, classBeginning, classEnding) {
    let event = {
      title: 'Aula Física',
      start: `${dayOfMonth}T${classBeginning}:00`,
      end: `${dayOfMonth}T${classEnding}:00`,
    };
  
    calendar.addEvent(event);
  }
  
  createEvent();
  main();
