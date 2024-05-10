const userLogin = document.querySelector('.user')
const loginButton = document.getElementById('buttonSubmit')

const loginOnSubmit = async (event) => {
  event.preventDefault()

  const email = userLogin.email.value
  const password = userLogin.password.value

  try {
    const res = await fetch('http://localhost:4100/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (res.ok) {
      const { token } = await res.json()

      setTimeout(() => {
        window.location.href = 'index.html'
      }, 500)

      localStorage.setItem('token', token)

    } else {
      alert('Los campos son incorrectos')
    }
    
  } catch (error) {
    console.log(error);
  }

}

loginButton.addEventListener('click', loginOnSubmit)

