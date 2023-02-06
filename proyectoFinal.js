const formulario = document.getElementById("form");

const monto = document.getElementById("amount")
monto.addEventListener('change', () => {
})
const cuotas = document.getElementById("countm2");
const montoFinal = document.getElementById("finalAmount");
const cantidad = document.getElementById("count");
const intereses = document.getElementById("interests");
const totalADevolver = document.getElementById("totalAmount");


//Porcentaje destinado a costo de disenio
const tasa = 0.05; // 5%

//Fetch de rutas relativas
const tipos = document.getElementById('tiposDeConstruccion')

 fetch('/tipos.json')
    .then((resp) => resp.json())
    .then(data => {
      data.forEach( tipo => {
        const li = document.createElement('li')
        li.innerHTML = `
        <img src='/public/images/${tipo.img}' class='api'>
        <h5>${tipo.nombre}</h5>
        `
        tipos.appendChild(li)
        
      });
    })



//Calcula costo disenio en base a metros cuadrados y construccion elegida
const montoDisenio = () => {
  const disenio = ( monto.value * cuotas.value) * tasa  
  obtenerTotalDisenio(disenio)
};


// Calculamos totales
const obtenerTotalDisenio = (disenio) => {
  const total = Math.ceil(disenio) + (monto.value * cuotas.value)

  const cotizacion = construirCotizacion(monto.value, cuotas.value, disenio, total)

  completarCotizacion(cotizacion)

  guardarCotizacionStorage(cotizacion)
};


// Enviamos datos a la vista del formulario
const construirCotizacion = (montoValue, cuotasValue, interesesValue, totalValue) => {
  return {
    monto: montoValue,
    cuotas: cuotasValue,
    intereses: interesesValue,
    total: totalValue
  }
};
const completarCotizacion = (cotizacion) => {
  montoFinal.textContent = `$${cotizacion.monto}`
  cantidad.textContent = `${cotizacion.cuotas}`
  intereses.textContent = `$${cotizacion.intereses}`
  totalADevolver.textContent = `$${cotizacion.total}`
};


// Local Storage
const guardarCotizacionStorage = (cotizacion) => {
  localStorage.setItem('cotizacion', JSON.stringify(cotizacion))
};

const obtenerCotizacionStorage = () => {
  const cotizacionStorage = JSON.parse(localStorage.getItem('cotizacion'))
  return cotizacionStorage
};

const obtenerCotizacion = () => {
  if (localStorage.getItem('cotizacion')) {
    const cotizacionStorage = obtenerCotizacionStorage()
    completarCotizacion(cotizacionStorage)
  }
};

//Uso de libreria toastify
const btnToast = document.getElementById('btn-toast');

 btnToast.addEventListener('click', () => {
    Toastify({
         text: 'Se enviaron los datos',
         duration: 5000,
         position: 'center',
         style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
         
     }).showToast()
 })


document.addEventListener('DOMContentLoaded', obtenerCotizacion)

formulario.addEventListener("submit", (e) => {
  e.preventDefault()

  montoDisenio()
});


