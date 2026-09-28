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
  {
    id: 'restaurant-promo',
    title: '소보양탕 사천점 홍보영상',
    subtitle: '',
    date: '2026-09-29',
    category: 'promo',
    categoryLabel: '식당 홍보영상',
    layout: 'horizontal',
    thumbnail: '',
    videoEmbed: '',
    tags: ['#기업홍보', '#브랜드필름', '#요식업'],
    client: '비공개',
    typeLabel: 'Promotion Video',
    period: '2025.02',
    role: '기획 / 촬영 / 편집',
    description: '매장의 분위기와 메뉴의 매력을 효과적으로 전달하는 홍보영상입니다.',
    story: {
      title: '맛과 분위기를 한 편에 담다.',
      text: '매장만의 감성과 시그니처 메뉴를 임팩트 있게 보여줄 수 있도록 구성했습니다.',
      points: [
        { icon: '🍽', title: '메뉴 중심 연출', desc: '시그니처 메뉴가 돋보이는 촬영 구도와 라이팅' },
        { icon: '🎥', title: '공간감 있는 촬영', desc: '매장의 분위기를 그대로 전달하는 와이드 샷 활용' },
        { icon: '✨', title: '감각적인 컬러 톤', desc: '브랜드 톤에 맞춘 색보정으로 완성도 있는 영상 제작' }
      ]
    },
    process: [
      { step: '01', title: '기획', items: ['콘셉트 회의', '촬영 콘티 구성', '메뉴 선정'] },
      { step: '02', title: '촬영', items: ['매장 촬영', '메뉴 클로즈업', '고객 인터뷰(선택)'] },
      { step: '03', title: '편집', items: ['컷 편집', '색보정', 'BGM 및 자막'] },
      { step: '04', title: '납품', items: ['본편 1편', '숏폼 버전(선택)', '최종 납품 파일'] }
    ]
  },
  {
    id: 'gyeongsan-festival',
    title: '2026 경산만화축제 홍보영상',
    subtitle: '',
    date: '2026-09-22', 
    category: 'event',
    categoryLabel: '축제 홍보영상',
    layout: 'horizontal',
    thumbnail: '',
    videoEmbed: '<iframe src="https://www.instagram.com/reel/DdjV7WGqJN7/?utm_source=ig_embed&amp;utm_campaign=loading" allowfullscreen></iframe>',
    tags: ['#축제홍보', '#브랜드필름', '#요식업'],
    client: '비공개',
    typeLabel: 'Event Video',
    period: '2025.02',
    role: '기획 / 촬영 / 편집',
    description: '지역 명소의 매력을 감성적으로 담아낸 콘텐츠입니다.',
    message: {
      title: '거리의 분위기를 담은 짧은 여행.',
      text: '점촌정방길의 야경과 분위기를 짧은 영상 안에 감성적으로 담아냈습니다.',
      sideLabels: ['MOOD', 'NIGHT', 'LOCAL', 'CALM']
    },
    keypoints: [
      { icon: '🌆', title: '감성적인 야간 촬영', desc: '조명과 분위기를 살린 야경 촬영 노하우 적용' },
      { icon: '🎞', title: '잔잔한 편집 호흡', desc: '차분한 컷 전환으로 여유로운 분위기 연출' },
      { icon: '📍', title: '지역 매력 발굴', desc: '알려지지 않은 지역의 매력 포인트를 새롭게 조명' }
    ]
  },
  {
    id: 'daegu-tiktaka',
    title: '대구보건대학교 티키타카',
    subtitle: '예비 입시생을 위한 유튜브 웹예능 콘텐츠',
    date: '2026-09-18',
    category: 'youtube',
    categoryLabel: '유튜브 콘텐츠',
    layout: 'horizontal',
    thumbnail: '',
    videoEmbed: '<iframe src="https://www.youtube.com/embed/MxKNdK0ZUvU?si=GhIgY_PPmqyhCBpR" allowfullscreen></iframe>',
    tags: ['#유튜브콘텐츠', '#웹예능', '#대학홍보', '#입시'],
    client: '대구보건대학교',
    typeLabel: 'YouTube Contents',
    period: '2026.07 - 2026.09',
    role: '기획 / 촬영 / 편집',
    description: '예비 입시생들의 고민을 유쾌한 콘텐츠로 풀어낸 대구보건대학교의 유튜브 웹예능 콘텐츠입니다. 입시 선배들의 솔직한 이야기와 유쾌한 케미를 통해 대구보건대학교의 매력을 자연스럽게 전달했습니다.',
    story: {
      title: '입시의 고민이 콘텐츠가 되는 순간.',
      text: '입시와 진로라는 진지한 주제를, 부담 없이 즐길 수 있는 웹예능 형식으로 풀어내 고등학생들이 공감하고 몰입할 수 있는 콘텐츠를 만들었습니다.',
      points: [
        { icon: '👥', title: '타겟에 맞춘 기획', desc: '입시생들의 시선에 맞춘 주제와 구성으로 자연스러운 공감대 형성' },
        { icon: '▶', title: '예능형 포맷', desc: '토크와 게임을 결합한 웹예능 형식으로 재미와 정보의 균형을 구현' },
        { icon: '📈', title: '브랜드 이미지 강화', desc: '대구보건대학교의 특성과 장점을 자연스럽게 녹여 친근한 이미지 구축' }
      ]
    },
    process: [
      { step: '01', title: '기획', items: ['콘셉트 기획', '시나리오 구성'] },
      { step: '02', title: '촬영', items: ['3대 카메라 활용', '현장 디렉팅', '안정적인 촬영 운영'] },
      { step: '03', title: '편집', items: ['컷 편집 및 자막 작업', '예능 효과 및 사운드', '컬러 보정 및 최종 편집'] },
      { step: '04', title: '납품', items: ['본편 5화', '숏츠 콘텐츠', '썸네일 및 업로드용 파일'] }
    ]
  },
  {
    id: 'jeomchon-street-shortform',
    title: '점촌점빵길 빵축제 AI 숏폼',
    subtitle: '',
    date: '2026-04-30',
    category: 'shortform',
    categoryLabel: 'AI 홍보 숏폼',
    layout: 'vertical',
    thumbnail: '',
    videoEmbed: '',
    tags: ['#지역콘텐츠', '#숏폼', '#브랜드필름'],
    client: '비공개',
    typeLabel: 'Short-form (Vertical Video)',
    period: '2024.12',
    role: '기획 / 촬영 / 편집',
    description: '지역 명소의 매력을 감성적으로 담아낸 콘텐츠입니다.',
    message: {
      title: '거리의 분위기를 담은 짧은 여행.',
      text: '점촌정방길의 야경과 분위기를 짧은 영상 안에 감성적으로 담아냈습니다.',
      sideLabels: ['MOOD', 'NIGHT', 'LOCAL', 'CALM']
    },
    keypoints: [
      { icon: '🌆', title: '감성적인 야간 촬영', desc: '조명과 분위기를 살린 야경 촬영 노하우 적용' },
      { icon: '🎞', title: '잔잔한 편집 호흡', desc: '차분한 컷 전환으로 여유로운 분위기 연출' },
      { icon: '📍', title: '지역 매력 발굴', desc: '알려지지 않은 지역의 매력 포인트를 새롭게 조명' }
    ]
  },
  {
    id: 'jeomchon-street',
    title: '2026 점촌점빵길 빵축제',
    subtitle: '',
    date: '2026-04-10', 
    category: 'event',
    categoryLabel: '축제 홍보영상',
    layout: 'horizontal',
    thumbnail: '',
    videoEmbed: '<iframe src="https://www.youtube.com/embed/8tyyjHFetZQ?si=xz5x9DceXOE_RJMD" allowfullscreen></iframe>',
    tags: ['#축제홍보', '#브랜드필름', '#요식업'],
    client: '비공개',
    typeLabel: 'Event Video',
    period: '2025.02',
    role: '기획 / 촬영 / 편집',
    description: '지역 명소의 매력을 감성적으로 담아낸 콘텐츠입니다.',
    message: {
      title: '거리의 분위기를 담은 짧은 여행.',
      text: '점촌정방길의 야경과 분위기를 짧은 영상 안에 감성적으로 담아냈습니다.',
      sideLabels: ['MOOD', 'NIGHT', 'LOCAL', 'CALM']
    },
    keypoints: [
      { icon: '🌆', title: '감성적인 야간 촬영', desc: '조명과 분위기를 살린 야경 촬영 노하우 적용' },
      { icon: '🎞', title: '잔잔한 편집 호흡', desc: '차분한 컷 전환으로 여유로운 분위기 연출' },
      { icon: '📍', title: '지역 매력 발굴', desc: '알려지지 않은 지역의 매력 포인트를 새롭게 조명' }
    ]
  }
];

/* -----------------------------------------------------------------------
   아래는 데이터를 다루는 함수들입니다. (수정하지 않아도 됩니다)
----------------------------------------------------------------------- */
function getSortedPortfolio() {
  return [...portfolioList].sort((a, b) => new Date(b.date) - new Date(a.date));
}
function getPortfolioById(id) {
  return portfolioList.find(p => p.id === id);
}
function getRandomPortfolio(excludeId, count = 4) {
  const pool = portfolioList.filter(p => p.id !== excludeId);
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
