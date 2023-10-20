let calendar = new EventCalendar(document.getElementById('calendar'), {
    view: 'dayGridMonth',
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
  
  function createEvent() {
    let event = {
      title: 'Aula Física',
      start: '2023-10-20T10:00:00',
      end: '2023-10-20T12:00:00',
      allDay: false,
    };
  
    calendar.addEvent(event);
  }
  
  createEvent();
  