/* =========================================================
   PIXELARC 공통 스크립트
   - 모든 페이지의 <header id="site-header"></header>,
     <div id="site-footer"></div> 자리에 헤더/푸터를 자동 삽입
   - 헤더/푸터 디자인을 바꾸려면 이 파일의
     HEADER_HTML / FOOTER_HTML 문자열만 수정하면
     모든 페이지에 한 번에 반영됩니다.
   ========================================================= */

// 각 html의 <body data-page="home|about|service|portfolio|contact">
const CURRENT_PAGE = document.body.getAttribute('data-page') || '';

const HEADER_HTML = `
<div class="container">
  <a href="index.html" class="logo">
    <!-- 로고 이미지 자리: images/logo.png 로 교체하세요. (권장 높이 28~32px) -->
    <img src="images/logo.png" alt="PIXELARC" class="logo-img" onerror="this.outerHTML='&lt;div class=&quot;img-placeholder logo-placeholder&quot;&gt;LOGO&lt;/div&gt;'">
  </a>
  <div class="nav-wrap">
    <nav class="gnb">
      <a href="about.html" class="${CURRENT_PAGE === 'about' ? 'active' : ''}">ABOUT</a>
      <a href="service.html" class="${CURRENT_PAGE === 'service' ? 'active' : ''}">SERVICE</a>
      <a href="portfolio.html" class="${CURRENT_PAGE === 'portfolio' ? 'active' : ''}">PORTFOLIO</a>
      <a href="contact.html" class="${CURRENT_PAGE === 'contact' ? 'active' : ''}">CONTACT</a>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>
  </div>
</div>
<div class="mobile-nav" id="mobileNav">
  <a href="about.html" class="${CURRENT_PAGE === 'about' ? 'active' : ''}">ABOUT</a>
  <a href="service.html" class="${CURRENT_PAGE === 'service' ? 'active' : ''}">SERVICE</a>
  <a href="portfolio.html" class="${CURRENT_PAGE === 'portfolio' ? 'active' : ''}">PORTFOLIO</a>
  <a href="contact.html" class="${CURRENT_PAGE === 'contact' ? 'active' : ''}">CONTACT</a>
</div>
<div class="nav-overlay" id="navOverlay"></div>
`;

const FOOTER_HTML = `
<div class="container">
  <div class="footer-top">
    <div>
      <div class="footer-logo">PIXELARC<small>CREATIVE VIDEO STUDIO</small></div>
    </div>
    <div class="footer-info">
      <div><b>E</b><span>&nbsp;pixelarc.kr@gmail.com</span></div>
      <div><b>T</b><span>&nbsp;010-5790-2107</span></div>
      <div><b>A</b><span>&nbsp;대전광역시 유성구 복용로40번길 5-20</span></div>
    </div>
    <div class="footer-info">
      <div style="text-transform:uppercase;color:var(--c-gray-500);font-weight:700;font-size:11px;margin-bottom:8px;">Business Info</div>
      <div><span>사업자등록번호&nbsp;177-49-01142</span></div>
      <div><span>대표자명&nbsp;문해인</span></div>
      
    </div>
    <div class="footer-follow">
      <div class="footer-follow-label">FOLLOW US</div>
      <div class="footer-icons">
        <!-- 실제 채널 주소로 href만 바꾸면 됩니다 -->
        <a href="https://www.instagram.com/pixelarc.video/" target="_blank" rel="noopener" aria-label="Instagram">
        <img src="images/icon-instagram.png" alt="Instagram" style="width:16px;height:16px;"></a>
        <a href="https://www.youtube.com/@픽셀아크" target="_blank" rel="noopener" aria-label="YouTube">
        <img src="images/icon-youtube.png" alt="YouTube" style="width:16px;height:16px;"></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 PIXELARC. All rights reserved.</span>
    <a href="#" class="to-top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">TOP ▲</a>
  </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // 공통 CTA(문의하기) 섹션이 필요한 페이지에 삽입
  document.querySelectorAll('.cta-slot').forEach(slot => {
    slot.innerHTML = `
      <div class="cta-bg">
        <!-- CTA 배경 이미지 자리: 도시 야경, 촬영 현장 등 브랜드 분위기의 이미지 권장 -->
        <img src="images/cta-bg.png" alt="" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="cta-overlay"></div>
      <div class="container cta-inner">
        <div class="cta-left">
          <div class="eyebrow">LET'S CREATE TOGETHER</div>
          <h2 class="cta-title">당신의 다음 장면을<br>함께 만들어요.</h2>
        </div>
        <div class="cta-right">
          <p>지금, 당신의 프로젝트에 대해<br>편하게 문의해 주세요.</p>
          <a href="contact.html" class="btn btn-primary">프로젝트 문의하기 →</a>
        </div>
      </div>
    `;
  });
});

/* ---------------------------------------------------------
   범용 이미지 슬라이더 (about.html, portfolio.html 상단 등)
   사용법: .pf-slider 안에 .pf-slide 여러 개를 넣고
   initSlider('슬라이더id', '카운터id') 호출
--------------------------------------------------------- */
function initSlider(sliderId, counterId, intervalMs = 4000) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const slides = slider.querySelectorAll('.pf-slide');
  const counter = counterId ? document.getElementById(counterId) : null;
  let idx = 0;
  if (slides.length === 0) return;
  slides[0].classList.add('active');
  if (counter) counter.textContent = `0${1} / 0${slides.length}`;

  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
    if (counter) counter.textContent = `0${idx + 1} / 0${slides.length}`;
  }, intervalMs);
}

/* ---------------------------------------------------------
   공통 알림 팝업
--------------------------------------------------------- */
function showModal(message) {
  let overlay = document.getElementById('commonModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'commonModal';
    overlay.innerHTML = `<div class="modal-box"><p id="commonModalMsg"></p><button onclick="document.getElementById('commonModal').classList.remove('active')">확인</button></div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById('commonModalMsg').textContent = message;
  overlay.classList.add('active');
}

/* ---------------------------------------------------------
   스크롤 등장 효과
   사용법: 콘텐츠를 그린 뒤 initReveal() 호출 (index.html 참고)
   화면에 들어오는 요소가 아래에서 부드럽게 나타나며,
   같은 줄의 카드들은 순서대로 조금씩 늦게 나타납니다.
--------------------------------------------------------- */
const REVEAL_TARGETS = [
  '.section .eyebrow', '.section .section-title', '.section .section-desc',
  '.about-preview-img', '.service-card', '.pf-card', '.flow-step',
  '.split-section > *', '.value-item', '.founder-text > *', '.custom-item',
  '.featured-pf > *', '.detail-block', '.v-message-section', '.keypoint',
  '.related-card', '.detail-stills',
  '.cta-left', '.cta-right',
];

function initReveal() {
  if (initReveal.done) return;
  initReveal.done = true;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const els = document.querySelectorAll(REVEAL_TARGETS.join(','));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    // 같은 부모 안의 카드끼리는 0.1초씩 차례로 등장
    const siblings = [...el.parentElement.children].filter(c => c.matches(REVEAL_TARGETS.join(',')));
    const order = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--reveal-delay', `${Math.min(order, 5) * 0.1}s`);
    el.classList.add('reveal');
    io.observe(el);
  });
}

// 모든 페이지에서 자동 실행: 각 페이지가 DOMContentLoaded 에서
// 콘텐츠(포트폴리오 목록, 상세 등)를 다 그린 뒤에 실행되도록 한 박자 늦춥니다.
document.addEventListener('DOMContentLoaded', () => setTimeout(initReveal, 0));

/* ---------------------------------------------------------
   선 아이콘 (이모지 대신 사용)
   - 포트폴리오 데이터의 icon 값에 아래 이름을 적으면 아이콘으로 표시됩니다.
     예) icon: 'users'
   - 목록에 없는 값(이모지 등)을 적으면 그 글자가 그대로 보입니다.
--------------------------------------------------------- */
const ICON_PATHS = {
  users:     '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  play:      '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  school:    '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5"/>',
  book:      '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  music:     '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  festival:  '<path d="M3 21h18"/><path d="M5 21V10l7-6 7 6v11"/><path d="M10 21v-5h4v5"/><path d="M12 4V2"/>',
  sparkles:  '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.7 1.8L21.5 17.5l-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
  bread:     '<path d="M5 20h14a1 1 0 0 0 1-1v-6a3 3 0 0 0 1-2.3C21 7.5 16.97 5 12 5S3 7.5 3 10.7A3 3 0 0 0 4 13v6a1 1 0 0 0 1 1z"/><path d="M9 9l1 3M15 9l-1 3"/>',
  clapper:   '<rect x="3" y="10" width="18" height="11" rx="1.5"/><path d="M3 10l1.5-5.5 16 0L21 10"/><path d="M8.5 4.5 7 10M14 4.5 12.5 10M19.5 4.5 18 10"/>',
  pin:       '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  bulb:      '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  phone:     '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  calendar:  '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  video:     '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/>',
  camera:    '<path d="M3 8a1 1 0 0 1 1-1h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="4"/>',
};

function iconSVG(name) {
  const paths = ICON_PATHS[name];
  if (!paths) return name || '';
  return `<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

// HTML 안의 <i data-icon="이름"></i> 자리를 아이콘으로 바꿔줍니다. (about, service 페이지)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach(el => { el.outerHTML = iconSVG(el.dataset.icon); });
});
