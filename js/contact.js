/* =========================================================================
   콘택트(문의) 폼 스크립트 — Netlify Forms 연동
   -------------------------------------------------------------------------
   - 필수항목 체크, 파일 첨부 미리보기, 개인정보 동의 체크 검증
   - Netlify에 배포된 사이트에서는 별도 설정 없이 폼 제출 내용이
     Netlify 대시보드 [Forms] 메뉴에 자동으로 쌓입니다.
   - 이메일로 알림 받는 법: Netlify 대시보드 → 해당 사이트 → Forms →
     Notifications → Add notification → Email notification
     (README.md 참고)
   ========================================================================= */

const MAX_FILE_MB = 50;
let attachedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fileInput = document.getElementById('fileInput');
  const fileListEl = document.getElementById('fileList');
  const textarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      charCount.textContent = `${textarea.value.length} / 1,000`;
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      Array.from(fileInput.files).forEach(file => {
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
          showModal(`${file.name} 파일이 최대 용량(${MAX_FILE_MB}MB)을 초과합니다.`);
          return;
        }
        attachedFiles.push(file);
      });
      fileInput.value = '';
      renderFileList();
    });
  }

  function renderFileList() {
    fileListEl.innerHTML = attachedFiles.map((f, idx) => `
      <div class="file-chip">
        <span>${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)</span>
        <button type="button" onclick="removeFile(${idx})">✕</button>
      </div>
    `).join('');
  }

  window.removeFile = (idx) => {
    attachedFiles.splice(idx, 1);
    renderFileList();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = textarea.value.trim();
    const consent = document.getElementById('consent').checked;

    if (!name || !email || !message) {
      showModal('필수 항목(이름/직책, 이메일, 문의 내용)을 모두 입력해주세요.');
      return;
    }
    if (!consent) {
      showModal('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    try {
      await sendToNetlify(form);
      showModal('문의가 정상적으로 접수되었습니다. 빠르게 답변드리겠습니다.');
      form.reset();
      attachedFiles = [];
      renderFileList();
      charCount.textContent = '0 / 1,000';
    } catch (err) {
      console.error(err);
      showModal('전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '프로젝트 문의하기 →';
    }
  });
});

// Netlify Forms로 폼 데이터 + 첨부파일 전송
async function sendToNetlify(form) {
  const formData = new FormData(form);

  // 파일 첨부 input 안의 실제 파일 목록을 attachedFiles 기준으로 다시 채워넣기
  // (첨부 후 삭제한 파일이 반영되도록 하기 위함)
  formData.delete('attachment');
  attachedFiles.forEach(file => formData.append('attachment', file));

  const res = await fetch('/', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('전송 실패');
}
