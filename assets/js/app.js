const form = document.querySelector('form')
const button = document.querySelector('.button-submit')
const phoneInput = document.querySelector('.campo-telefone input')

const disableButton = () => {
  button.setAttribute('disabled', true)

  setTimeout(() => {
    button.removeAttribute('disabled')
  }, 60000)
}
const submitSuccessMessage = () => {
  Swal.fire({
    icon: "success",
    title: "Tudo ok!",
    text: "Dados enviados com sucesso!"
  })
}
const submitErrorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops... Algo deu errado!",
    text: "Verifique seus dados e tente novamente."
  })
}
const emailJSInit = () => {
  emailjs.init('user_IFgyDb7wGDHBg6AFzO23k')
}
const sendFormToEmail = () => {
  emailjs
    .sendForm('service_hm6yc5r', 'template_bfz83kz', form)
    .then(submitSuccessMessage, submitErrorMessage)
}
const createPhoneMask = () => {
  let phone = phoneInput.value.replace(/\D/g, '')

  const phoneFieldLength = phone.length
  const fieldLengthBiggerThan10 = phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
  const fieldLengthBiggerThan5 = phone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3')
  const fieldLengthBiggerThan2 = phone.replace(/^(\d\d)(\d{0,5})/, '($1) $2')

  phone = phone.replace(/^0/, '')

  if (phoneFieldLength > 10) {
    phone = fieldLengthBiggerThan10
  } else if (phoneFieldLength > 5) {
    phone = fieldLengthBiggerThan5
  } else if (phoneFieldLength > 2) {
    phone = fieldLengthBiggerThan2
  }

  phoneInput.value = phone
}
const validateForm = event => {
  event.preventDefault()

  disableButton()
  sendFormToEmail()

  event.target.reset()
}

emailJSInit()

phoneInput.addEventListener('input', createPhoneMask)
form.addEventListener('submit', validateForm)