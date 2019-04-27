const switcher = document.querySelector('#cbx'),
	more = document.querySelector('.more'),
	modal = document.querySelector('.modal'),
	videos = document.querySelectorAll('.videos__item');
let player,
	night = false;

// Функция появления меню при клике
function bindSlideToogle(trigger, boxBody, content, openClass) {
	let button = {
		'element': document.querySelector(trigger),
		'active': false
	};
	const box = document.querySelector(boxBody),
		boxContent = document.querySelector(content);

	button.element.addEventListener('click', () => {
		if (button.active === false) { // Проверяем меню на неактивность
			button.active = true; // Если неактивна, то делаем активной
			box.style.height = boxContent.clientHeight + 'px'; // Возвращаем высоту нашему меню
			box.classList.add(openClass); // Активный класс для сайта
		} else {
			button.active = false;
			box.style.height = 0 + 'px';
			box.classList.remove(openClass);
		}
	});
}
bindSlideToogle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

// Функция изменения элементов для ночного режима
function nightMode(hamburgerMenu, videoDescr, videoViews, headerDescr, logo, color, url) {
	document.querySelectorAll(hamburgerMenu).forEach(item => {
		item.style.stroke = color; // Перекрашиваем меню гамбургер
	});
	document.querySelectorAll(videoDescr).forEach(item => {
		item.style.color = color; // Перекрашиваем описание видео
	});
	document.querySelectorAll(videoViews).forEach(item => {
		item.style.color = color; // Перекрашиваем просмотры видео
	});
	document.querySelector(headerDescr).style.color = color; // Перекрашиваем надпись ночного режима
	document.querySelector(logo).src = url; // Перекрашиваем иконку
}

// Функция включения или выключения ночного режима
function switchMode() {
	if (night === false) {
		night = true;
		document.body.classList.add('night');
		nightMode('.hamburger > line', '.videos__item-descr', '.videos__item-views', '.header__item-descr', '.logo > img', '#fff', 'logo/youtube_night.svg');
	} else {
		night = false;
		document.body.classList.remove('night');
		nightMode('.hamburger > line', '.videos__item-descr', '.videos__item-views', '.header__item-descr', '.logo > img', '#000', 'logo/youtube.svg');
	}
}

// Событие, которое отслеживает включение или выключение ночного режима
switcher.addEventListener('change', () => {
	switchMode();
});

const data = [
	['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
	['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
		'#2 Установка spikmi и работа с ветками на Github | Марафон верстки Урок 2',
		'#1 Верстка реального заказа landing Page | Марафон верстки | Артем Исламов'
	],
	['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
	['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

// Функция создания карточки с видео
more.addEventListener('click', () => {
	const videosWrapper = document.querySelector('.videos__wrapper');
	more.remove();

	for (let i = 0; i < data[0].length; i++) {
		let card = document.createElement('a');
		card.classList.add('videos__item', 'videos__item-active');
		card.setAttribute('data-url', data[3][i]);
		card.innerHTML = `
			<img src="${data[0][i]}" alt="thumb">
			<div class="videos__item-descr">
				${data[1][i]}
			</div>
			<div class="videos__item-views">
				${data[2][i]}
			</div>
		`;
		videosWrapper.appendChild(card);
		setTimeout(() => {
			card.classList.remove('videos__item-active');
		}, 10);
		bindNewModal(card);
	}
	sliceTitle('.videos__item-descr', 90);
});

// Функция обрезания описания видео
function sliceTitle(selector, count) {
	document.querySelectorAll(selector).forEach(item => {
		item.textContent.trim();
		if (item.textContent.length < count) {
			return;
		} else {
			const str = item.textContent.slice(0, count + 1) + "...";
			item.textContent = str;
		}
	});
}
sliceTitle('.videos__item-descr', 90);

// Функции для модального окна
function openModal() {
	modal.style.display = 'block';
}

function closeModal() {
	modal.style.display = 'none';
	player.stopVideo();
}

function bindModal(cards) {
	cards.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const id = item.getAttribute('data-url');
			loadVideo(id);
			openModal();
		});
	});
}

bindModal(videos);

function bindNewModal(cards) {
	cards.addEventListener('click', (e) => {
		e.preventDefault();
		const id = cards.getAttribute('data-url');
		loadVideo(id);
		openModal();
	});
}

modal.addEventListener('click', (e) => {
	if (!e.target.classList.contains('modal__body')) {
		closeModal();
	}
});

function createVideo() {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	setTimeout(() => {
		player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: 'M7lc1UVf-VE',
		});
	}, 300);
}

createVideo();

// Функция загрузки видео
function loadVideo(id) {
	player.loadVideoById({'videoId': `${id}`});
}