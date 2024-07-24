document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // OpenStreetMapの初期化
    var map = L.map('map').setView([34.677851, 135.501430], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // マーカーを追加
    L.marker([34.677851, 135.501430]).addTo(map)
        .bindPopup('株式会社RAISE')
        .openPopup();
　　 });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 60;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // アクティブなナビゲーションリンクの更新
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            // モバイルメニューを閉じる
            if (window.innerWidth <= 768) {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });

    // スクロール時のナビゲーションハイライト
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
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
