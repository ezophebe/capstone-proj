const signinForm = document.getElementById('signinForm');

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;

  const response = await fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  alert(data.message || 'Error logging in');
  if (response.ok) {
    window.location.href = data.redirect;
  }
});
