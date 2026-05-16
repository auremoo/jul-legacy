// ─── Navigation ───────────────────────────────────────────────────────────────

const nav        = document.getElementById('site-nav');
const hamburger  = document.getElementById('hamburger');
const navOverlay = document.getElementById('nav-overlay');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navOverlay?.classList.remove('open');
  navOverlay?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  navOverlay?.classList.toggle('open', isOpen);
  navOverlay?.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navOverlay?.querySelectorAll('.nav__overlay-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navOverlay?.classList.contains('open')) closeMenu();
});

// ─── Compteurs animés ────────────────────────────────────────────────────────

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;

  const duration = 1800;
  const start = performance.now();
  const startVal = 0;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutQuart(progress) * target);

    // Format selon la magnitude
    if (target >= 1000000) {
      el.textContent = (value / 1000000).toFixed(1) + 'M+';
    } else if (target >= 1000) {
      el.textContent = value.toLocaleString('fr-FR');
    } else {
      el.textContent = value;
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Observer pour déclencher les compteurs quand ils entrent dans le viewport
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ─── Filtres discographie ─────────────────────────────────────────────────────

// Filtres principaux (albums / compilations / singles / upcoming)
const mainFilterBtns = document.querySelectorAll('#main-filters .filter-btn');
const sections = {
  albums: document.getElementById('section-albums'),
  gratuits: document.getElementById('section-gratuits'),
  compilations: document.getElementById('section-compilations'),
  singles: document.getElementById('section-singles'),
  upcoming: document.getElementById('section-upcoming'),
};

mainFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    mainFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    Object.entries(sections).forEach(([key, el]) => {
      if (el) el.style.display = key === filter ? 'block' : 'none';
    });
  });
});

// Filtres certification (dans albums)
const certFilterBtns = document.querySelectorAll('#cert-filters .filter-btn');
certFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cert = btn.dataset.cert;
    document.querySelectorAll('#albums-grid .album-card-wrapper').forEach(card => {
      if (cert === 'all' || card.dataset.cert === cert) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Filtres singles (par type)
const singlesTypeBtns = document.querySelectorAll('#singles-type-filters .filter-btn');
singlesTypeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    singlesTypeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.singles;
    document.querySelectorAll('#singles-grid .single-card-wrapper').forEach(card => {
      if (filter === 'all' || card.dataset.singlesType === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Filtres featurings (collaborations)
const featFilterBtns = document.querySelectorAll('#feat-filters .filter-btn');
featFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    featFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.feat;
    document.querySelectorAll('#feats-grid .card-feat').forEach(card => {
      if (filter === 'all' || card.dataset.feat === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Filtres galerie
const galleryFilterBtns = document.querySelectorAll('[data-gallery]');
galleryFilterBtns.forEach(btn => {
  if (btn.tagName !== 'BUTTON') return;
  btn.addEventListener('click', () => {
    galleryFilterBtns.forEach(b => { if (b.tagName === 'BUTTON') b.classList.remove('active'); });
    btn.classList.add('active');

    const filter = btn.dataset.gallery;
    document.querySelectorAll('#gallery-grid .gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.gallery === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── Lightbox ────────────────────────────────────────────────────────────────

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxImg = document.getElementById('lightbox-img');

lightboxClose?.addEventListener('click', () => lightbox.classList.remove('open'));

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox?.classList.remove('open');
});

// Délégation pour les items de galerie avec src
document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.dataset.src;
    const alt = item.querySelector('span:last-child')?.textContent || '';
    if (src && lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('open');
    }
  });
});

// ─── Quiz ─────────────────────────────────────────────────────────────────────

if (typeof QUIZ_DATA !== 'undefined') {
  let current = 0;
  let score = 0;
  let answered = false;

  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const explanationEl = document.getElementById('quiz-explanation');
  const nextBtn = document.getElementById('quiz-next');
  const counterEl = document.getElementById('quiz-counter');
  const progressEl = document.getElementById('quiz-progress');
  const resultEl = document.getElementById('quiz-result');

  function renderQuestion(idx) {
    if (!questionEl || !optionsEl) return;
    answered = false;
    const q = QUIZ_DATA[idx];

    questionEl.textContent = q.question;
    counterEl.textContent = `Question ${idx + 1} / ${QUIZ_DATA.length}`;

    // Progress
    const spans = progressEl.querySelectorAll('span');
    spans.forEach((s, i) => {
      s.className = i < idx ? 'done' : i === idx ? 'current' : '';
    });

    optionsEl.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz__option';
      btn.textContent = opt;
      btn.dataset.index = i;
      btn.addEventListener('click', () => selectAnswer(btn, i, q));
      optionsEl.appendChild(btn);
    });

    explanationEl.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  function selectAnswer(btn, idx, q) {
    if (answered) return;
    answered = true;

    const allBtns = optionsEl.querySelectorAll('.quiz__option');
    allBtns.forEach(b => b.disabled = true);

    if (idx === q.answer) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      allBtns[q.answer].classList.add('correct');
    }

    explanationEl.textContent = q.explanation;
    explanationEl.style.display = 'block';
    nextBtn.style.display = 'inline-flex';
  }

  nextBtn?.addEventListener('click', () => {
    current++;
    if (current >= QUIZ_DATA.length) {
      showResult();
    } else {
      renderQuestion(current);
    }
  });

  function showResult() {
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    explanationEl.style.display = 'none';
    nextBtn.style.display = 'none';
    resultEl.style.display = 'block';

    const pct = score / QUIZ_DATA.length;
    const emoji = pct >= 0.8 ? '🔥' : pct >= 0.5 ? '😎' : '🎵';
    const title = pct >= 0.8 ? 'Vrai fan de Jul !' : pct >= 0.5 ? 'Bon niveau !' : 'À réviser !';

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-score').textContent = `${score} / ${QUIZ_DATA.length} bonnes réponses`;
  }

  window.restartQuiz = function() {
    current = 0;
    score = 0;
    resultEl.style.display = 'none';
    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex';
    renderQuestion(0);
  };

  renderQuestion(0);
}

// ─── Animation fade-up au scroll ──────────────────────────────────────────────

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.6s ease ${entry.target.dataset.delay ? entry.target.dataset.delay * 0.1 + 's' : '0s'} forwards`;
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.anim-fade-up').forEach(el => {
  el.style.opacity = '0';
  fadeObserver.observe(el);
});

// ─── Stats grid responsive ────────────────────────────────────────────────────

function adjustStatsGrid() {
  const grid = document.querySelector('.stats-grid');
  if (!grid) return;
  const cols = window.innerWidth < 480 ? 2 : window.innerWidth < 768 ? 2 : 3;
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

adjustStatsGrid();
window.addEventListener('resize', adjustStatsGrid, { passive: true });
