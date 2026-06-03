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

  // YouTube facade — swap the poster for the real player on click
  document.querySelectorAll('.video-facade').forEach(function (f) {
    f.addEventListener('click', function () {
      var id = f.getAttribute('data-yt');
      if (!id) return;
      var ifr = document.createElement('iframe');
      ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
      ifr.title = f.getAttribute('aria-label') || 'MobileREMS video';
      ifr.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      ifr.setAttribute('allowfullscreen', '');
      ifr.className = 'vf-iframe';
      f.replaceWith(ifr);
    });
  });

  // Hide the form loading skeleton once the Ivorey iframe loads (6s fallback)
  (function(){
    var card = document.querySelector('.form-card.is-loading');
    if(!card) return;
    var ifr = card.querySelector('iframe.ghl-embed');
    if(!ifr) return;
    var done = function(){ card.classList.remove('is-loading'); };
    ifr.addEventListener('load', function(){ setTimeout(done, 400); });
    setTimeout(done, 6000); // safety net: drop the skeleton after 6s regardless
  })();
