var mc = new MainController();

window.onload = function(){
  $("#calendar").datepicker({
    weekStart: 1,
    maxViewMode: 2,
    todayBtn: "linked",
    language: "pt-BR",
    daysOfWeekDisabled: "0",
    daysOfWeekHighlighted: "0",
    todayHighlight: true
  }).on('changeDate',function (e) {
    selectAppointments(e.date);
  });

  $('#inCalendar input').datepicker({
    autoclose: true,
    weekStart: 1,
    maxViewMode: 2,
    todayBtn: "linked",
    language: "pt-BR",
    daysOfWeekDisabled: "0",
    daysOfWeekHighlighted: "0",
    todayHighlight: true
  }).on('changeDate',function(e){
    selectAppointments(e.date);
  });

  initTableScheduled();
  initComboBox();
  initButtons();

}

function initButtons(){
  document.getElementById("btn-find").onclick =  function (){
      mc.findPatientCpf(document.getElementById("cpf").value,
        function(result){
          if (result.length > 0) {
            document.getElementById("name").value = result[0].name;
          }else{
            document.getElementById("name").value = "Paciente não encontrado!";
          }
      });
  }

  document.getElementById("btn-cancel").onclick =  function (){
    clean();
  }

  document.getElementById("btn-mark").onclick =  function (){
    var appointment = new Appointment(
      document.getElementById("cpf").value,
      $("#dentist option:selected").val(),
      document.getElementById("schedule").value,
      document.getElementById("appointment").value
    );
    mc.saveAppointment(appointment,
      function (result) {
        if(result){
          alert("Consulta agendada");
        }else{
          alert("Erro ao agendar consulta");
        }
      }
    );
  }

}

function initTableScheduled(){

    var table = document.getElementById("table-scheduled").getElementsByTagName('tbody').item(0);

    var linhas = document.getElementById("table-scheduled").rows;
		var i = 0;
		for (i= linhas.length-1; i>=1; i--){
			document.getElementById("table-scheduled").deleteRow(i);
		}

    mc.listAllAppointments(function (appointments) {
      for (i = 0; i < appointments.length ; i++){
        if(new Date(appointments[i].schedule).toDateString() == new Date().toDateString()){
          $("#table-scheduled").find("tbody").append("<tr id="+appointments[i].id+"><td>"+appointments[i].appointment+"</td><td>"+appointments[i].name+"</td><td>"+appointments[i].nameDentist+"</td></tr>");
        }
  		}
    });
}

function selectAppointments(data){
  var table = document.getElementById("table-scheduled").getElementsByTagName('tbody').item(0);

  var linhas = document.getElementById("table-scheduled").rows;
  var i = 0;
  for (i= linhas.length-1; i>=1; i--){
    document.getElementById("table-scheduled").deleteRow(i);
  }

  mc.listAllAppointments(function (appointments) {
    for (i = 0; i < appointments.length ; i++){
      if(new Date(appointments[i].schedule).toDateString() == data.toDateString()){
        $("#table-scheduled").find("tbody").append("<tr id="+appointments[i].id+"><td>"+appointments[i].appointment+"</td><td>"+appointments[i].name+"</td><td>"+appointments[i].nameDentist+"</td></tr>");
      }
    }
  });
}

function initComboBox() {
  $("#dentist").empty();
  var mco = new MainController();
  mco.listAllDentists(function (dentists) {
    for (i = 0; i < dentists.length ; i++){
      $("#dentist").append("<option value="+dentists[i].cpf+">"+dentists[i].name+"</option>");
    }
  });
}

function saveAppointment(){

}

function clean(){
  document.getElementById("cpf").value = "";
  document.getElementById("schedule").value = "";
  document.getElementById("appointment").value = "";
  document.getElementById("name").value = "";
}
