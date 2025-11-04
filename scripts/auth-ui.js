(function(){
  function applyAuthUI(){
    var nav = document.getElementById('mynav');
    if(!nav) return;
    var token = localStorage.getItem('token');
    var hasLogin = !!nav.querySelector('a[href$="Login.html"]');
    var existingProfile = nav.querySelector('a[href$="profile.html"]');
    var existingLogout = nav.querySelector('a[data-logout]');

    if(token){
      if(hasLogin){
        // hide login
        var loginEl = nav.querySelector('a[href$="Login.html"]');
        if(loginEl) loginEl.style.display = 'none';
      }
      // add profile icon/link if missing
      if(!existingProfile){
        var profile = document.createElement('a');
        profile.className = 'nav-item nav-link';
        profile.href = '../html/profile.html';
        profile.innerHTML = '<span class="material-icons" style="vertical-align:middle;margin-right:4px">account_circle</span>Profile';
        nav.appendChild(profile);
      }
      // add logout if missing
      if(!existingLogout){
        var logout = document.createElement('a');
        logout.className = 'nav-item nav-link';
        logout.href = '#';
        logout.setAttribute('data-logout','true');
        logout.textContent = 'Logout';
        logout.addEventListener('click', function(e){
          e.preventDefault();
          localStorage.removeItem('token');
          // show login again if present
          var loginEl = nav.querySelector('a[href$="Login.html"]');
          if(loginEl) loginEl.style.display = '';
          // remove profile/logout
          var p = nav.querySelector('a[href$="profile.html"]'); if(p) p.remove();
          var l = nav.querySelector('a[data-logout]'); if(l) l.remove();
        });
        nav.appendChild(logout);
      }
    } else {
      // no token: ensure login visible; remove profile/logout
      var loginEl = nav.querySelector('a[href$="Login.html"]');
      if(loginEl) loginEl.style.display = '';
      var p = nav.querySelector('a[href$="profile.html"]'); if(p) p.remove();
      var l = nav.querySelector('a[data-logout]'); if(l) l.remove();
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyAuthUI);
  } else { applyAuthUI(); }
})();
