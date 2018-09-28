class Paciente {
    constructor(
      sip,
      email,
      nombre,
      pApellido,
      sApellido,
      telefono,
      otroTelefono,
      direccion,
      localidad,
      cp,
      fNacimiento,
      sexo
    ) {
      this.sip = sip;
      this.email = email;
      this.nombre = nombre;
      this.pApellido = pApellido;
      this.sApellido = sApellido;
      this.telefono = telefono;
      this.otroTelefono = otroTelefono;
      this.direccion = direccion;
      this.localidad = localidad;
      this.cp = cp;
      this.fNacimiento = fNacimiento;
      this.sexo;
    }
  }

  export default Paciente