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
