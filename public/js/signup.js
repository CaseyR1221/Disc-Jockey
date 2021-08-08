
  const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log('clicked');
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log('saved');
    if (name && password && email) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password, email }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('posted');
      if (response.ok) {
        document.location.replace('/api/users/profile');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('#signupBtn')
  .addEventListener('click', signupFormHandler);