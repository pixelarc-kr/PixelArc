/* =========================================================================
   포트폴리오 관련 화면 렌더링
   - portfolio-data.js 의 데이터를 읽어서
     ① 메인페이지 미리보기(4개)
     ② 포트폴리오 목록페이지(필터+페이지네이션)
     ③ 포트폴리오 상세페이지(가로형/세로형 + 이전/다음 + 추천영상)
     를 자동으로 그려줍니다. 이 파일은 보통 수정할 필요 없습니다.
   ========================================================================= */

// 공통: 카드 한 장의 HTML (썸네일+그라데이션+텍스트+화살표)
function pfCardHTML(item) {
  const media = item.thumbnail
    ? `<img src="${item.thumbnail}" class="pf-thumb" alt="${item.title}">`
    : `<div class="img-placeholder">썸네일 이미지<br>${item.title}</div>`;
  return `
    <a class="pf-card" href="portfolio-detail.html?id=${item.id}">
      ${media}
      <div class="pf-card-gradient"></div>
      <div class="pf-card-info">
        <div class="pf-card-cat">${item.categoryLabel}</div>
        <div class="pf-card-title">${item.title}</div>
      </div>
      <div class="pf-card-arrow">→</div>
    </a>
  `;
}

/* ---------------------------------------------------------------------
   ① 메인페이지 포트폴리오 미리보기
   (왼쪽 큰 이미지 1개 + 오른쪽 위 가로형 1개 + 오른쪽 아래 정사각형 2개)
   -> js/home-portfolio-data.js 의 homePortfolioPreview 데이터를 사용합니다.
--------------------------------------------------------------------- */
function homePfCardHTML(item) {
  const media = item.thumbnail
    ? `<img src="${item.thumbnail}" class="pf-thumb" alt="${item.title}">`
    : `<div class="img-placeholder">썸네일 이미지<br>${item.title}</div>`;
  return `
    <a class="pf-card" href="${item.link}">
      ${media}
      <div class="pf-card-gradient"></div>
      <div class="pf-card-info">
        <div class="pf-card-cat">${item.categoryLabel}</div>
        <div class="pf-card-title">${item.title}</div>
      </div>
      <div class="pf-card-arrow">→</div>
    </a>
  `;
}

function renderHomePortfolio() {
  const wrap = document.getElementById('home-portfolio-grid');
  if (!wrap) return;
  const items = (typeof homePortfolioPreview !== 'undefined' ? homePortfolioPreview : []).slice(0, 4);
  if (items.length === 0) return;
  const [main, top, ...bottom] = items;
  wrap.innerHTML = `
    <div class="home-pf-main">${homePfCardHTML(main)}</div>
    <div class="home-pf-side">
      ${top ? `<div class="home-pf-top">${homePfCardHTML(top)}</div>` : ''}
      <div class="home-pf-bottom-row">
        ${bottom.map(homePfCardHTML).join('')}
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------------------
   ② 포트폴리오 목록 페이지 (필터 + 6개씩 페이지네이션)
--------------------------------------------------------------------- */
const PF_PER_PAGE = 6;
let pfCurrentFilter = 'all';
let pfCurrentPage = 1;

function renderPortfolioList() {
  const grid = document.getElementById('pf-grid');
  if (!grid) return;
  hideEmptyPfFilters();

  let items = getSortedPortfolio();
  if (pfCurrentFilter !== 'all') {
    items = items.filter(i => i.category === pfCurrentFilter);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / PF_PER_PAGE));
  if (pfCurrentPage > totalPages) pfCurrentPage = totalPages;
  const start = (pfCurrentPage - 1) * PF_PER_PAGE;
  const pageItems = items.slice(start, start + PF_PER_PAGE);

  grid.innerHTML = pageItems.length
    ? pageItems.map(pfCardHTML).join('')
    : `<p style="color:var(--c-gray-500);grid-column:1/-1;">등록된 포트폴리오가 없습니다.</p>`;

  renderPagination(totalPages);
}

// 등록된 작업물이 없는 카테고리 탭은 숨김 (작업물을 추가하면 자동으로 다시 보입니다)
function hideEmptyPfFilters() {
  document.querySelectorAll('.pf-filter button[data-filter]').forEach(btn => {
    const cat = btn.dataset.filter;
    if (cat === 'all') return;
    btn.hidden = !portfolioList.some(p => p.category === cat);
  });
}

function renderPagination(totalPages) {
  const pagi = document.getElementById('pf-pagination');
  if (!pagi) return;
  if (totalPages <= 1) { pagi.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === pfCurrentPage ? 'active' : ''}" onclick="goPfPage(${i})">${i}</button>`;
  }
  pagi.innerHTML = html;
}

function goPfPage(page) {
  pfCurrentPage = page;
  renderPortfolioList();
  document.getElementById('pf-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setPfFilter(category, btnEl) {
  pfCurrentFilter = category;
  pfCurrentPage = 1;
  document.querySelectorAll('.pf-filter button').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPortfolioList();
}

// 포트폴리오 목록 페이지 하단의 "대표 포트폴리오" 섹션 (가장 최신 1개)
function renderFeaturedPortfolio() {
  const wrap = document.getElementById('featured-pf-wrap');
  if (!wrap) return;
  const item = getFeaturedPortfolio();
  if (!item) return;
  wrap.innerHTML = `
    <div class="featured-pf-img">
      ${item.thumbnail ? `<img src="${item.thumbnail}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;" alt="${item.title}">` : `<div class="img-placeholder" style="aspect-ratio:4/3;">대표 포트폴리오 이미지</div>`}
    </div>
    <div class="featured-pf-text">
      <div class="tag">${item.categoryLabel}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="portfolio-detail.html?id=${item.id}" class="btn btn-outline">프로젝트 자세히 보기 →</a>
    </div>
  `;
}

// 인스타그램 embed 코드인지 확인
function isInstagramEmbed(html) {
  return !!html && html.includes('instagram.com');
}

// 인스타그램 embed 스크립트를 불러와서 blockquote를 실제 영상으로 변환
function loadInstagramEmbed() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  } else {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }
}

/* ---------------------------------------------------------------------
   ③ 포트폴리오 상세 페이지
--------------------------------------------------------------------- */
function renderPortfolioDetail() {
  const container = document.getElementById('detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const sorted = getSortedPortfolio();
  const item = getPortfolioById(id) || sorted[0];

  if (!item) {
    container.innerHTML = `<div class="container" style="padding:160px 0;text-align:center;">해당 포트폴리오를 찾을 수 없습니다.</div>`;
    return;
  }

  // 이전/다음 계산 (배열 기준: 인덱스가 작을수록 최신)
  const idx = sorted.findIndex(p => p.id === item.id);
  const newer = idx > 0 ? sorted[idx - 1] : null;   // NEXT: 최신 방향
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : null; // PREV: 오래된 방향

  document.title = `PIXELARC | ${item.title}`;

  // 상단 공통 바 (뒤로가기 + PREV/NEXT)
  const topbarHTML = `
    <div class="detail-topbar container">
      <a href="portfolio.html" class="back-link">← 포트폴리오</a>
      <div class="prevnext">
        <a href="${older ? `portfolio-detail.html?id=${older.id}` : '#'}" class="${older ? '' : 'disabled'}">← PREV</a>
        <a href="${newer ? `portfolio-detail.html?id=${newer.id}` : '#'}" class="${newer ? '' : 'disabled'}">NEXT →</a>
      </div>
    </div>
  `;

const isInstagram = isInstagramEmbed(item.videoEmbed);
  const videoWrapClass = isInstagram ? 'video-embed video-embed-instagram' : 'video-embed';

  const videoHTML = item.videoEmbed
    ? item.videoEmbed
    : `<div class="img-placeholder">${item.layout === 'vertical' ? '인스타그램/유튜브 세로 영상 자리' : '유튜브 영상 자리 (16:9)'}</div>`;

  const tagsHTML = item.tags.map(t => `<span>${t}</span>`).join('');

  // 섹션 번호(01, 02, ...)를 실제로 보이는 섹션 순서대로 매김
  let sectionNo = 0;
  const nextNo = () => String(++sectionNo).padStart(2, '0');

  const infoHTML = `
    <div class="cat">${item.categoryLabel.toUpperCase()}</div>
    <h1>${item.title}</h1>
    <div class="subtitle">${item.subtitle || ''}</div>
    <div class="desc">${item.description}</div>`;
  const metaHTML = `
    <div class="meta-table">
      <div><b>CLIENT</b><span>${item.client}</span></div>
      <div><b>TYPE</b><span>${item.typeLabel}</span></div>
      <div><b>PERIOD</b><span>${item.period}</span></div>
      <div><b>ROLE</b><span>${item.role}</span></div>
    </div>
    <div class="tag-list">${tagsHTML}</div>`;

  // 스틸컷 갤러리 (stills 배열이 있을 때만) — 번호 순서를 위해 그릴 위치에서 호출
  const stillsBlock = () => item.stills && item.stills.length ? `
      <div class="detail-block container">
        <div class="detail-block-head"><span class="n">${nextNo()}</span><span class="label">STILLS</span></div>
        <div class="detail-stills">
          ${item.stills.map((src, i) => `<img src="${src}" alt="${item.title} 장면 ${i + 1}" loading="lazy">`).join('')}
        </div>
      </div>` : '';

  let bodyHTML = '';

  if (item.layout === 'horizontal') {
    bodyHTML = `
      <div class="container detail-h-top">
        <div class="detail-h-media${isInstagram ? ' is-instagram' : ''}">
          <div class="${videoWrapClass}">${videoHTML}</div>
        </div>
        <div class="detail-info detail-h-info">
          <div>${infoHTML}</div>
          <div>${metaHTML}</div>
        </div>
      </div>

      ${item.story ? `
      <div class="detail-block container">
        <div class="detail-block-head"><span class="n">${nextNo()}</span><span class="label">PROJECT STORY</span></div>
        <div class="detail-block-grid">
          <h2>${item.story.title}</h2>
          ${item.story.points.map(p => `
            <div class="detail-story-point">
              <div class="icon">${iconSVG(p.icon)}</div>
              <h4>${p.title}</h4>
              <p>${p.desc}</p>
            </div>`).join('')}
        </div>
      </div>` : ''}

      ${item.process ? `
      <div class="detail-block container">
        <div class="detail-block-head"><span class="n">${nextNo()}</span><span class="label">PROCESS</span></div>
        <h2 style="font-size:26px;font-weight:800;">기획부터 납품까지,<br>하나의 흐름으로.</h2>
        <div class="process-timeline">
          ${item.process.map(p => `
            <div class="pt-item">
              <div class="dot"></div>
              <div class="num">${p.step}</div>
              <h4>${p.title}</h4>
              <ul>${p.items.map(li => `<li>${li}</li>`).join('')}</ul>
            </div>`).join('')}
        </div>
      </div>` : ''}

      ${stillsBlock()}
    `;
  } else {
    // vertical
    bodyHTML = `
      <div class="container detail-v-top">
        <div class="detail-v-media">
          <div class="${videoWrapClass}">${videoHTML}</div>
        </div>
        <div class="detail-info">${infoHTML}${metaHTML}</div>
      </div>

      ${item.message ? `
      <div class="v-message-section container">
        <div><div class="cat" style="margin-bottom:0;">${nextNo()}</div><div style="font-size:12px;color:var(--c-gray-500);">PROJECT OVERVIEW</div></div>
        <div>
          <h2 style="margin-bottom:16px;">${item.message.title}</h2>
          <p>${item.message.text}</p>
        </div>
        <div class="v-message-side">${item.message.sideLabels.join('<br>')}</div>
      </div>` : ''}

      ${item.keypoints ? `
      <div class="keypoints container">
        ${item.keypoints.map(k => `
          <div class="keypoint">
            <div class="icon">${iconSVG(k.icon)}</div>
            <h4>${k.title}</h4>
            <p>${k.desc}</p>
          </div>`).join('')}
      </div>` : ''}

      ${stillsBlock()}
    `;
  }

  // 추천 영상 (랜덤 4개, 목록의 썸네일/제목 그대로 재사용)
  const related = getRandomPortfolio(item.id, 4);
  const relatedHTML = `
    <div class="container" style="padding-top:56px;padding-bottom:100px;border-top:1px solid rgba(255,255,255,.1);">
      <div class="related-head">
        <div class="detail-block-head" style="margin:0;"><span class="n">${nextNo()}</span><span class="label">OTHER PROJECTS</span></div>
      </div>
      <div class="related-grid">
        ${related.map(r => `
          <a href="portfolio-detail.html?id=${r.id}" class="related-card">
            ${r.thumbnail ? `<img src="${r.thumbnail}" alt="${r.title}">` : `<div class="img-placeholder">${r.title}</div>`}
            <div class="related-gradient"></div>
            <div class="related-title">${r.title}</div>
          </a>`).join('')}
      </div>
    </div>
  `;

  container.innerHTML = topbarHTML + bodyHTML + relatedHTML;

  // 인스타그램 embed가 포함된 경우, 실제 영상으로 변환되도록 스크립트 실행
  if (isInstagram) loadInstagramEmbed();
}
