export class OtTrabajador {
     IdOt?: string | number;
     IdOperador?: string;
     Nombre?: string;
     Codigo?: string;
     Fecha?: string;
     HoraInicio?: string;
     HoraFin?: string;
     TotalTiempo?: string;
     HoraInicioDate?: Date;
     HoraFinDate?: Date;
     //datos para separar las horas trabajadas por cada dia, necesitamos la fecha hora inicio, hora termino y total de horas, ademas de un nuevo dato, fecha termino
     FechaTermino?: string;
     FechaDelDia?: string;
     HoraInicioDelDia?: string;
     HoraFinDelDia?: string;
     HoraInicioDelDiaDate?: Date;
     HoraFinDelDiaDate?: Date;
     TotalTiempoDelDia?: string;
     Activa?: boolean;

     //debo agregar una variable para saber si es la pimera vez que el usuario se logua en el dia, solo en ese momento debo ver si las fechas son distintas, si lo son, es porque es una nueva jornada y debo resetear la hora inicio del dia y la fecha del dia , una vez que esto pase,(que se loguee por primera vez) este dato cambiar, para que no considere este echo hasta la siguiente jornada laboral
     UsuarioPrimerLogueoDelDia?: boolean;


     //esta variable servira para saber si el usuario se logueo al menos una vez 

     UsuarioLogueadoAlMenosUnaVez?: boolean;

}