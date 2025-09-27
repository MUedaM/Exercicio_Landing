document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');
    const buttonPlay = document.querySelectorAll('.hero__midia__button__play');
    const buttonMuted = document.querySelectorAll('.hero__midia__button__muted');

    const videoPrimary = document.getElementById('videoHero');
    const videoSecondary = document.getElementById('videoBackground')
    const headerSection = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    const heroInfoSection = document.querySelector('.hero__info');
    const alturaHero = headerSection.clientHeight + heroSection.clientHeight;
    const alturaHeroMobile = headerSection.clientHeight + heroSection.clientHeight + heroInfoSection.clientHeight;

    setTimeout(() => {
        videoPrimary.classList.add('hero__midia__video--is-visible');
        videoPrimary.play();
    }, 5000);

    setTimeout(() => {
        videoSecondary.classList.add('background__video--is-visible');
        videoSecondary.play();
    }, 5000);

    for (let i = 0; i < buttonPlay.length; i++) {
        buttonPlay[i].addEventListener('click', function() {
            if (i===0) {
                buttonPlay[0].classList.remove('hero__midia__button__play--is-active');
                buttonPlay[1].classList.add('hero__midia__button__play--is-active');
                videoPrimary.pause();
                videoSecondary.pause();
            } else if (i===1) {
                buttonPlay[1].classList.remove('hero__midia__button__play--is-active');
                buttonPlay[0].classList.add('hero__midia__button__play--is-active');
                videoPrimary.play();
                videoSecondary.play();
            }
        });
    }

    for (let i = 0; i < buttonMuted.length; i++) {
        buttonMuted[i].addEventListener('click', function() {
            if (i===0) {
                buttonMuted[0].classList.remove('hero__midia__button__muted--is-active');
                buttonMuted[1].classList.add('hero__midia__button__muted--is-active');
                videoPrimary.muted = false;
            } else if (i===1) {
                buttonMuted[1].classList.remove('hero__midia__button__muted--is-active');
                buttonMuted[0].classList.add('hero__midia__button__muted--is-active');
                videoPrimary.muted = true;
            }
        });
    }
    
    if (window.matchMedia("(max-width: 960px)").matches) {
        window.addEventListener('scroll', function() {
            const posicaoAtual = window.scrollY;

            if (posicaoAtual < alturaHeroMobile) {
                ocultaElementosDoHeader();
            } else {
                exibeElementosDoHeader();
            }
        })
    } else {
        window.addEventListener('scroll', function() {
            const posicaoAtual = window.scrollY;

            if (posicaoAtual < alturaHero) {
                ocultaElementosDoHeader();
            } else {
                exibeElementosDoHeader();
            }
        })
    }
    

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(botao) {
            const abaAlvo = botao.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);
            escondeTodasAbas();
            if (abaAlvo === "crunchyroll") {
                aba.classList.add('subscription__crunchyroll--is-active');
            } else if (abaAlvo === "netflix") {
                aba.classList.add('subscription__netflix--is-active');
            } else if (abaAlvo === "prime-video") {
                aba.classList.add('subscription__prime-video--is-active')
            }
            removeBotaoAtivo();
            botao.target.classList.add('subscription__logo__button--is-active');
        })
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta);
    }
})

function ocultaElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function exibeElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}

function abreOuFechaResposta(elemento) {
    const classe = 'faq__questions__item--is-open';
    const elementoPai = elemento.target.parentNode;

    elementoPai.classList.toggle(classe);
}

function escondeTodasAbas() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('subscription__introduction--is-active');
        tabsContainer[i].classList.remove('subscription__crunchyroll--is-active');
        tabsContainer[i].classList.remove('subscription__netflix--is-active');
        tabsContainer[i].classList.remove('subscription__prime-video--is-active');
    }
}

function removeBotaoAtivo() {
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('subscription__logo__button--is-active');
    }
}