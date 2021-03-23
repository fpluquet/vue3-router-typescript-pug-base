export function validateRut(completeRut: string): boolean {
    if (!completeRut || completeRut === undefined) {
      return false;
    }

    completeRut = completeRut.replace(/\./g, "");
    const tmp = completeRut.split('-');
    const rut = tmp[0];
    if (tmp.length !== 2) {
      return false;
    }
    if (rut.length > 9) {
      return false;
    }
    let dv = tmp[1];
    if (dv.toUpperCase() === 'K') {
      dv = dv.toUpperCase();
    }

    if (isNaN(rut as any) && isNaN(parseFloat(rut))) {
      return false;
    }

    const reverseArrayRutInicio = rut.split("").reverse();

    let i = 2;
    let sum = 0;
    reverseArrayRutInicio.forEach(element => {
      if (i === 8) {
        i = 2;
      }
      let n: number = +element;
      sum += n * i;
      ++i;
    });

    let dvr: any = 11 - (sum % 11);

    //TODO: verify logic here, with the commented code checking rut ending in k always retrieve error (commented code is based on pagofacil)
    /* if (dvr === 11) {
      dvr = 'K';
    }
    if (dvr === 10) {
      dvr = 0;
    } */
    if (dvr === 10) {
      dvr = 'K';
    }

    return dvr == dv;
  }