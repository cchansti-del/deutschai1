// --- ГЛОБАЛЬНОЕ СОСТОЯНИЕ И НАСТРОЙКИ ---

// Загружаем XP из памяти браузера или ставим 420 по умолчанию
let userXP = parseInt(localStorage.getItem('deutsch_ai_xp')) || 420;
let userStreak = parseInt(localStorage.getItem('deutsch_ai_streak')) || 5;

// При загрузке любой страницы
document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализируем иконки Lucide, если подключена библиотека
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Обновляем счетчики на шапке
  updateHeaderStats();
});

// Обновление отображения XP и дней
function updateHeaderStats() {
  const xpEl = document.getElementById('xp-counter');
  const streakEl = document.getElementById('streak-counter');

  if (xpEl) xpEl.innerText = userXP;
  if (streakEl) streakEl.innerText = userStreak;
}

// Глобальная функция добавления XP (вызывается из любых модулей)
function addXP(amount) {
  userXP += amount;
  localStorage.setItem('deutsch_ai_xp', userXP);
  updateHeaderStats();

  // Небольшая анимация подпрыгивания счетчика XP
  const xpEl = document.getElementById('xp-counter');
  if (xpEl) {
    xpEl.classList.add('scale-125', 'text-pink-500');
    setTimeout(() => {
      xpEl.classList.remove('scale-125', 'text-pink-500');
    }, 300);
  }
}