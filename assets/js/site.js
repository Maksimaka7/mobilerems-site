  // Header shadow on scroll
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Mobile drawer
  var drawer = document.getElementById('drawer');
  document.getElementById('burger').addEventListener('click', function(){ drawer.classList.add('open'); });
  document.getElementById('drawer-close').addEventListener('click', function(){ drawer.classList.remove('open'); });
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ drawer.classList.remove('open'); }); });

  // Netlify Forms — AJAX submit, inline success
  function encode(data){ return Object.keys(data).map(function(k){ return encodeURIComponent(k)+'='+encodeURIComponent(data[k]); }).join('&'); }
  document.querySelectorAll('form[data-netlify]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      var btn = form.querySelector('.form-submit');
      var label = btn ? btn.textContent : '';
      if(btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
      var data = {}; new FormData(form).forEach(function(v,k){ data[k]=v; });
      fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:encode(data) })
      .then(function(res){ if(!res.ok) throw new Error('bad'); 
        var card = form.closest('.form-card');
        var partner = form.getAttribute('name') === 'partner-inquiry';
        card.innerHTML =
          '<div class="form-success">'+
            '<div class="mark"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'+
            '<div class="eyebrow" style="justify-content:center;">'+(partner?'Request received':'You\u2019re on the list')+'</div>'+
            '<h2 style="font-size:32px;margin:16px 0 12px;">'+(partner?'We\u2019ll be in touch.':'We\u2019ll let you know.')+'</h2>'+
            '<p style="color:var(--text);max-width:380px;margin:0 auto;">'+(partner?'Thank you. We respond to partnership inquiries within one business day.':'Thank you. You\u2019ll hear from us the moment public booking opens.')+'</p>'+
          '</div>';
      })
      .catch(function(){
        if(btn){ btn.disabled=false; btn.textContent=label; }
        var err = form.querySelector('.form-error');
        if(!err){ err=document.createElement('p'); err.className='form-error'; form.insertBefore(err, form.firstChild); }
        err.textContent='Something went wrong. Please try again or email scan@mobilerems.com.';
      });
    });
  });
