// Data Version Switcher
// Each version in the navbar dropdown is a small PATCH form (rendered by
// button_to), so switching works without Turbo. This only adds a loading state.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form.data-version-switch').forEach(form => {
    form.addEventListener('submit', function() {
      const button = form.querySelector('button');
      if (button && button.classList.contains('active')) return;

      const badge = document.querySelector('#dataVersionDropdown .badge');
      if (badge) {
        badge.innerHTML = '<i class="bi bi-hourglass-split"></i> Switching...';
        badge.classList.remove('bg-primary');
        badge.classList.add('bg-warning');
      }
    });
  });
});
