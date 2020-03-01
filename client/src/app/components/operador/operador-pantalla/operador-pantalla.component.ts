import { Component, OnInit, ViewChild } from '@angular/core';
import { OperadorService } from '../../../services/operador/operador.service';
import { OtTrabajador } from '../../../models/OtTrabajador'
import { Operador } from 'src/app/models/Operador';
import { MotivopausaService } from '../../../services/motivopausa/motivopausa.service'
import { Pausa } from '../../../models/Pausa'
import { TrabajoService } from '../../../services/trabajo/trabajo.service'
import { OtService } from '../../../services/ot/ot.service'
import { Ot } from '../../../models/Ot'
import { PausaService } from '../../../services/pausa/pausa.service'
import { Tiempo } from '../../../models/Tiempo'
//import { Router, NavigationEnd } from '@angular/router'
import { TiempoService } from '../../../services/tiempo/tiempo.service'


@Component({
  selector: 'app-operador-pantalla',
  templateUrl: './operador-pantalla.component.html',
  styleUrls: ['./operador-pantalla.component.css']
})
export class OperadorPantallaComponent implements OnInit {
  listOtIngresadas: OtTrabajador[] = []//lista de trabajos
  listPausas: Pausa[] = []// lista de pausas asociadas a los trabajos
  listTiempo: Tiempo[] = []//lista de tiempos por cada dia trabajado de cada trabajo, se asocia a los trabajos
  listOtParaCerrarJornada: OtTrabajador[] = []//lista de ot ingresadas las cuales son iguales a las de listOtIngresadas, se crea este array para poder eliminar los datos del modal jornada, sin la necesidad de recargar o eliminar los datos definitivamente


  //objTiempo:Tiempo={}
  otParaGuardar: Ot = {
    Codigo: 0
  };
  otTrabajadorparaActualizar: OtTrabajador = {
    TotalTiempo: ''
  }

  Titulo: any = 'Operador: -';
  nombreOperador: any;
  idOtparaBuscar: any;
  operadores: any;
  motivosPausas: any;
  dataSource: any;
  password: any;
  idOperador: any;
  idOperadorreserva: any;
  passwordIngresada: string = ''
  passwordcorrecta: any = true;
  nombreOperadorModal: string = '';
  incorrecto: any = true;
  alertaPassword: any = true;
  alertaCodigo: any = true;
  btnIniciar = true;
  btnPausa = true;
  btnCerrarJornadaLaboral = false
  mensajemodalcerrarjornada: any = ''
  mensajeposiblesotsactivas: any = ''

  localstoragevariable: any;
  dd: number = 0
  objetoOtTrabajador: OtTrabajador = {
    Nombre: '',
    Codigo: '',
    Fecha: '',
    HoraInicio: '',
    HoraFin: ''
  };

  btnCerrar = true;
  btnIniciarPausa = true;
  codigoIngresado: string;
  mensajAlertPassword: string = '';
  mensajAlertCodigo: string = ''
  mensajeButtonIniciarOt: string = 'Iniciar Ot';
  mensajeButtonPausa: string = 'Pausar Ot'
  motivoSeleccionado: string;
  idMotivoSeleccionado: any;
  EstaEnPausa = false;
  codigoparabuscarot: any;
  otretornada: Ot;
  tiempoTotalOt: any;
  tiempoTotalOtpordia: any
  rutaPagina: any;
  mensajebuttonmodalcerrarjornada: any = ''
  btndetallemodalcerrarjornada = false
  titulomodalcerrarjornadadescripcion: any = 'Importante';

  descripcionmodalcerrarjornadadescripcion: any = 'Puede cerrar la jornada laboral actual, recuerde que al hacerlo, no podra continuar con su trabajo hasta la siguiente jornada laboral'//descripcion de la accion a realizar en modal cerrar jornada
  variableidoperadorencerrarjornadamodal: any;//el id operador, pero seleccionado en el modal jornada, asi en caso que un operador este logueado, no crea que ese es el id a cerrar, se tenian que separar y guardar en variables distintas, una, la oficial, es la que verifica si es que el que esta loguado, esta verifica quien quiere cerrar ot o jornada, pero dentro del modal cerrar jornada
  ocultarbotonpantallacerrarjornada: any = true; //oculta el boton en modal cerrra jornada, si es false, se mostrara el button para cerrar ot o cerrr jornada
  buttoncerrarotenmodalcerrarjornada: any = false; //indica si el button anteriormente descrito tiene el metodo para cerrar ot o cerrar jornada, si es true, el metodo es cerrar ot en modal, si es false, em metodo es cerrra jornada ot en modal cerrar jornada
  // btnReanudarPausa=false;
  cerrarjornada: boolean = false;//verifica si se puede cerrar jornada empieza como 1, en el moento que todas las ots se hayan o cerrado o cerrado por la jornada, eset valor cambiaara a 0, en ese momento, el modal cerrar jornada mostrara el modal correspondiente para cerrar la jornada laboral
  fecha: any;//indica la fecha de la jornada laboral, si la jornada fue cerrada se guarda en el localstorage y el entrar verifica si la fecha es igual a la jornada cerrada, si esta cerrada no se puede interactuar, si las fechas son distintas, entonces se puede trabajar
  mostrarmodaljornadacerradaalingresarpassword: boolean = false;//para mostrar o no el mensaje de la jornada fue cerrada al ingresar contraseña, si es true, se muestra el mensaje y no se puede loguear, si es false , los operadores se pueden loguar, porque un operador puede haber cerrado su ot, pero los otros no, por lo que solo ese operador vera en su pantalla ot cerrada, pero el resto que aun no haya cerrada su trabajo o la jornada de su trabajo podra seguir trabajando, solo se puede cerrar la jornada cuando todos hayan o cerrado ot o la jornada de sus ots, pero esto puede que no sea al mismo tiempo, un operador puede haber cerrado su jornada pero otros lo haran despues, asi que pueden seguir inh¿gresando sus passwords
  alMenosUnaOtCerradaSinCerrarJornada: boolean = true; //comienza en true, para que los datos(de existir) se mantengan tal cual al empezar o al refrescar la pagina, esto cambia solo caundo se cierra
  //verifica si existe una ot cerrada, pero que la jornada como tal no fue terminada, asi podemos hacer una diferencia antes de abrir todas las ots
  constructor(private operadorService: OperadorService, private motivopausaService: MotivopausaService, private trabajoService: TrabajoService, private otService: OtService, private pausaService: PausaService, private tiempoService: TiempoService) {
    //,private router: Router
    var pathname = window.location.pathname;
    console.log('url: ' + pathname)
    this.rutaPagina = pathname
  }

  ngOnInit() {
    console.log('inicio')

    if (JSON.parse(localStorage.getItem('listTrabajos')) != null) {
      this.listOtIngresadas = JSON.parse(localStorage.getItem('listTrabajos'))
    }
    if (JSON.parse(localStorage.getItem('listPausas')) != null) {
      this.listPausas = JSON.parse(localStorage.getItem('listPausas'))
    }
    if (JSON.parse(localStorage.getItem('fecha')) != null) {
      //this.fecha = JSON.parse(localStorage.getItem('fecha'))
      this.fecha = '19/01/2020'
    }

    if (JSON.parse(localStorage.getItem('listTiempo')) != null) {
      this.listTiempo = JSON.parse(localStorage.getItem('listTiempo'))
    }
    console.log('alMenosUnaOtCerradaSinCerrarJornada')
    if (JSON.parse(localStorage.getItem('alMenosUnaOtCerradaSinCerrarJornada')) != null) {
      this.alMenosUnaOtCerradaSinCerrarJornada = JSON.parse(localStorage.getItem('alMenosUnaOtCerradaSinCerrarJornada'))
    }


    console.log('alMenosUnaOtCerradaSinCerrarJornada= ' + this.alMenosUnaOtCerradaSinCerrarJornada)
    //verificamos al cargar la pagina si existen datos en el localstorage, las cuales serian tareas continuan, ya sea una tarea que no esta cerrada(por que se cayo el sistema o se cerro la pagina) o porque es de la jornada anterior, en caso de existir, el arreglo de listOtIngresadas sera llenado con estos datos, para asi poder continuar con el trabajo.


    console.log('lista de ots en cache: ' + this.listOtIngresadas)
    this.getOperadores();
    this.getMotivoPausa();

    //aqui comparo las fechas al cerrar la jornada, si son iguales e sporque estoy entrando en una jornada que ya fue cerrada, por lo que le indicamos que la jornada esta cerrada, 

    //si no son iguales quiere decir que son fechas distintas, por tanto debemos abrir todas las ots que fueron cerradas para poder trabajar de nuevo

    //el problema es que si cierro una ot, me salgo y vuelvo a entrar, va a ver que la jornada como tal no esta cerrada, asi que la vuelve a abrir, aunque ya fue cerrada

    //la solucion es poner una variable al momento de cerrar la jornada, alMenosUnaOtCerradaSinCerrarJornada=true y al final tambien lo subimos al localstorage, si al volver a entrar esta variable es true entonces no debo abrir todas las ots

    //ahora al momento de cerrar la jornada definitivamente, subimos la fecha de la jornada cerrada, pero ademas indicamos que alMenosUnaOtCerradaSinCerrarJornada=false
    console.log('fecha en local storage= ' + this.fecha)
    console.log('fecha actual= ' + this.getFecha())
    if (this.fecha == this.getFecha()) {
      console.log('las fechas son iguales, eso quiere decir que la jornada fue cerrada, pero esta entradno de nuevo al sistema, por lo que vamos a cerrar la pantalla llamando al metodo pantallaoperadorescerrada')
      this.pantallaoperadorescerrada()
    } else {
      console.log('no son iguales las fechas, porque la fecha guardada es ' + this.fecha + ' y la fecha actual es= ' + this.getFecha() + ' , como no son iguales, quiere decir que la jornada se cerro en la primera fecha y estamos ingresando al sistema en la segunda fecha, asi que debemos activar todas las ots guardadas en el sistema')
      console.log('pero primero debemos ver si las fechas no son iguales, pero es porque algunos operadores cerraron sus ots, pero no han cerrado la jornada como tal, y si eso pasa, no puedo abrir todas las')
      console.log('alMenosUnaOtCerradaSinCerrarJornada antes de abrir las ots es= ' + this.alMenosUnaOtCerradaSinCerrarJornada)
      if (this.alMenosUnaOtCerradaSinCerrarJornada == false) {
        //quiere decir que las fechas no son iguales, y que la jornada fue cerrada , ya que el unico monento que alMenosUnaOtCerradaSinCerrarJornada=false, es cuando la jornada esta cerrada, asi que si es false es porque la jornada esta cerrada, y como las fechas no son iguales, quiere decir que es una jornada anterior que fue cerrada, por lo que si se cumplen estos datos, debemos abrir las ots, ademas de volver a dejar alMenosUnaOtCerradaSinCerrarJornada como true
        console.log('entramos al if de alMenosUnaOtCerradaSinCerrarJornada=false')
        this.alMenosUnaOtCerradaSinCerrarJornada = true
        if (this.listOtIngresadas.length != 0) {
          for (let index = 0; index < this.listOtIngresadas.length; index++) {
            //this.listOtIngresadas[index].Activa = true
            //si las abro de inmediato las ots, al momento de cerrar la jornada se podran cerrar jornadas de personas que quiza no asistieron al trabajo, por ende no se trabajo y si no se trabajo no se puede guardar sus tiempos
            //la solucion es abrir las ots, pero solo si las fechas de inicio de la ot y su fecha actual es distinta y si es su primer logueo del dia
            this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia = true
            this.listOtIngresadas[index].UsuarioLogueadoAlMenosUnaVez = false

          }
        }
      } else {
        console.log('quiere decir que las fechas no son iguales, y que alMenosUnaOtCerradaSinCerrarJornada=' + this.alMenosUnaOtCerradaSinCerrarJornada + ', asi quese deben mantener los datos tal cual estan')
      }

    }

  }

  getOperadores() {
    this.operadorService.getOperadores().subscribe(
      res => {
        this.operadores = res;
        console.log('getOperadores');
        console.log(res);
      },
      err => { console.error(err) }, () => {//
      }
    )
  }

  getMotivoPausa() {
    this.motivopausaService.getMotivoPausas().subscribe(
      res => {
        this.motivosPausas = res;
        console.log('getMotivos');
        console.log(res);
      },
      err => { console.error(err) }, () => {//
      }
    )
  }


  //metodo que toma un tiempo en milisegundos y lo pasa a tiempo normal en horas:minutos:segundos
  msToTime(duration: number) {
    console.log('entre en msToTime')
    let seconds: any = Math.floor((duration / 1000) % 60)
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60)
    //let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)
    let hours: any = Math.floor((duration / (1000 * 3600)) % 25)


    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    console.log('hora= ' + hours + ' minuto= ' + minutes + ' segundos= ' + seconds)
    return hours + ":" + minutes + ":" + seconds
  }


  //metodo que toma un tiempo en hora:minutos:segundos y retorna un array con 3 valores
  // array[hora,minutos,segundos]
  splitTime(time: string) {
    console.log(time)
    var x = time.concat(':')
    var splitted = x.split(":", 3);
    console.log(splitted)
    return splitted
  }



  //metodo que asigna la password del actual operador a una variable, asi se podra comparar con la ingresada por el usuario en verificarPassword
  getPassword(op: Operador) {
    let z = new Date()
    let y = new Date('Sat Dec 14 2019 13:43:26 GMT-0300 (hora de verano de Chile)');
    var time = z.getTime() - y.getTime()

    console.log('z= ' + z + '   ------  y= ' + y)

    console.log('time: ' + time)
    let aa = this.msToTime(time)
    console.log('tiempo transformado: ' + aa)

    this.password = op.Password;
    this.nombreOperador = op.Nombre
    console.log('password es: ' + this.password)
    this.nombreOperadorModal = op.Nombre
    console.log('nombre: ' + this.nombreOperadorModal)
    this.incorrecto = true;
    this.idOperadorreserva = op.IdOperador;
    console.log('id operador de reserva es:' + this.idOperadorreserva)

  }


  //metodo que verifica si la contraseña ingresada corresponde al usuario, sino, se indica que la contraseña es incorrecta, si esta vacia, indica que no ingreso nada y si esta bien
  //verifica si tiene una ot ya iniciada, una pausa activa y si esta cerrada o no
  verificarPassword() {

    // si la contraseña esta vacia hace esto y return
    if (this.passwordIngresada == '') {
      this.mensajAlertPassword = 'Campo vacio!'
      this.passwordcorrecta = false;
      this.incorrecto = true;
      this.alertaPassword = false;
      this.passwordIngresada = ''

      return
    }

    //si la contraseña es correcta entra
    if (this.password == this.passwordIngresada) {
      let InicioOt = false;
      let InicioPausa = false;
      this.passwordIngresada = ''
      this.passwordcorrecta = true;
      this.btnIniciar = false;
      this.idOperador = this.idOperadorreserva;
      this.Titulo = 'Operador: ' + this.nombreOperadorModal
      console.log('id operador oficial es: ' + this.idOperador)

      console.log('el id que voy a buscar en el array es: ' + this.idOperador)
      console.log(this.listOtIngresadas)
      //vemos si el operador esta en el list de ots, si esta es porque tiene una ot que no a cerrado
      for (let index = 0; index < this.listOtIngresadas.length; index++) {

        if (this.listOtIngresadas[index].IdOperador == this.idOperador) {
          console.log('el operador esta en el array')
          InicioOt = true;
          this.btnIniciar = true;
          this.btnCerrar = false;
          this.btnPausa = false;
          this.mensajeButtonIniciarOt = 'Ot iniciada, Hora de inicio: ' + this.listOtIngresadas[index].HoraInicio
          console.warn(this.listOtIngresadas[index].Activa)
          if (this.listOtIngresadas[index].Fecha) {

          }

          //sabemos que el operador esta en el list de ots, pero debemos ver si la ot esta abierta o cerrada
          if (this.listOtIngresadas[index].Activa == false) {
            //si esta cerrada solo imposibilitamos el trabajo, deshabilitando los botones 
            console.log('la ot fue cerrada, pero podria ser abierta si las fecha de inicio de la ot y la fecha actual son distintas y si es su primer logueo del dia')
            if (this.listOtIngresadas[index].Fecha != this.fecha && this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia) { //this.getFecha() !!!!!!!!!!

              this.listOtIngresadas[index].Activa = true;
              this.listOtIngresadas[index].HoraInicioDelDia = this.getHora();
              this.listOtIngresadas[index].FechaDelDia = this.getFecha();
              this.listOtIngresadas[index].HoraInicioDelDiaDate = new Date();

              console.log('los nuevos datos son= ')
              console.log('nueva fecha del dia= ' + this.listOtIngresadas[index].FechaDelDia)
              console.log('nueva hora inicio del dia= ' + this.listOtIngresadas[index].HoraInicioDelDia)
              console.log('nueva hora inicio del dia date= ' + this.listOtIngresadas[index].HoraInicioDelDiaDate)


            } else {
              this.btnIniciar = true
              this.btnPausa = true
              this.btnCerrar = true
              //this.btnCerrarJornadaLaboral=true
              this.mensajeButtonIniciarOt = 'Ot cerrada'
              this.mensajeButtonPausa = 'Pausar Ot'
              this.Titulo = 'Operador: ' + this.listOtIngresadas[index].Nombre
              //this.cerrarjornada=true 
            }
          } else {
            console.log('la ot esta abierta')

            // se puede dar que al hacer esto alguien no venga a trabajar y no interactue con la ot, como verificamos que si trabajo ese dia en la ot,y, en tal caso, agregar la hora inicio del dia y la fecha del dia, debe ser al loguarse, si se loguea de forma correcta debemos ver si la fecha de inicio de la ot es iguala la fecha actual, si las fechas son distintas, quiere decir que es una nueva jornada, y en tal caso debo reiniciar la hora inicio del dia y la fecha del dia
            console.log('fecha en que se inicio la ot= ' + this.listOtIngresadas[index].Fecha);
            console.log('fecha actual de trabajo de la ot= ' + this.listOtIngresadas[index].FechaDelDia);
            console.log('fecha actual= ' + this.getFecha());
            console.log('es el primer logueo del dia de este operador? =' + this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia)
            //si las fechas son distintas y es el primer logueo de la jornada 
            if (this.listOtIngresadas[index].Fecha != this.getFecha() && this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia) {

              //verificamos que las fechas no son iguales, pero esto se debe hacer la primera vez que pase esto, por que las siguientes veces, seran porque el usuario se esta loguando en el mismo dia

              console.log('la fecha de inicio de ot  y la fecha del dia no son iguales, por lo que no es el mismo dia en que se esta trabajando, y debo resetear los valores del dia para poder ingresar para esta nueva fecha los datos de hora inicio del dia y fecha del dia ')
              this.listOtIngresadas[index].HoraInicioDelDia = this.getHora();
              this.listOtIngresadas[index].FechaDelDia = this.getFecha();
              this.listOtIngresadas[index].HoraInicioDelDiaDate = new Date();

              console.log('los nuevos datos son= ')
              console.log('nueva fecha del dia= ' + this.listOtIngresadas[index].FechaDelDia)
              console.log('nueva hora inicio del dia= ' + this.listOtIngresadas[index].HoraInicioDelDia)
              console.log('nueva hora inicio del dia date= ' + this.listOtIngresadas[index].HoraInicioDelDiaDate)

            }
          }

          this.listOtIngresadas[index].UsuarioLogueadoAlMenosUnaVez = true
          console.log('ya terminamos, asi que usuario loguado al menos una vez = ' + this.listOtIngresadas[index].UsuarioLogueadoAlMenosUnaVez)
          this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia = false
          console.log('y ya termino, asi que es su primer logueo del dia= ' + this.listOtIngresadas[index].UsuarioPrimerLogueoDelDia)
        } //aqui se cierra el if 
      }




      console.log('buscar si tiene una pausa activa y no cerrada')
      for (let index = 0; index < this.listPausas.length; index++) {

        if (this.listPausas[index].IdOperador == this.idOperador && this.listPausas[index].HoraFin == undefined) {
          console.log('el operador tiene una pausa activa y no cerrada')
          InicioPausa = true;
          this.btnIniciar = false;
          this.btnCerrar = true;
          this.btnPausa = true;
          this.mensajeButtonIniciarOt = 'Reanudar Ot'
          this.mensajeButtonPausa = "Ot pausada, Hora pausa: " + this.listPausas[index].HoraInicio
          var b = document.querySelector("#btnIniciarOt");
          //b.removeAttribute("data-toggle");
          b.setAttribute("data-target", "#modalTerminarPausa")
        }
      }


      this.datoenlocalstorage();
      //si no entra a los for, el InicioOt es false, eso quiere decir que no existe una ot iniciada, asi que debe quedar la pantalla para inciiar una nueva ot
      if (InicioOt == false) {
        console.log('el operador no esta en el array')
        this.mensajeButtonIniciarOt = 'Iniciar Ot'
        this.mensajeButtonPausa = 'Pausar Ot'
        this.btnIniciar = false;
        this.btnCerrar = true;
        this.btnPausa = true;
        var b = document.querySelector("#btnIniciarOt");
        //b.removeAttribute("data-toggle");
        b.setAttribute("data-target", "#modalCodigo")
        if (InicioPausa == false) {
          console.log('el operador no esta en el array y el operador no tiene pausas')
          this.mensajeButtonPausa = 'Pausar Ot'
        }
        return
      } else {
        if (InicioPausa == false) {
          console.log('el operador esta en el array,pero no tiene pausas')
          this.mensajeButtonPausa = 'Pausar Ot'
          var b = document.querySelector("#btnIniciarOt");
          //b.removeAttribute("data-toggle");
          b.setAttribute("data-target", "#modalCodigo")
          return
        } else {
          console.log('el operador esta en el array y tiene una pausa')
        }
      }

    } else { // si la contraseña es incorrecta hace esto y return
      this.mensajAlertPassword = 'Contraseña incorrecta!'
      this.passwordcorrecta = false;
      this.incorrecto = true;
      this.alertaPassword = false;
      this.passwordIngresada = ''
    }

  }

  limpiarPassword() {
    this.passwordIngresada = '';
    this.alertaPassword = true;
  }

  limpiarCodigo() {
    this.codigoIngresado = '';
    this.alertaCodigo = true;
  }

  cerrarAlertaPassword() {
    this.alertaPassword = true;
  }

  getHora() {
    let date = new Date();

    let hora, minuto, segundo;
    if (date.getHours() < 10) {
      hora = '0' + date.getHours();
    } else {
      hora = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minuto = '0' + date.getMinutes();
    } else {
      minuto = date.getMinutes();
    }
    if (date.getSeconds() < 10) {
      segundo = '0' + date.getSeconds();
    } else {
      segundo = date.getSeconds();
    }
    var horaInicio = hora + ':' + minuto + ':' + segundo
    console.log('la hora de inicio es: ' + horaInicio)

    return horaInicio;
  }

  getFecha() {
    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    var fecha = dd + '/' + mm + '/' + yyyy;
    console.log('fecha: ' + fecha)
    return fecha;
  }

  cerrarAlertaCodigo() {
    this.alertaCodigo = true;
  }

  IniciarOt() {
    if (this.codigoIngresado == undefined || this.codigoIngresado == '') {
      console.log('no se ingreso un codigo')
      this.mensajAlertCodigo = 'Debe ingresar un codigo!'
      this.alertaCodigo = false;
    } else {
      console.log('codigo bien ingresado( o sea que no sea vacio o undefined), por lo que creamos la ot')
      console.log('primero vamos a ver si existe una pausa que deberia ser eliminada, para ello veremos si una pausa con su idtrabajo, ya que solo al insertarla se le asigna este dato, si lo tiene es porque se inserto, pero no se elimino del list')
      for (let k = 0; k < this.listPausas.length; k++) {
        if (this.listPausas[k].IdTrabajo === undefined) {
          console.log('existe una pausa que es undefined el id trabajo, asi que esta bien ')
        } else {
          console.log('tenemos una pausa que su id trabajo no es undefined, asi que la eliminamos')
          this.listPausas.splice(k, 1)
        }

      }

      for (let j = 0; j < this.listTiempo.length; j++) {
        if (this.listTiempo[j].IdTrabajo === undefined) {
          console.log('tenemos un tiempo que su id trabajo no es undefined, asi que la eliminamos')
        } else {
          console.log('tenemos un tiempo que su id trabajo  es undefined, asi que lo eliminamos')
          this.listTiempo.splice(j, 1)
        }

      }
      let ottrabajdor = new OtTrabajador()
      ottrabajdor.Codigo = this.codigoIngresado
      ottrabajdor.Fecha = this.getFecha();
      ottrabajdor.HoraInicio = this.getHora();
      ottrabajdor.IdOperador = this.idOperador;
      ottrabajdor.HoraInicioDate = new Date();

      //datos que agregamos para tener los datos separados por dia
      ottrabajdor.HoraInicioDelDia = this.getHora();
      ottrabajdor.HoraInicioDelDiaDate = new Date();
      ottrabajdor.FechaDelDia = this.getFecha();
      ottrabajdor.Activa = true //como creamos la ot, esta obviamente esta activa

      //y aqui inidcamos que como creo la ot, ya se ha loguado al menos una vez, y como se ha loguado al menos una vez, la proxima vez que se loguee no sera su primer logueo del dia
      ottrabajdor.UsuarioLogueadoAlMenosUnaVez = true
      ottrabajdor.UsuarioPrimerLogueoDelDia = false



      var splitted = this.Titulo.split(": ", 2);
      console.log('nombre= ' + splitted)
      ottrabajdor.Nombre = splitted[1]


      console.log('los datos de la ot creada son= ' + ottrabajdor)
      this.listOtIngresadas.push(ottrabajdor);


      this.mensajeButtonIniciarOt = 'Ot iniciada,Hora de inicio: ' + ottrabajdor.HoraInicio

      for (let index = 0; index < this.listOtIngresadas.length; index++) {
        console.log('elemento ' + index + '= {IdOperador: ' + this.listOtIngresadas[index].IdOperador + ', Codigo: ' + this.listOtIngresadas[index].Codigo + ', Fecha: ' + this.listOtIngresadas[index].Fecha + ', HoraInicio: ' + this.listOtIngresadas[index].HoraInicio + '}')
        console.log(this.listOtIngresadas[index])
      }

      console.log(ottrabajdor)
      this.codigoIngresado = '';
      this.btnIniciar = true;
      this.btnCerrar = false;
      this.btnPausa = false;
      this.datoenlocalstorage();
    }
  }


  getMotivoSeleccionado(motivo) {
    this.btnIniciarPausa = false;
    this.motivoSeleccionado = motivo.Descripcion;
    this.idMotivoSeleccionado = motivo.IdMotivoPausa;
    console.log('motivo es: ' + this.motivoSeleccionado + 'y su id: ' + this.idMotivoSeleccionado)

  }

  iniciarPausa() {
    if (this.motivoSeleccionado != undefined && this.idMotivoSeleccionado != undefined) {

      let pausa = new Pausa()
      pausa.Fecha = this.getFecha()
      pausa.HoraInicio = this.getHora()
      pausa.HoraInicioDate = new Date();
      pausa.IdMotivoPausa = this.idMotivoSeleccionado
      pausa.IdOperador = this.idOperador;
      this.listPausas.push(pausa);
      for (let index = 0; index < this.listPausas.length; index++) {
        console.log('elemento ' + index + '= {IdMotivoPausa: ' + this.listPausas[index].IdMotivoPausa + ', Fecha: ' + this.listPausas[index].Fecha + ', HoraInicio: ' + this.listPausas[index].HoraInicio + ', IdOperador: ' + this.listPausas[index].IdOperador + '}')

      }

      this.limpiarMotivoSeleccionado()
      this.btnPausa = true;
      this.btnCerrar = true;
      this.btnIniciar = false;
      this.mensajeButtonIniciarOt = "Reanudar Ot"
      this.mensajeButtonPausa = "Ot pausada, Hora pausa: " + this.getHora()
      //this.EstaEnPausa=true;
      var b = document.querySelector("#btnIniciarOt");
      //b.removeAttribute("data-toggle");
      b.setAttribute("data-target", "#modalTerminarPausa")
      this.datoenlocalstorage();
    }
  }

  limpiarMotivoSeleccionado() {
    this.btnIniciarPausa = true;
    this.motivoSeleccionado = undefined;
    this.idMotivoSeleccionado = undefined;
  }


  terminarPausa() {
    for (let index = 0; index < this.listPausas.length; index++) {

      if (this.listPausas[index].HoraFin != undefined) {
        console.log('pausa terminada elemento ' + index + '= {IdMotivoPausa: ' + this.listPausas[index].IdMotivoPausa + ', Fecha: ' + this.listPausas[index].Fecha + ', HoraInicio: ' + this.listPausas[index].HoraInicio + ', HoraFin: ' + this.listPausas[index].HoraFin + ', IdOperador: ' + this.listPausas[index].IdOperador + ',}')
      }



      if (this.listPausas[index].IdOperador == this.idOperador && this.listPausas[index].HoraFin == undefined) {
        this.listPausas[index].HoraFin = this.getHora();
        this.listPausas[index].HoraFinDate = new Date();
        var time = this.listPausas[index].HoraFinDate.getTime() - this.listPausas[index].HoraInicioDate.getTime()
        this.listPausas[index].TotalTiempo = this.msToTime(time)
        console.warn('nueva pausa terminada ')
        console.warn(this.listPausas[index])
        this.btnIniciar = true;
        this.btnCerrar = false;
        this.btnPausa = false;
        this.mensajeButtonPausa = 'Pausar Ot'
      }
    }


    this.datoenlocalstorage();

    for (let index = 0; index < this.listOtIngresadas.length; index++) {
      if (this.listOtIngresadas[index].IdOperador == this.idOperador) {
        this.mensajeButtonIniciarOt = 'Ot iniciada,Hora de inicio: ' + this.listOtIngresadas[index].HoraInicio
        this.mensajeButtonPausa = 'Pausar Ot'
        return
      }

    }
  }


  cerrarOtDesdeBotonCerrar() {
    console.log('variable es:' + this.idOtparaBuscar)
    for (let index = 0; index < this.listOtIngresadas.length; index++) {
      if (this.listOtIngresadas[index].IdOperador == this.idOperador) {
        this.cerrarOtFuncionalidad(index, 'cerrarOtDesdeBotonCerrar')
        // this.listOtIngresadas.splice(index,1)
        //aqui no puedo eliminar el obj del list ots, ya que no alanza a guardarse antes de eliminar el dato, se debe terminar de hacer todo, y solo en ese punto se debe eliminar esta ot, o sea, debo hacerlo al actualizar el total tiempo de ot en el for de tiempos
      }
    }
    //this.mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada()
    this.datoenlocalstorage()
  }

  reiniciarPantallaOperador() {
    this.btnIniciar = false;
    this.btnPausa = true;
    this.btnCerrar = true;
    this.mensajeButtonIniciarOt = 'Iniciar Ot'
    this.mensajeButtonPausa = 'Pausar Ot'
    alert('Ot insertada correctamente!')
    // $('#modalCerrarOt').modal('hide');
  }

  datoenlocalstorage() {

    localStorage.removeItem('listTrabajos');
    localStorage.removeItem('listPausas');
    localStorage.removeItem('listTiempo');
    localStorage.removeItem('alMenosUnaOtCerradaSinCerrarJornada')
    localStorage.setItem('listTrabajos', JSON.stringify(this.listOtIngresadas))
    localStorage.setItem('listPausas', JSON.stringify(this.listPausas))
    localStorage.setItem('listTiempo', JSON.stringify(this.listTiempo))
    localStorage.setItem('alMenosUnaOtCerradaSinCerrarJornada', JSON.stringify(this.alMenosUnaOtCerradaSinCerrarJornada))
    this.dd++
  }

  CerrarJornada() {

    this.VerificarOtsActivasAntesDeCerrarJornada()

  }

  //verifica si las ots de la lista de listOtIngresadas estan todas cerradas, en caso de haber una activa, se muestra el modal con la info para cerrar las ots que falten por cerrar, en caso que todas esten cerradas, podemos cerrar la jornada laboral 
  VerificarOtsActivasAntesDeCerrarJornada() {
    console.log('verificar ots ingresadas')
    if (this.listOtIngresadas.length > 0) {

      for (let i = 0; i < this.listOtIngresadas.length; i++) {
        console.warn(i)
        if (this.listOtIngresadas[i].Activa != false) {
          console.log(i + ' no esta cerrada, asi que no se puede cerrar y se deben mostrar los datos')
          this.cerrarjornada = false

          this.descripcionmodalcerrarjornadadescripcion = 'Todos los trabajos pendientes deben ser cerrados o indicar que continuara en su siguiente jornada laboral.Por favor, seleccione la opcion indicada para cada caso especifico.'
          return
        }
      }
      console.log('todas las ots estan cerradas, asi que se puede cerrar')
      this.cerrarjornada = true
      this.descripcionmodalcerrarjornadadescripcion = 'Puede cerrar la jornada laboral actual, recuerde que al hacerlo, no podra continuar con su trabajo hasta la siguiente jornada laboral'
      return
    } else {
      console.log('la lista esta vacia por lo que se puede cerrar, asi que true')
      this.cerrarjornada = true
      this.descripcionmodalcerrarjornadadescripcion = 'Puede cerrar la jornada laboral actual, recuerde que al hacerlo, no podra continuar con su trabajo hasta la siguiente jornada laboral'
    }
  }

  cerrarotmodaljornadaicono(ot: any) {
    console.log(ot)
    this.titulomodalcerrarjornadadescripcion = 'Cerrar ot'
    this.descripcionmodalcerrarjornadadescripcion = ot.Nombre + ' cerrara la ot de codigo ' + ot.Codigo + ' iniciada el dia ' + ot.Fecha + ' a las ' + ot.HoraInicio;
    this.variableidoperadorencerrarjornadamodal = ot.IdOperador
    this.ocultarbotonpantallacerrarjornada = false
    this.buttoncerrarotenmodalcerrarjornada = true
  }

  nextdayotmodaljornadaicono(ot: any) {
    console.log(ot)
    this.titulomodalcerrarjornadadescripcion = 'Cerrar jornada'
    this.descripcionmodalcerrarjornadadescripcion = ot.Nombre + ' concluye la jornada de trabajo para la ot de codigo ' + ot.Codigo + ' iniciada el dia ' + ot.Fecha + ' a las ' + ot.HoraInicio + ', la cual sera continuada en la siguiente jornada laboral'
    this.variableidoperadorencerrarjornadamodal = ot.IdOperador
    this.ocultarbotonpantallacerrarjornada = false
    this.buttoncerrarotenmodalcerrarjornada = false
  }


  //metodo para cerrar ot en modal cerrar jornada
  cerrarOtdesdemodalcerrarjornada() {
    console.log('id operador en modal cerrar jornada= ' + this.variableidoperadorencerrarjornadamodal)

    console.log('variable es:' + this.idOtparaBuscar)
    for (let index = 0; index < this.listOtIngresadas.length; index++) {
      if (this.listOtIngresadas[index].IdOperador == this.variableidoperadorencerrarjornadamodal) {
        this.cerrarOtFuncionalidad(index, 'cerrarOtdesdemodalcerrarjornada')
        // this.listOtIngresadas.splice(index,1)
        //aqui no puedo eliminar el obj del list ots, ya que no alanza a guardarse antes de eliminar el dato, se debe terminar de hacer todo, y solo en ese punto se debe eliminar esta ot, o sea, debo hacerlo al actualizar el total tiempo de ot en el for de tiempos
      }
    }
    //this.mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada()
    this.datoenlocalstorage()
  }


  //meotodo que es llamado al cerrar la ot, ya sea desde el button como desde el modal, hace toda la funcioanlidad para cerrar la ot, como lo es cerrarla, subirla, restar las pausas del total de tiempo por dia y subir los tiempos por dia
  cerrarOtFuncionalidad(index: number, deDondeEsLlamado: string) {
    console.log('------------------------------------------------')
    console.log('------------------------------------------------')
    console.log('entramos a cerrar ot funcionalidad')
    console.log('------------------------------------------------')
    console.log('------------------------------------------------')
    console.log('de donde es llamado= ' + deDondeEsLlamado)
    console.log('------------------------------------------------')
    console.log('------------------------------------------------')

    //encuentro la ot a cerrada, como este es el dato con el que voy a trabajar, una vez se haga todo, se debe salir del for
    //////////////////////////////////
    console.log('es llamado desde = ' + deDondeEsLlamado)
    //let tiempoTotalOtPorDia:any
    let horaOtDatepordia: Date
    console.log('declare la variable tiempoTotalOtPorDia')
    let tiempoEnMilisegundos: any;
    let horaIniciodate = new Date(this.listOtIngresadas[index].HoraInicioDelDiaDate);
    let horaTerminodate = new Date()
    tiempoEnMilisegundos = horaTerminodate.getTime() - horaIniciodate.getTime()
    let x = this.msToTime(tiempoEnMilisegundos)
    let objTiempo = new Tiempo()

    objTiempo.IdOperador = this.listOtIngresadas[index].IdOperador
    objTiempo.Fecha = this.listOtIngresadas[index].FechaDelDia
    objTiempo.HoraInicio = this.listOtIngresadas[index].HoraInicioDelDia
    objTiempo.HoraFin = this.getHora();

    // objTiempo.TotalTiempo = x //aqui tengo el total del tiempo, sin la resta de pausas
    this.tiempoTotalOtpordia = x//aqui le asigno a tiempoTotalOtpordia la diferencia de hora inicio por dia y hora fin por dia, asi que al momento de restar las pausas, sean separdos los tiempos de total tiempo ot, y total tiempo ot por dia
    var totalTiempoOtsumadostodoslosdias = '00:00:00';
    ////////////////////////////////

    this.cerrarPausadesdemodalcerrarjornada(this.variableidoperadorencerrarjornadamodal)

    this.listOtIngresadas[index].HoraFin = this.getHora();
    this.listOtIngresadas[index].HoraFinDate = new Date();
    // var time = this.listOtIngresadas[index].HoraFinDate.getTime() - this.listOtIngresadas[index].HoraInicioDate.getTime()
    // this.tiempoTotalOt = this.msToTime(time)
    // console.log('tiempo total ot 2: ' + this.tiempoTotalOt)
    var idTrabajoparaeliminarpausas: any;
    /////////////////////////

    var idoperadorsegunelmetododesdeelcualesllamado: any;

    if (deDondeEsLlamado == 'cerrarOtDesdeBotonCerrar') {
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      console.log('el metodo es llamdo desde cerrarOtDesdeBotonCerrar, por lo que el id que consideramos es id operador, que vale= ' + this.idOperador)
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      idoperadorsegunelmetododesdeelcualesllamado = this.idOperador
    }
    if (deDondeEsLlamado == 'cerrarOtdesdemodalcerrarjornada') {
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      console.log('el metodo es llamdo desde cerrarOtdesdemodalcerrarjornada, por lo que el id que consideramos es variableidoperadorencerrarjornadamodal, que vale= ' + this.variableidoperadorencerrarjornadamodal)
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      idoperadorsegunelmetododesdeelcualesllamado = this.variableidoperadorencerrarjornadamodal
    }
    


    var time = new Date(this.listOtIngresadas[index].HoraFinDate).getTime() - new Date(this.listOtIngresadas[index].HoraInicioDate).getTime()
    this.tiempoTotalOt = this.msToTime(time)
    console.log('tiempo total ot : ' + this.tiempoTotalOt)
    ///////////////////////// 



    console.log('se cerrara la ot de codigo: ' + this.listOtIngresadas[index].Codigo + ' iniciada por el operador: ' + this.listOtIngresadas[index].IdOperador + ' con fecha: ' + this.listOtIngresadas[index].Fecha + ' y hora de inicio: ' + this.listOtIngresadas[index].HoraInicio + ' y hora de cierre: ' + this.listOtIngresadas[index].HoraFin + ' .')
    console.log('vamos a verificar codigo')
    this.trabajoService.verificarCodigoOt(this.listOtIngresadas[index].Codigo).subscribe( // aqui solo verificamos si existe el codigo, retornando un si o no
      //si existe, luego la buscamos, sino existe, se inserta
      //lo que se debe hacer es que en caso que exista retorna los datos de inmediato y si no existe, de inmediato lo inserta y retorna la data 
      res => {
        //console.log(res)
        if (res == 'no existe') {
          console.log('como no existe vamos a insertarlo en la db')
          this.otParaGuardar.Codigo = this.listOtIngresadas[index].Codigo
          this.otService.saveOt(this.otParaGuardar).subscribe(
            res => {
              console.log(res);
              this.idOtparaBuscar = res;
              console.log('ahora que ya fue insertado lo vamos a buscar')
              this.codigoparabuscarot = this.listOtIngresadas[index].Codigo
              this.otService.getOtByCodigo(this.codigoparabuscarot).subscribe(
                res => {  //esto se debe eliminar, ya que al insertar el codigo me puede retornar el id
                  this.otretornada = res;
                  console.log('id de la ot retornada: ' + this.otretornada.IdOt)
                  this.listOtIngresadas[index].IdOt = this.otretornada.IdOt
                  delete this.listOtIngresadas[index].Codigo
                  // delete this.listOtIngresadas[index].HoraInicioDate
                  // delete this.listOtIngresadas[index].HoraFinDate
                  console.log(this.listOtIngresadas[index])
                  this.trabajoService.saveTrabajo(this.listOtIngresadas[index]).subscribe(
                    res => {
                      //eliminamos el trabajo insertado del array
                      console.log('insertamos el trabajo y el res es= ' + res)
                      this.listOtIngresadas.splice(index, 1);
                      var b = document.querySelector("#btnIniciarOt");
                      b.setAttribute("data-target", "#modalCodigo")

                      this.reiniciarPantallaOperador()
                      //vamos a insertar las pausas si es que tiene 
                      console.log('primero vamos a ver las pausas')
                      for (let i = 0; i < this.listPausas.length; i++) {
                        console.log('entro al for de pausas')

                        if (this.listPausas[i].IdOperador == this.idOperador)
                          //encontro una pausa asociada con este trabajador y esta ot

                          console.log('tiempo total ot a dividir= ' + this.tiempoTotalOt)
                        console.log('tiempo total ot por dia a dividir= ' + this.tiempoTotalOtpordia)

                        var totalhoraotarraypordia = this.splitTime(this.tiempoTotalOtpordia)
                        console.log('este dato que no se= ' + totalhoraotarraypordia)
                        console.log('tiempo total ot 6: ' + this.tiempoTotalOtpordia)
                        var TotalhoraOtDatepordia = new Date()
                        TotalhoraOtDatepordia.setHours(parseInt(totalhoraotarraypordia[0]))
                        TotalhoraOtDatepordia.setMinutes(parseInt(totalhoraotarraypordia[1]))
                        TotalhoraOtDatepordia.setSeconds(parseInt(totalhoraotarraypordia[2]))
                        console.log('tiempo total ot por dia en formato date= ' + TotalhoraOtDatepordia)
                        console.warn('el tiempo total de la ot por dia es= ' + this.tiempoTotalOtpordia)
                        //ya tengo el tiempo total por dia


                        var totalhoraotarray = this.splitTime(this.tiempoTotalOt)
                        console.log('este dato que no se= ' + totalhoraotarray)
                        console.log('tiempo total ot 6: ' + this.tiempoTotalOt)
                        var Totalhoraotdate = new Date()
                        console.log('aqui veo la hora')
                        console.log('el total de tiempo de esta pausa es= ' + this.listPausas[i].TotalTiempo)
                        Totalhoraotdate.setHours(parseInt(totalhoraotarray[0]))
                        console.log('aqui veo los minutos')
                        console.log('el total de tiempo de esta pausa es= ' + this.listPausas[i].TotalTiempo)
                        Totalhoraotdate.setMinutes(parseInt(totalhoraotarray[1]))
                        console.log('aqui los segundos')
                        console.log('el total de tiempo de esta pausa es= ' + this.listPausas[i].TotalTiempo)
                        Totalhoraotdate.setSeconds(parseInt(totalhoraotarray[2]))
                        console.log('tiempo total ot en formato date= ' + Totalhoraotdate)
                        console.log('el total de tiempo de esta pausa es= ' + this.listPausas[i].TotalTiempo)
                        var totalhorapausaarray = this.splitTime(this.listPausas[i].TotalTiempo)
                        var Totalhorapausadate = new Date()
                        Totalhorapausadate.setHours(parseInt(totalhorapausaarray[0]))
                        Totalhorapausadate.setMinutes(parseInt(totalhorapausaarray[1]))
                        Totalhorapausadate.setSeconds(parseInt(totalhorapausaarray[2]))

                        console.log('tiempo total pausa en formato date= ' + Totalhorapausadate)
                        //aqui tengo el tiempo total de la pausa a restar, por lo que tengo qye verificar si es una pausa del dia, si lo es le resto el tiempo, sino quiere decir que es una pausa de otro dia, por lo que no tengo que considerarla

                        var fechaot = TotalhoraOtDatepordia.getDate() + '/' + TotalhoraOtDatepordia.getMonth() + '/' + TotalhoraOtDatepordia.getFullYear()
                        var fechapausa = Totalhorapausadate.getDate() + '/' + Totalhorapausadate.getMonth() + '/' + Totalhorapausadate.getFullYear()
                        console.log(horaOtDatepordia)
                        console.log(Totalhorapausadate)
                        if (fechaot == fechapausa) {
                          console.warn('las fechas son iguales, como lo son tengo que restar las horas a la hora por dia')
                          console.log(fechaot)
                          console.log(fechapausa)
                          console.log('hora por dia= ' + TotalhoraOtDatepordia.getTime())
                          console.log('hora de pausa a restra= ' + Totalhorapausadate.getTime())
                          var timepordia = TotalhoraOtDatepordia.getTime() - Totalhorapausadate.getTime();
                          var nuevoTotalhoraotpordia = this.msToTime(timepordia)
                          console.log('tiempo ot sin pausa por dia= ' + nuevoTotalhoraotpordia)
                          this.tiempoTotalOtpordia = nuevoTotalhoraotpordia
                        }

                        var time = Totalhoraotdate.getTime() - Totalhorapausadate.getTime();
                        var nuevoTotalhoraot = this.msToTime(time)
                        console.log('tiempo ot sin pausa= ' + nuevoTotalhoraot)
                        this.tiempoTotalOt = nuevoTotalhoraot
                        this.listPausas[i].IdTrabajo = JSON.stringify(res)
                        var idtrabajofinal = ('' + this.listPausas[i].IdTrabajo)
                        console.log('id trabajo final=' + idtrabajofinal)
                        delete this.listPausas[i].IdOperador
                        delete this.listPausas[i].HoraInicioDate
                        delete this.listPausas[i].HoraFinDate
                        console.log(this.listPausas[i])
                        this.pausaService.savePausa(this.listPausas[i]).subscribe(
                          res => {
                            this.listPausas.splice(i, 1);
                            console.log('lista de pausas' + this.listPausas)
                            this.otTrabajadorparaActualizar.TotalTiempo = this.tiempoTotalOt
                            this.trabajoService.updateTotalTiempo(idtrabajofinal, this.otTrabajadorparaActualizar).subscribe(
                              res => {
                                console.log('actualizado nuevo total tiempo de trabajo!')
                                console.log(this.otTrabajadorparaActualizar)

                                //aqui tengo el tiempo de la ot sin pausas, pero es el tiempo total


                              },
                              err => { console.error(err) }, () => {//
                              }
                            )
                          },
                          err => { console.error(err) }, () => {//
                          }
                        )
                      }

                      console.warn('al salir del for de pausas')
                      console.log('tiempo total ot por dia= ' + this.tiempoTotalOtpordia)
                      console.log('tiempo total ot= ' + this.tiempoTotalOt)
                      //una vez terminado el for de pausas,actualizamos el valor del tiempo total por dia
                      objTiempo.TotalTiempo = this.tiempoTotalOtpordia
                      console.log(objTiempo)
                      console.warn('el tiempo total sin pausas= ' + objTiempo.TotalTiempo)
                      console.log('ahora insertamos el objeto en el list de tiempos')
                      this.listTiempo.push(objTiempo)
                      console.log(this.listTiempo)


                      console.log('segundo tengo que ver el tiempo')
                      for (let j = 0; j < this.listTiempo.length; j++) {
                        console.log('entre al for de tiempos')
                        console.log('id operador= ' + this.idOperador)
                        console.log('id operador en modal= ' + this.variableidoperadorencerrarjornadamodal)
                        console.log('id en list= ' + this.listTiempo[j].IdOperador)
                        if (this.listTiempo[j].IdOperador == this.variableidoperadorencerrarjornadamodal) {

                          console.log('encontro un tiempo asociado a este operador')
                          console.log('id trabajo retornada= ' + JSON.stringify(res))
                          this.listTiempo[j].IdTrabajo = JSON.stringify(res)
                          this.tiempoService.saveTiempo(this.listTiempo[j]).subscribe(
                            res => {
                              console.log(res)
                              this.listTiempo.splice(j, 1);
                            },
                            err => console.error(err)
                          );

                        }

                      }


                    },
                    err => { console.error(err) }, () => {//
                    }
                  )
                },
                err => { console.error(err) }, () => {//
                }
              )
            },
            err => { console.error(err) }, () => {//
            }
          )
        } else {
          console.log('existe en la db, asi que lo buscamos')
          this.codigoparabuscarot = this.listOtIngresadas[index].Codigo
          this.otService.getOtByCodigo(this.codigoparabuscarot).subscribe(
            res => {
              this.otretornada = res;
              console.log('id de la ot retornada: ' + this.otretornada.IdOt)
              this.listOtIngresadas[index].IdOt = this.otretornada.IdOt
              // this.listOtIngresadas[index].FechaTermino=this.getFecha()
              delete this.listOtIngresadas[index].Codigo
              console.log(this.listOtIngresadas[index])


              this.trabajoService.saveTrabajo(this.listOtIngresadas[index]).subscribe(
                res => {
                  console.log('------------------------------------------------')
                  console.log('------------------------------------------------')
                  console.log('insertamos el trabajo')
                  console.log('------------------------------------------------')
                  console.log('------------------------------------------------')
                  console.log('insertamos el trabajo y el res es= ' + res)
                  var idotparaactualizarenfortiempos = JSON.stringify(res);
                  this.listOtIngresadas.splice(index, 1);
                  console.log(this.listOtIngresadas)
                  var b = document.querySelector("#btnIniciarOt");
                  b.setAttribute("data-target", "#modalCodigo")
                  this.reiniciarPantallaOperador()

                  //vamos a insertar las pausas si es que tiene 
                  console.log('------------------------------------------------')
                  console.log('------------------------------------------------')
                  console.log('primero vamos a ver las pausas')
                  console.log('------------------------------------------------')
                  console.log('------------------------------------------------')
                  
                  for (let i = 0; i < this.listPausas.length; i++) {
                    console.log('entro al for de pausas')
                    console.log('el id de operador que estoy buscando es= ' + this.idOperador)
                    console.log('y el id del list pausas []' + i + ' es= ' + this.listPausas[i].IdOperador)
                    console.log('id operador es= ' + this.idOperador)
                    console.log('variable id en modal= ' + this.variableidoperadorencerrarjornadamodal)
                    console.log('------------------------------------------------')
                    console.log('------------------------------------------------')
                    console.log('mi variable id operador segun el metodo desde el cual es llamado=' + idoperadorsegunelmetododesdeelcualesllamado)
                    console.log('------------------------------------------------')
                    console.log('------------------------------------------------')

                    if (this.listPausas[i].IdOperador == idoperadorsegunelmetododesdeelcualesllamado) {
                      //aqui debe ser idoperador o idoperador en modal
                      //encontro una pausa asociada con este trabajador y esta ot
                      console.log('encontre una pausa relacionada con el operador= ' + idoperadorsegunelmetododesdeelcualesllamado)
                      console.log(this.listPausas[i])


                      console.log('tiempo total ot a dividir= ' + this.tiempoTotalOt)
                      console.log('tiempo total ot por dia a dividir= ' + this.tiempoTotalOtpordia)

                      var totalhoraotarraypordia = this.splitTime(this.tiempoTotalOtpordia)
                      console.log('este dato que no se= ' + totalhoraotarraypordia)
                      console.log('tiempo total ot 6: ' + this.tiempoTotalOtpordia)
                      var TotalhoraOtDatepordia = new Date()
                      TotalhoraOtDatepordia.setHours(parseInt(totalhoraotarraypordia[0]))
                      TotalhoraOtDatepordia.setMinutes(parseInt(totalhoraotarraypordia[1]))
                      TotalhoraOtDatepordia.setSeconds(parseInt(totalhoraotarraypordia[2]))
                      console.log('tiempo total ot por dia en formato date= ' + TotalhoraOtDatepordia)
                      console.warn('el tiempo total de la ot por dia es= ' + this.tiempoTotalOtpordia)
                      //ya tengo el tiempo total por dia


                      var totalhoraotarray = this.splitTime(this.tiempoTotalOt)
                      console.log('este dato que no se= ' + totalhoraotarray)
                      console.log('tiempo total ot 6: ' + this.tiempoTotalOt)
                      var Totalhoraotdate = new Date()
                      console.log('aqui veo la hora')
                      Totalhoraotdate.setHours(parseInt(totalhoraotarray[0]))
                      console.log('aqui veo los minutos')
                      Totalhoraotdate.setMinutes(parseInt(totalhoraotarray[1]))
                      console.log('aqui los segundos')
                      Totalhoraotdate.setSeconds(parseInt(totalhoraotarray[2]))
                      console.log('tiempo total ot en formato date= ' + Totalhoraotdate)
                      console.log('total de tiempo de esta pausa= ' + this.listPausas[i].TotalTiempo)
                      var totalhorapausaarray = this.splitTime(this.listPausas[i].TotalTiempo)
                      var Totalhorapausadate = new Date()
                      Totalhorapausadate.setHours(parseInt(totalhorapausaarray[0]))
                      Totalhorapausadate.setMinutes(parseInt(totalhorapausaarray[1]))
                      Totalhorapausadate.setSeconds(parseInt(totalhorapausaarray[2]))

                      console.log('tiempo total pausa en formato date= ' + Totalhorapausadate)
                      //aqui tengo el tiempo total de la pausa a restar, por lo que tengo qye verificar si es una pausa del dia, si lo es le resto el tiempo, sino quiere decir que es una pausa de otro dia, por lo que no tengo que considerarla

                      var fechaot = TotalhoraOtDatepordia.getDate() + '/' + TotalhoraOtDatepordia.getMonth() + '/' + TotalhoraOtDatepordia.getFullYear()
                      var fechapausa = Totalhorapausadate.getDate() + '/' + Totalhorapausadate.getMonth() + '/' + Totalhorapausadate.getFullYear()
                      console.log(horaOtDatepordia)
                      console.log(Totalhorapausadate)
                      if (fechaot == fechapausa) {
                        console.warn('las fechas son iguales, como lo son tengo que restar las horas a la hora por dia')
                        console.log(fechaot)
                        console.log(fechapausa)
                        console.log('hora por dia= ' + TotalhoraOtDatepordia.getTime())
                        console.log('hora de pausa a restra= ' + Totalhorapausadate.getTime())
                        var timepordia = TotalhoraOtDatepordia.getTime() - Totalhorapausadate.getTime();
                        var nuevoTotalhoraotpordia = this.msToTime(timepordia)
                        console.log('tiempo ot sin pausa por dia= ' + nuevoTotalhoraotpordia)
                        this.tiempoTotalOtpordia = nuevoTotalhoraotpordia
                      }

                      var time = Totalhoraotdate.getTime() - Totalhorapausadate.getTime();
                      var nuevoTotalhoraot = this.msToTime(time)
                      console.log('tiempo ot sin pausa= ' + nuevoTotalhoraot)
                      this.tiempoTotalOt = nuevoTotalhoraot
                      this.listPausas[i].IdTrabajo = JSON.stringify(res)
                      var idtrabajofinal = ('' + this.listPausas[i].IdTrabajo)
                      console.log('id trabajo final=' + idtrabajofinal)
                      delete this.listPausas[i].IdOperador
                      delete this.listPausas[i].HoraInicioDate
                      delete this.listPausas[i].HoraFinDate
                      console.log(this.listPausas[i])
                      this.pausaService.savePausa(this.listPausas[i]).subscribe(
                        res => {
                          console.log(res)
                          console.log('lista de pausas' + this.listPausas)
                          this.otTrabajadorparaActualizar.TotalTiempo = this.tiempoTotalOt
                          console.error('el id del trabajo= ' + idtrabajofinal + ' y el objeto es= ' + this.otTrabajadorparaActualizar)
                          console.log('lo que tiene es= ' + this.otTrabajadorparaActualizar.TotalTiempo)
                          console.log('eliminamos la pausa en for de pausas')
                          console.log(this.listPausas)
                          this.listPausas.splice(i, 1);
                          console.log('despues de eliminar la pausa')
                          console.log(this.listPausas)
                        },
                        err => { console.error(err) }, () => {//
                        }
                      )
                    }
                  }
                  //hasta aqui es el for de pausas
                  console.warn('al salir del for de pausas')
                  console.log('tiempo total ot por dia= ' + this.tiempoTotalOtpordia)
                  console.log('tiempo total ot= ' + this.tiempoTotalOt)
                  //una vez terminado el for de pausas,actualizamos el valor del tiempo total por dia
                  objTiempo.TotalTiempo = this.tiempoTotalOtpordia
                  console.log(objTiempo)
                  console.warn('el tiempo total sin pausas= ' + objTiempo.TotalTiempo)
                  console.log('ahora insertamos el objeto en el list de tiempos')
                  this.listTiempo.push(objTiempo)
                  console.log(this.listTiempo)


                  console.log('segundo tengo que ver el tiempo')
                  console.log('elementos del list de tiempos= ' + this.listTiempo)
                  
                  for (let j = 0; j < this.listTiempo.length; j++) {
                    console.log('entre al for de tiempos')
                    console.log('id operador= ' + this.idOperador)
                    console.log('id operador en modal= ' + this.variableidoperadorencerrarjornadamodal)
                    console.log('id en list= ' + this.listTiempo[j].IdOperador)

                    console.log('antes de ver si es un metodo u otro su valor es= ' + deDondeEsLlamado)

                    console.log('es llamado desde = ' + deDondeEsLlamado)

                    if (this.listTiempo[j].IdOperador == idoperadorsegunelmetododesdeelcualesllamado) {

                      console.log('encontro un tiempo asociado a este operador')
                      console.log('id trabajo retornada= ' + JSON.stringify(res))
                      this.listTiempo[j].IdTrabajo = JSON.stringify(res)
                      console.log(this.listTiempo[j])
                      //aqui puse esto del tiempo
                      console.log('guardamos el tiempo asociado a esta ot, asi que vamos a actualizar el total de tiempo de la ot completa')
                      console.warn('total tiempo en list= ' + this.listTiempo[j].TotalTiempo + ' con j =' + j)
                      totalTiempoOtsumadostodoslosdias = this.sumadeTiempos(totalTiempoOtsumadostodoslosdias, this.listTiempo[j].TotalTiempo)
                      console.log('j= ' + j)
                      this.otTrabajadorparaActualizar.TotalTiempo = totalTiempoOtsumadostodoslosdias
                      //aqui puse esto del tiempo
                      
                      this.tiempoService.saveTiempo(this.listTiempo[j]).subscribe(
                        res => {
                        
                          console.error('el id del trabajo= ' + idotparaactualizarenfortiempos + ' y el objeto es= ' + this.otTrabajadorparaActualizar)
                          console.log(res)
                          this.listTiempo.splice(j, 1);
                          console.log('lo que tien es= ' + this.otTrabajadorparaActualizar.TotalTiempo)
                          
                          this.trabajoService.updateTotalTiempo(idotparaactualizarenfortiempos, this.otTrabajadorparaActualizar).subscribe(
                            res => {
                              
                              console.log('actualizado nuevo total tiempo de trabajo!')
                              console.log(this.otTrabajadorparaActualizar)
                              //ahora vamos a eliminar la ot del list 
                              console.log('ahora vamos a eliminar la ot del list')
                              //this.listOtIngresadas.splice(index, 1)
                              //esta en caso que no se haya eliminado , pero si se elimina, solo eliminara el siguiente registro, asi que no lo eliminamos aqui

                            
                              console.log(this.listTiempo)
                              console.log(this.listPausas)
                              this.mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada()
                              this.datoenlocalstorage()
                            },
                            err => { console.error(err) }, () => {//
                            }
                          )
                        },
                        err => console.error(err)
                      );

                    }

                  }

                },
                err => { console.error(err) }, () => {//
                }
              )
            },
            err => { console.error(err) }, () => {//
            }
          )
        }
      },
      err => { console.error(err) }, () => {//
      }
    );
    console.log('salimos de  verificar codigo')

  }

  //metodo para cerrar pausas activas al momento de cerrar su jornada o cerrar la ot, para ello resivo el id del operador, luego lo busco en la lista de pausas, si su hora de fin es null, entonces quiere decir que tiene una pausa y esta activa, si no lo encuentra en el array quiere decir que no tiene una pausa , y si lo encuentra y si tiene una hora fin, quiere decir que la pausa si es de ese operador, pero que ya se termino, por lo que debo verificar que la hora de cierre es null o undefined
  cerrarPausadesdemodalcerrarjornada(id: string | number) {

    for (let index = 0; index < this.listPausas.length; index++) {
      if (this.listPausas[index].IdOperador == id && this.listPausas[index].HoraFin == undefined) {
        //tiene una pausa activa
        console.log('tiene una pausa activa')
        this.listPausas[index].HoraFin = this.getHora();
        this.listPausas[index].HoraFinDate = new Date();
        var time = this.listPausas[index].HoraFinDate.getTime() - this.listPausas[index].HoraInicioDate.getTime()
        this.listPausas[index].TotalTiempo = this.msToTime(time)
        console.warn('nueva pausa terminada ')
        console.warn(this.listPausas[index])
      }
    }

    console.log('salimos del for de pausas')
  }


  //metodo para cerrar jornada de una ot en modal cerrar jornada
  cerrarjornadadesdemodaljornada() {
    var t0 = performance.now();

    console.log('button cerrar jornada')
    console.log('id operador en modal cerrar jornada= ' + this.variableidoperadorencerrarjornadamodal)
    for (let index = 0; index < this.listOtIngresadas.length; index++) {
      if (this.listOtIngresadas[index].IdOperador == this.variableidoperadorencerrarjornadamodal) {

        this.cerrarPausadesdemodalcerrarjornada(this.listOtIngresadas[index].IdOperador);

        let tiempoEnMilisegundos: any;
        let horaIniciodate = new Date(this.listOtIngresadas[index].HoraInicioDelDiaDate);
        let horaTerminodate = new Date()

        tiempoEnMilisegundos = horaTerminodate.getTime() - horaIniciodate.getTime()


        //total tiempo ot del dia con pausas
        let x = this.msToTime(tiempoEnMilisegundos)
        this.listOtIngresadas[index].HoraFinDelDiaDate = new Date();
        this.listOtIngresadas[index].HoraFinDelDia = this.getHora();
        //total tiempo del dia  con pausas
        this.listOtIngresadas[index].TotalTiempoDelDia = x
        console.log('la ot antes de entrar al for y restar las pausas')
        console.log('su hora de inicio del dia= ' + this.listOtIngresadas[index].HoraInicioDelDiaDate)
        console.log('su hora de fin del dia= ' + this.listOtIngresadas[index].HoraFinDelDia)
        console.log('el total del tiempo del dia= ' + x)
        console.log('su total por dia es= ' + this.listOtIngresadas[index].TotalTiempoDelDia)
        console.log(this.listOtIngresadas[index])
        console.log('su total por dia despues de mostrar el objeto y antes de entrar al for es= ' + this.listOtIngresadas[index].TotalTiempoDelDia)


        //aqui tengo que hacer un for que reste los tiempos de las pausas al total del dia, sin ingresar las pausas al sistema, solo restando las pausas
        for (let i = 0; i < this.listPausas.length; i++) {
          if (this.listPausas[i].IdOperador == this.variableidoperadorencerrarjornadamodal) {
            //es una pausa asociada a este operador
            //console.log('tiempo ot del dia= ' + this.listOtIngresadas[index].TotalTiempoDelDia)
            var totalhoraotarraypordia = this.splitTime(this.listOtIngresadas[index].TotalTiempoDelDia)


            var TotalhoraOtDatepordia = new Date()
            TotalhoraOtDatepordia.setHours(parseInt(totalhoraotarraypordia[0]))
            TotalhoraOtDatepordia.setMinutes(parseInt(totalhoraotarraypordia[1]))
            TotalhoraOtDatepordia.setSeconds(parseInt(totalhoraotarraypordia[2]))
            console.log('tiempo total ot por dia en formato date= ' + TotalhoraOtDatepordia)
            console.warn('el tiempo total de la ot por dia es= ' + this.listOtIngresadas[index].TotalTiempoDelDia)
            //ya tengo el tiempo total por dia


            var totalhorapausaarray = this.splitTime(this.listPausas[i].TotalTiempo)
            var Totalhorapausadate = new Date()
            Totalhorapausadate.setHours(parseInt(totalhorapausaarray[0]))
            Totalhorapausadate.setMinutes(parseInt(totalhorapausaarray[1]))
            Totalhorapausadate.setSeconds(parseInt(totalhorapausaarray[2]))

            console.log('tiempo total pausa en formato date= ' + Totalhorapausadate)

            var fechaot = TotalhoraOtDatepordia.getDate() + '/' + TotalhoraOtDatepordia.getMonth() + '/' + TotalhoraOtDatepordia.getFullYear()
            var fechapausa = Totalhorapausadate.getDate() + '/' + Totalhorapausadate.getMonth() + '/' + Totalhorapausadate.getFullYear()
            console.log(TotalhoraOtDatepordia)
            console.log(Totalhorapausadate)

            if (fechaot == fechapausa) {
              console.log('el dia de trabajo de la ot y el dia de la pausa son iguales, por lo que afecta al tiempo del total de la ot por dia')
              console.warn('las fechas son iguales, como lo son tengo que restar las horas a la hora por dia')
              console.log(fechaot)
              console.log(fechapausa)
              console.log('hora por dia= ' + TotalhoraOtDatepordia.getTime())
              console.log('hora de pausa a restar= ' + Totalhorapausadate.getTime())
              var timepordia = TotalhoraOtDatepordia.getTime() - Totalhorapausadate.getTime();
              var nuevoTotalhoraotpordia = this.msToTime(timepordia)
              console.log('tiempo ot sin pausa por dia= ' + nuevoTotalhoraotpordia)
              this.listOtIngresadas[index].TotalTiempoDelDia = nuevoTotalhoraotpordia
            }
          }
        }





        //los tiempos de las pausas de esta ot y de la misma jornada fueron restadas, asi que ahora podemos asgnar los tiempos al obj tiempo


        //let tiempo:Tiempo
        let objTiempo = new Tiempo()
        objTiempo.Fecha = this.listOtIngresadas[index].FechaDelDia
        objTiempo.HoraInicio = this.listOtIngresadas[index].HoraInicioDelDia
        objTiempo.HoraFin = this.listOtIngresadas[index].HoraFinDelDia
        objTiempo.IdOperador = this.listOtIngresadas[index].IdOperador
        //aqui al objeto tiempo le asignamos el total tiempo del dia con pausas
        objTiempo.TotalTiempo = this.listOtIngresadas[index].TotalTiempoDelDia
        console.log(objTiempo)
        this.listTiempo.push(objTiempo)
        console.log(this.listTiempo)
        this.alMenosUnaOtCerradaSinCerrarJornada = true


        this.listOtIngresadas[index].Activa = false
        console.log(this.listOtIngresadas[index])
        
        console.log('nombre= ' + this.listOtIngresadas[index].Nombre)

        console.log('Operador: ' + this.listOtIngresadas[index].Nombre)
        console.log('titulo= ' + this.Titulo)
        this.datoenlocalstorage()//como tenemos los datos, los subimos al sistema los 3 list
        //ya tenemos nuestro obj tiempo en nuestra lista de tiempos

        //para ver si el operador esta logueado, en ese caso la pantalla cambia de inmediato al estado de cerrado, si no esta loguado, quiere decir que otro operador esta logueado, y su informacion no debe cambiar
        if ('Operador: ' + this.listOtIngresadas[index].Nombre == this.Titulo) {
          console.log('el operador esta logueado')

          this.btnIniciar = true
          this.btnPausa = true
          this.btnCerrar = true
          //this.btnCerrarJornadaLaboral=true
          this.mensajeButtonIniciarOt = 'Ot cerrada'
          this.mensajeButtonPausa = 'Pausar Ot'
          this.Titulo = 'Operador: ' + this.listOtIngresadas[index].Nombre
          //this.cerrarjornada=true 
        }


       this.mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada()

        this.datoenlocalstorage();
        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

        return
      }
    }

  }

//metodo que verifica si existe una ot abierta, de existir, no se puede cerrar la jornada laboral, si no existe, se puede cerrar la jornada laboral, si existe ademas, oculta el button (ya sea de cerrar ot o cerrra jornada), cambia el titulo del modal y la descripcion del mismo, para que quede tal cual como al iniciar el modal
mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada(){
console.warn('entre en mostrarmensajecerrarjornadaoreiniciardatosmodalcerrarjornada')
  let mostrarmensajecerrarjornada: boolean = true;


  //for para ver si alguna ot tiene un true, lo que indica que una ot esta activa, asi que aun no se puede cerrar la jornada para todos
  for (let i = 0; i < this.listOtIngresadas.length; i++) {
    console.warn('ot numero ' + i)
    if (this.listOtIngresadas[i].Activa != false) {
      mostrarmensajecerrarjornada = false
      console.log('al ser un false no se puede cerrar la jornada')
    }

  }
  console.log('al salir del for mostrarmensajecerrarjornada=' + mostrarmensajecerrarjornada)
  if (mostrarmensajecerrarjornada == true) {
    this.cerrarjornada = true
    console.log('se puede cerrar')
    this.descripcionmodalcerrarjornadadescripcion = 'Puede cerrar la jornada laboral actual, recuerde que al hacerlo, no podra continuar con su trabajo hasta la siguiente jornada laboral'
    this.ocultarbotonpantallacerrarjornada = false
  } else {
    this.reiniciarmodalcerrarjornada()
  }
}


  //metodo para que el modal cerrar jornada vuelva a su estado inicial al cerrar el modal
  reiniciarmodalcerrarjornada() {
    this.ocultarbotonpantallacerrarjornada = true
    this.buttoncerrarotenmodalcerrarjornada = false;
    this.descripcionmodalcerrarjornadadescripcion = 'Todos los trabajos pendientes deben ser cerrados o indicar que continuara en su siguiente jornada laboral.Por favor, seleccione la opcion indicada para cada caso especifico.'
    this.titulomodalcerrarjornadadescripcion='Importante'
  }

  //metodo que cierra la jornada laboral del dia, reinicia la pantalla , deshabilitando los buttons e indicando de titulo que la jornada esta cerrada
  cerrarJornadaLaboralPorElDia() {
    //this.router.navigateByUrl('/index');
    this.pantallaoperadorescerrada()
    localStorage.removeItem('fecha');
    this.alMenosUnaOtCerradaSinCerrarJornada = false
    localStorage.removeItem('alMenosUnaOtCerradaSinCerrarJornada')
    localStorage.setItem('fecha', JSON.stringify(this.getFecha()))
    localStorage.setItem('alMenosUnaOtCerradaSinCerrarJornada', JSON.stringify(this.alMenosUnaOtCerradaSinCerrarJornada))
    //con esto, la pantalla queda inutilizada al momento de cerrar jornada, puesto que no puede interactuar con ningun boton, si un operador esta logueado, la pantalla indica que se cerro la jornad y si se tratan de loguear, solo se muestra un mensaje en el modal que dice que la jornada fue cerrada, inutilizando la pantalla por completo
    //ahora debo hacer que esta desicion permanezca, por lo que en el localstorage debbo guardar un dato, si este dato (puede ser la fecha en un string, un 0 o nada )
    //teniendo uno de estos datos verificar al cargar la pagina, si el dato existe o es igual a la fecha actual o es igual a 0 quiere decir que la jornada fue cerrada, por lo que llamara a un metodo que ponga la pantalla inutilizada, el metodo es el de cerrar jornada por el dia, para tener la fecha en el titulo deberia guardar la fecha de cierre, si las fechas son iguales es porque se cerro la jornada, asi que se pone como titulo, si las fechas son distintas, quiere decir que es otro dia, por lo que pueden trabajar



    //debo guardar los datos de la fecha que se cerro la jornada en el localstorage, luego, al ingresae a la pagina vera si las fechas son iguales, si lo son quiere decir que ingreso el mismo dia, por lo que no le permitira hacer nada , aqui tenemos 2 opciones, la primera es que al momento de cerrar la jornada redireccione al operador al index, si trata de volver a entrar, lo redirecciona a otra pantalla la cual dice la jornada termino, dandole solo la opcion de volver

    // una tercera opcion es una mezcla de ambas, al termianr la jornada te redirecciona al index, al tratar de entrar te muestra la pantalla pero no puedes interactuar con ella

  }
  //metodo que cierra la pantalla, es decir, los botones quedan deshabilitados, el titulo es jornada laboral cerrada y no se puede loguar el operador, porque indica que la jornada fue cerrada
  pantallaoperadorescerrada() {
    this.btnIniciar = true
    this.btnPausa = true
    this.btnCerrar = true
    this.btnCerrarJornadaLaboral = true
    this.mensajeButtonIniciarOt = 'Iniciar Ot'
    this.mensajeButtonPausa = 'Pausar Ot'
    this.Titulo = 'Jornada cerrada:' + this.getFecha()
    this.cerrarjornada = true
    this.mostrarmodaljornadacerradaalingresarpassword = true
  }


  pantallaindividualoperadorcerrada() {

  }


  sumadeTiempos(tiempo1: string, tiempo2: string) {
    var time1 = this.splitTime(tiempo1)
    var time2 = this.splitTime(tiempo2)

    var segundos, minutos, horas;
    var s, m, h;
    segundos = parseInt(time1[2]) + parseInt(time2[2])
    minutos = parseInt(time1[1]) + parseInt(time2[1])
    horas = parseInt(time1[0]) + parseInt(time2[0])

    if (segundos >= 60) {
      segundos = segundos - 60
      minutos = minutos + 1
      if (segundos < 10) {
        s = '0' + segundos
      } else {
        s = '' + segundos
      }

    } else {
      if (segundos < 10) {
        s = '0' + segundos
      } else {
        s = '' + segundos
      }

    }


    if (minutos >= 60) {
      minutos = minutos - 60
      horas = horas + 1
      if (minutos < 10) {
        m = '0' + minutos
      } else {
        m = '' + minutos
      }

    } else {
      if (minutos < 10) {
        m = '0' + minutos
      } else {
        m = '' + minutos
      }

    }

    if (horas < 10) {
      h = '0' + horas
    } else {
      h = '' + horas
    }

    console.log('suma de horas entre ' + tiempo1 + ' y ' + tiempo2)
    console.log(h + ':' + m + ':' + s)

    return h + ':' + m + ':' + s
  }

}