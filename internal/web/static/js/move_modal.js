// The Move Team dialog on the team list and team pages.
const modal = document.getElementById('moveTeamModal');
const nameSpan = document.getElementById('moveTeamName');
const list = document.getElementById('moveTeamList');
const searchInput = document.getElementById('moveTeamSearch');
const confirmBtn = document.getElementById('moveTeamConfirm');

let currentTeamId = null;
let selectedParentId = undefined;
let allCandidates = [];

modal.addEventListener('show.bs.modal', async (event) => {
  const trigger = event.relatedTarget;
  currentTeamId = trigger.dataset.teamId;
  nameSpan.textContent = trigger.dataset.teamName;
  selectedParentId = undefined;
  confirmBtn.disabled = true;
  searchInput.value = '';

  list.innerHTML = '<li class="list-group-item">Loading...</li>';

  try {
    const resp = await fetch(`/teams/${currentTeamId}/move_candidates.json`);
    allCandidates = await resp.json();
    renderList(allCandidates);
  } catch (e) {
    list.innerHTML = '<li class="list-group-item text-danger">Failed to load candidates.</li>';
  }
});

function renderList(candidates) {
  list.innerHTML = '';

  const rootItem = document.createElement('li');
  rootItem.className = 'list-group-item list-group-item-action';
  rootItem.style.cursor = 'pointer';
  rootItem.dataset.parentId = '';
  rootItem.innerHTML = '<em>Make Root Team</em>';
  list.appendChild(rootItem);

  candidates.forEach(c => {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.style.cursor = 'pointer';
    li.style.paddingLeft = `${(c.depth * 16) + 12}px`;
    li.dataset.parentId = c.id;
    li.textContent = c.name;
    list.appendChild(li);
  });

  list.querySelectorAll('.list-group-item-action').forEach(item => {
    item.addEventListener('click', () => {
      list.querySelectorAll('.list-group-item-action').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      selectedParentId = item.dataset.parentId;
      confirmBtn.disabled = false;
    });
  });
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allCandidates.filter(c => c.name.toLowerCase().includes(q));
  renderList(filtered);
});

confirmBtn.addEventListener('click', async () => {
  confirmBtn.disabled = true;
  confirmBtn.textContent = 'Moving...';

  const body = {};
  if (selectedParentId !== '' && selectedParentId !== undefined) {
    body.parent_id = selectedParentId;
  }

  try {
    const resp = await fetch(`/teams/${currentTeamId}/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (resp.ok) {
      window.location = data.redirect_url;
    } else {
      alert(data.error || 'Move failed.');
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Move Team';
    }
  } catch (e) {
    alert('Network error. Please try again.');
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'Move Team';
  }
});
