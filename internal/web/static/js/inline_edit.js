// Click-to-edit for one field, such as an employee's name or a team's
// pretty name. The script tag that loads this file says what to edit:
//   data-selector  the spans that show the value
//   data-url       the resource URL, to which the span's id is appended
//   data-id        the span's dataset key holding the record id
//   data-model     the JSON object name ("employee" or "team")
//   data-field     the field to save
//   data-width     the width of the input
//   data-move-button  set on team pages, to keep the Move button's name current
(function () {
  const cfg = document.currentScript.dataset;

  function showValue(span, value) {
    if (value) {
      span.textContent = value;
    } else {
      span.innerHTML = '<span class="text-muted small">—</span>';
    }
  }

  function updateMoveButton(span, value) {
    const row = span.closest('tr');
    const button = (row || document).querySelector('button[data-bs-target="#moveTeamModal"]');
    if (!button) return;
    button.dataset.teamName = value || button.dataset.teamFallback || '';
  }

  function startEdit(span) {
    const original = span.dataset.original;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = original;
    input.className = 'form-control form-control-sm';
    input.style.width = cfg.width;
    span.replaceWith(input);
    input.focus();
    input.select();

    let done = false;
    function save() {
      if (done) return;
      done = true;
      const value = input.value.trim();
      const body = {};
      body[cfg.model] = {};
      body[cfg.model][cfg.field] = value;
      fetch(cfg.url + span.dataset[cfg.id], {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(r => r.ok ? r.json() : Promise.reject(r))
        .then(() => {
          span.dataset.original = value;
          showValue(span, value);
          input.replaceWith(span);
          if (cfg.moveButton !== undefined) updateMoveButton(span, value);
        })
        .catch(() => {
          alert('Failed to save. Please try again.');
          input.replaceWith(span);
        });
    }

    function cancel() {
      if (done) return;
      done = true;
      input.replaceWith(span);
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); save(); }
      if (e.key === 'Escape') { cancel(); }
    });
    input.addEventListener('blur', save);
  }

  document.addEventListener('click', function (e) {
    const span = e.target.closest(cfg.selector);
    if (span) startEdit(span);
  });
})();
