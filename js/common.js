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
