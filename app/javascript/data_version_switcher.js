// Data Version Switcher
document.addEventListener('DOMContentLoaded', function() {
  const versionLinks = document.querySelectorAll('[data-turbo-method="patch"]');

  versionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const versionName = this.textContent.trim();
      const isActive = this.classList.contains('active');

      if (!isActive) {
        // Show loading state
        const badge = document.querySelector('#dataVersionDropdown .badge');
        if (badge) {
          badge.innerHTML = '<i class="bi bi-hourglass-split"></i> Switching...';
          badge.classList.remove('bg-primary');
          badge.classList.add('bg-warning');
        }

        // Let the form submission proceed
        return true;
      }
    });
  });
});
