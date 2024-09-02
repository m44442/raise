document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('home');
    
    // 初期状態で非表示にする
    homeSection.style.opacity = 0;
  
    initializeMenu();
    initializeMap();
    initializeSmoothScroll();
    initializeScrollSpy();
  
    function fadeIn(element, duration) {
      let opacity = 0;
      const interval = 50;
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
      fadeIn(homeSection, 3000); // 1000ミリ秒（1秒）かけてフェードイン
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
    // OpenStreetMapの初期化
    var map = L.map('map').setView([34.677851, 135.501430], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // マーカーを追加
    L.marker([34.677851, 135.501430]).addTo(map)
        .bindPopup('株式会社RAISE')
        .openPopup();
}

// スムーズスクロールの初期化
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScrollHandler);
    });
}

// スムーズスクロールの処理
function smoothScrollHandler(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 60;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // スムーズスクロールの実行
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });

    updateActiveNavLink(this);
    closeMobileMenu();
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

// スクロールスパイの初期化
function initializeScrollSpy() {
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
        // 各セクションのスクロール位置を確認し、対応するナビゲーションリンクをアクティブにする
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    });
}
