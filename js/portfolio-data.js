/* =========================================================================
   ⭐ 포트폴리오를 추가/수정할 때는 이 파일 하나만 건드리면 됩니다 ⭐
   =========================================================================

   [사용 방법]
   아래 portfolioList 배열 안에 { ... } 덩어리(객체) 하나가 포트폴리오
   1개입니다. 새 작업물을 추가하려면 이 덩어리를 통째로 복사해서
   배열 안에 붙여넣고 값들을 바꿔주면 됩니다.
   ( 목록 페이지, 메인페이지 미리보기, 상세페이지, 추천영상까지
     모두 이 파일 하나의 데이터를 기준으로 자동 생성됩니다. )

   [필드 설명]
   id            : 영문/숫자로 만든 고유 값 (중복 금지). 상세페이지 URL에 사용.
                   예) portfolio-detail.html?id=이값
   title         : 제목
   subtitle      : 부제 (상세페이지 상단에 작게 표시)
   date          : 'YYYY-MM-DD' 형식. 최신순 정렬 기준.
   category      : 필터용 값 → 'youtube' | 'shortform' | 'promo' | 'event' | 'etc'
   categoryLabel : 화면에 보일 카테고리 이름(한글)
   layout        : 'horizontal'(16:9 유튜브형) 또는 'vertical'(세로 숏폼형)
   thumbnail     : 목록/추천에 쓰일 썸네일 이미지 경로 (예: 'images/portfolio/파일명.jpg')
                   비워두면(빈 문자열 '') 회색 플레이스홀더가 보입니다.
   videoEmbed    : 유튜브/인스타그램 "퍼가기(embed)" iframe 코드를 그대로 붙여넣기
                   예) '<iframe src="https://www.youtube.com/embed/영상ID" allowfullscreen></iframe>'
                   비워두면 회색 플레이스홀더가 보입니다.
   tags          : 태그 배열
   client        : 클라이언트명 / typeLabel : 제작 형태 / period : 제작 기간 / role : 담당 역할
   description   : 상세 소개 문구

   ---- layout이 'horizontal' 일 때만 사용하는 필드 ----
   story    : { title, text, points:[{icon,title,desc}, ...] }  (points 3개 권장)
   process  : [ {step:'01', title:'기획', items:['..','..','..']}, ... ]  (4단계 권장)

   ---- layout이 'vertical' 일 때만 사용하는 필드 ----
   message    : { title, text, sideLabels:['IDEA','TREND','SPEED','IMPACT'] }
   keypoints  : [ {icon,title,desc}, ... ]  (3개 권장)
   ========================================================================= */

const portfolioList = [
  // {
  //   id: 'restaurant-promo',
  //   title: '소보양탕 사천점 홍보영상',
  //   subtitle: '',
  //   date: '2026-09-29',
  //   category: 'promo',
  //   categoryLabel: '식당 홍보영상',
  //   layout: 'horizontal',
  //   thumbnail: '',
  //   videoEmbed: '',
  //   tags: ['#기업홍보', '#브랜드필름', '#요식업'],
  //   client: '비공개',
  //   typeLabel: 'Promotion Video',
  //   period: '2025.02',
  //   role: '기획 / 촬영 / 편집',
  //   description: '매장의 분위기와 메뉴의 매력을 효과적으로 전달하는 홍보영상입니다.',
  //   story: {
  //     title: '맛과 분위기를 한 편에 담다.',
  //     text: '',
  //     points: [
  //       { icon: '🍽', title: '메뉴 중심 연출', desc: '시그니처 메뉴가 돋보이는 촬영 구도와 라이팅' },
  //       { icon: '🎥', title: '공간감 있는 촬영', desc: '매장의 분위기를 그대로 전달하는 와이드 샷 활용' },
  //       { icon: '✨', title: '감각적인 컬러 톤', desc: '브랜드 톤에 맞춘 색보정으로 완성도 있는 영상 제작' }
  //     ]
  //   },
  //   process: [
  //     { step: '01', title: '기획', items: ['콘셉트 회의', '촬영 콘티 구성', '메뉴 선정'] },
  //     { step: '02', title: '촬영', items: ['매장 촬영', '메뉴 클로즈업', '고객 인터뷰(선택)'] },
  //     { step: '03', title: '편집', items: ['컷 편집', '색보정', 'BGM 및 자막'] },
  //     { step: '04', title: '납품', items: ['본편 1편', '숏폼 버전(선택)', '최종 납품 파일'] }
  //   ]
  // },
  {
    id: 'gyeongsan-festival',
    title: '2026 경산만화축제 홍보영상',
    featured: true,
    subtitle: '만화적 비주얼로 축제의 즐거움을 풀어낸 SPOT 영상',
    date: '2026-09-22', 
    category: 'event',
    categoryLabel: '축제 홍보영상',
    layout: 'horizontal',
    thumbnail: 'images/portfolio/gyeongsan-festival.jpg',
    videoEmbed: '<iframe src="https://www.instagram.com/reel/DdjV7WGqJN7/embed" width="100%" height="100%" frameborder="0" scrolling="no" allowtransparent="true"></iframe>',
    tags: ['#축제홍보', '#SPOT', '#만화축제'],
    client: '(주)문화이야기',
    typeLabel: 'Festival SPOT',
    period: '2026.09',
    role: '기획 / 디자인 / 모션그래픽 / 편집',
    description: '한 편의 만화를 펼쳐보는 듯한 연출로, 경산만화축제의 다양한 볼거리와 즐길 거리를 담아냈습니다.',
    story: {
    title: '만화 속 장면처럼,<br>축제를 펴쳐내다.',
    text: '',
    points: [
      { icon: '📖', title: '만화적 비주얼 콘셉트', desc: '만화 원고와 프레임을 활용해 축제의 정체성을 시각적으로 표현' },
      { icon: '🎶', title: '리듬감 있는 모션그래픽', desc: '짧은 러닝타임 안에서 다양한 프로그램을 빠르고 자연스럽게 전개' },
      { icon: '🎪', title: '행사 정보의 명확한 전달', desc: '공연·체험·토크 등 주요 프로그램을 직관적으로 구성' }
    ]
  },
    process: [
      { step: '01', title: '기획', items: ['콘셉트 기획', '콘티 구성'] },
      { step: '02', title: '디자인', items: ['스타일프레임 구성', '그래픽 소스 제작'] },
      { step: '03', title: '편집', items: ['모션그래픽', 'BGM 및 자막', '색감·템포 조정'] },
      { step: '04', title: '납품', items: ['최종 검수', '최종 납품 파일'] }
    ]
  },
  {
    id: 'daegu-tiktaka',
    title: '대구보건대학교 티키타카',
    subtitle: '예비 입시생의 고민을 유쾌하게 풀어낸 대학 홍보 웹예능',
    date: '2026-09-18',
    category: 'youtube',
    categoryLabel: '유튜브 웹예능',
    layout: 'horizontal',
    thumbnail: 'images/portfolio/daegu-tiktaka.jpg',
    videoEmbed: '<iframe src="https://www.youtube.com/embed/MxKNdK0ZUvU?si=GhIgY_PPmqyhCBpR" allowfullscreen></iframe>',
    tags: ['#유튜브콘텐츠', '#웹예능', '#대학홍보', '#입시'],
    client: '대구보건대학교',
    typeLabel: 'YouTube Web Variety',
    period: '2026.07 - 2026.09',
    role: '기획 / 촬영 / 편집',
    description: '입시 준비부터 학과 선택, 면접까지 예비 입시생들이 궁금해할 이야기를<br>재학생들의 솔직한 경험과 게임형 콘텐츠로 풀어냈습니다.',
    story: {
      title: '입시의 고민이 콘텐츠가 되는 순간.',
      text: '',
      points: [
        { icon: '👥', title: '입시생에 맞춘 기획', desc: '입시 준비·학과 선택·면접 등 예비 입시생이 궁금해할 주제를 중심으로 구성' },
        { icon: '▶', title: '웹예능형 포맷', desc: '토크와 미니게임을 결합해 정보성과 재미를 자연스럽게 연결' },
        { icon: '🏫', title: '대학 브랜드 친밀도 강화', desc: '재학생의 솔직한 이야기와 자연스러운 케미를 통해 친근한 대학 이미지 전달' }
      ]
    },
    process: [
      { step: '01', title: '기획', items: ['콘텐츠 기획', '회차별 주제 및 구성'] },
      { step: '02', title: '촬영', items: ['4대 카메라 멀티캠 촬영', '출연자 오디오 수음', '현장 디렉팅'] },
      { step: '03', title: '편집', items: ['멀티캠 컷 편집', '자막·예능 효과·사운드 디자인', '컬러 보정 및 최종 편집'] },
      { step: '04', title: '납품', items: ['본편 5편', '회차별 숏폼 콘텐츠', '썸네일 및 최종 업로드 파일'] }
    ]
  },
  {
    id: 'jeomchon-street-shortform',
    title: '점촌점빵길 빵축제 AI 숏폼',
    subtitle: 'AI 캐릭터로 축제의 즐거움을 표현한 세로형 숏폼 영상',
    date: '2026-04-30',
    category: 'shortform',
    categoryLabel: 'AI 홍보 숏폼',
    layout: 'vertical',
    thumbnail: 'images/portfolio/jeomchon-street-shortform.jpg',
    videoEmbed: '<iframe src="https://www.youtube.com/embed/smZQc3Pmwr8" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    tags: ['#지역콘텐츠', '#숏폼', '#빵축제', '#AI영상'],
    client: '(주)문화이야기',
    typeLabel: 'Short-form (Vertical Video)',
    period: '2024.12',
    role: '기획 / AI 콘텐츠 제작 / 편집',
    description: '빵을 모티브로 한 AI 캐릭터와 점촌점빵길 캐릭터의 역동적인 연출을 활용해 점촌점빵길 빵축제의 유쾌한 분위기를 담아냈습니다.',
    message: {
      title: '빵이 움직이고,<br>축제가 시작된다.',
      text: 'AI 이미지·영상 생성과 후편집을 결합해 빵축제의 분위기를 캐릭터 중심의 짧고 직관적인 콘텐츠로 구성했습니다.',
      sideLabels: ['MOOD', 'PLAYFUL', 'VIBRANT', 'FESTIVE']
    },
    keypoints: [
      { icon: '🥨', title: 'AI 캐릭터 비주얼', desc: '빵을 모티브로 한 캐릭터를 AI로 제작해 축제만의 유쾌한 이미지 구현' },
      { icon: '✨', title: '역동적인 숏폼 연출', desc: '짧은 시간 안에 시선을 끌 수 있도록 움직임과 장면 전환을 빠르게 구성' },
      { icon: '🎪', title: '축제 분위기 전달', desc: '밝고 생동감 있는 비주얼을 통해 빵축제의 즐거움과 현장감을 표현' }
    ]
  },
  {
    id: 'jeomchon-street',
    title: '2026 점촌점빵길 빵축제',
    subtitle: '짧은 시간 안에 축제의 매력을 압축한 SPOT 영상',
    date: '2026-04-10', 
    category: 'event',
    categoryLabel: '축제 홍보영상',
    layout: 'horizontal',
    thumbnail: 'images/portfolio/jeomchon-street.jpg',
    videoEmbed: '<iframe src="https://www.youtube.com/embed/8tyyjHFetZQ?si=xz5x9DceXOE_RJMD" allowfullscreen></iframe>',
    tags: ['#축제홍보', '#SPOT', '#빵축제'],
    client: '(주)문화이야기',
    typeLabel: 'Festival SPOT',
    period: '2026.04',
    role: '기획 / 디자인 / 모션그래픽 / 편집',
    description: '빵축제의 먹거리와 현장 분위기를 빠른 호흡의 편집으로 담아낸 SPOT 영상입니다.',
    story: {
    title: '눈으로 먼저 맛보는,<br>점촌점빵길 빵축제.',
    text: '',
    points: [
      { icon: '🥖', title: '먹거리 중심의 시각 구성', desc: '다양한 빵과 먹거리의 매력이 직관적으로 드러나도록 장면 구성' },
      { icon: '🎬', title: '빠르고 경쾌한 편집', desc: '짧은 러닝타임 안에서 축제의 활기를 전달하는 템포감 있는 편집' },
      { icon: '📍', title: '축제 정보 전달', desc: '행사 장소와 주요 볼거리를 자연스럽게 연결해 관람객의 관심 유도' }
    ]
  },
    process: [
      { step: '01', title: '기획', items: ['콘셉트 기획', '촬영 콘티 구성'] },
      { step: '02', title: '촬영', items: ['현장 촬영'] },
      { step: '03', title: '편집', items: ['컷 편집', '색보정', 'BGM 및 자막'] },
      { step: '04', title: '납품', items: ['최종 납품 파일'] }
    ]
  }
];

/* -----------------------------------------------------------------------
   아래는 데이터를 다루는 함수들입니다. (수정하지 않아도 됩니다)
----------------------------------------------------------------------- */
function getSortedPortfolio() {
  return [...portfolioList].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 대표 포트폴리오 가져오기: featured:true 표시된 항목 우선, 없으면 최신 항목
function getFeaturedPortfolio() {
  const featured = portfolioList.find(p => p.featured);
  return featured || getSortedPortfolio()[0];
}

function getPortfolioById(id) {
  return portfolioList.find(p => p.id === id);
}
function getRandomPortfolio(excludeId, count = 4) {
  const pool = portfolioList.filter(p => p.id !== excludeId);
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
