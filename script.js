document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('home');
    
    // 初期状態で非表示にする
    homeSection.style.opacity = 0;
  
    initializeMenu();
    initializeMap();
    initializeFullPageNavigation();
    showSectionFromHash();
  
    function fadeIn(element, duration) {
      let opacity = 0;
      const interval = 100;
      const delta = interval / duration;
  
      function tick() {
        opacity += delta;
        element.style.opacity = opacity;
  
        if (opacity < 1) {
          requestAnimationFrame(tick);
        }
      }
  
      tick();
    }
  
    window.onload = function() {
      fadeIn(homeSection, 3000); // 3000ミリ秒（3秒）かけてフェードイン
    };
});

// メニューの初期化
function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // メニューボタンのクリックイベント
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });
}

// 地図の初期化
function initializeMap() {
    const lat = 34.677348;
    const lng = 135.495747;
    // OpenStreetMapの初期化
    var map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // マーカーを追加
    L.marker([lat, lng]).addTo(map)
        .bindPopup('株式会社RAISE')
        .openPopup();
}

// フルページナビゲーションの初期化
function initializeFullPageNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', fullPageNavigationHandler);
    });
}

// フルページナビゲーションの処理
function fullPageNavigationHandler(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    showSection(targetId);
    updateHash(targetId);
    updateActiveNavLink(this);
    closeMobileMenu();
}

// セクションの表示
function showSection(sectionId) {
    const sections = document.querySelectorAll('.fullpage-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// URLハッシュの更新
function updateHash(sectionId) {
    history.pushState(null, null, `#${sectionId}`);
}

// ハッシュに基づいてセクションを表示
function showSectionFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
}

// アクティブなナビゲーションリンクの更新
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('nav a').forEach(navLink => {
        navLink.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// モバイルメニューを閉じる
function closeMobileMenu() {
    if (window.innerWidth <= 768) {
        document.querySelector('nav').classList.remove('open');
        document.querySelector('.menu-toggle').classList.remove('open');
    }
}

// ブラウザの戻る/進むボタンの処理
window.addEventListener('popstate', function() {
    showSectionFromHash();
});
