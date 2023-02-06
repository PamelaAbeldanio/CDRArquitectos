// Validaciones:

// Obtenemos todos los form que necesitamos validar
const forms = document.querySelectorAll('.needs-validation')

// Iteramos sobre ellos y evitamos el comportamiento por default y la propagación del evento
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
});
