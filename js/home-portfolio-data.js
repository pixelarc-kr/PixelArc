/* =========================================================================
   메인 페이지의 "주요 작업 포트폴리오" 4개 미리보기 전용 데이터입니다.
   -------------------------------------------------------------------------
   포트폴리오 목록/상세 페이지(js/portfolio-data.js)와는 별개로 관리됩니다.
   메인페이지에는 원하는 썸네일 이미지(비율이 서로 달라도 OK)를 자유롭게
   넣고, 클릭 시 이동할 포트폴리오 페이지도 직접 지정할 수 있습니다.

   [필드 설명]
   thumbnail : 메인페이지 전용 썸네일 이미지 경로 (예: 'images/home/main1.jpg')
               비워두면(빈 문자열) 회색 플레이스홀더가 보입니다.
   categoryLabel : 카드 위에 작게 표시할 라벨 (예: '유튜브 콘텐츠')
   title     : 카드에 표시할 제목
   link      : 클릭 시 이동할 주소.
               특정 포트폴리오 상세페이지로 보내려면
               'portfolio-detail.html?id=포트폴리오데이터의id값' 형태로 적고,
               포트폴리오 목록 페이지로 보내려면 'portfolio.html' 로 적으면 됩니다.

   ⚠️ 배열의 순서가 곧 배치 순서입니다.
   1번째 = 왼쪽 큰 이미지 / 2번째 = 오른쪽 위 가로형 이미지 /
   3번째, 4번째 = 오른쪽 아래 정사각형 이미지 2개
   ========================================================================= */

const homePortfolioPreview = [
  {
    thumbnail: '',
    categoryLabel: '유튜브 콘텐츠',
    title: '대구보건대학교 티키타카',
    link: 'portfolio-detail.html?id=daegu-tiktaka'
  },
  {
    thumbnail: '',
    categoryLabel: '숏폼 콘텐츠',
    title: '인제 GT 마스터즈 3라운드 DRIFT TRACK DAY',
    link: 'portfolio-detail.html?id=injegt-drift'
  },
  {
    thumbnail: '',
    categoryLabel: '기업 홍보영상',
    title: '식당 홍보영상',
    link: 'portfolio-detail.html?id=restaurant-promo'
  },
  {
    thumbnail: '',
    categoryLabel: '숏폼 콘텐츠',
    title: '우송대학교 홍보 숏폼',
    link: 'portfolio-detail.html?id=woosong-shorts'
  }
];
