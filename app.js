/**
 * app.js — entry point, initialisation
 */

document.addEventListener('DOMContentLoaded', () => {
  if (tryResumeSession()) {
    launchApp();
  }
  // Allow Enter key on login form password field
  document.getElementById('loginPass').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.querySelector('.login-form').dispatchEvent(new Event('submit', {cancelable:true}));
  });
});
