(function(){
  var form = document.getElementById('mood-form');
  var scoreEl = document.getElementById('mood-score');
  var noteEl = document.getElementById('mood-note');
  var list = document.getElementById('mood-list');
  var errorEl = document.getElementById('mood-error');

  function showError(msg){ errorEl.textContent = msg; errorEl.style.display='block'; }
  function clearError(){ errorEl.textContent=''; errorEl.style.display='none'; }

  async function load(){
    clearError(); list.innerHTML='';
    try{
      var data = await window.api.request('/api/moods', { auth: true });
      (data.moods||[]).forEach(function(m){
        var li = document.createElement('li');
        li.className='list-group-item d-flex justify-content-between align-items-center';
        var left = document.createElement('span');
        left.textContent = new Date(m.createdAt).toLocaleString() + ' — Score ' + m.score + (m.note?(' — '+m.note):'');
        var del = document.createElement('button'); del.className='btn btn-sm btn-outline-danger'; del.textContent='Delete';
        del.addEventListener('click', async function(){
          try{ await window.api.request('/api/moods/'+m._id, { method:'DELETE', auth:true }); load(); }
          catch(err){ showError(err.message||'Delete failed'); }
        });
        li.appendChild(left); li.appendChild(del); list.appendChild(li);
      });
    }catch(err){ showError(err.message||'Failed to load moods. Please login first.'); }
  }

  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault(); clearError();
      var score = Number(scoreEl.value);
      var note = noteEl.value.trim();
      try{
        await window.api.request('/api/moods', { method:'POST', body:{ score: score, note: note }, auth:true });
        noteEl.value=''; await load();
      }catch(err){ showError(err.message||'Failed to save mood'); }
    });
  }

  // initial
  load();
})();
