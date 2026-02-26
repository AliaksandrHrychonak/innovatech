# Инструкция по подключению аналитики и метрик

> **Важно:** Эта инструкция описывает процесс подключения аналитических сервисов перед выходом в продакшн.

---

## 📊 Оглавление

1. [Google Analytics 4 (GA4)](#1-google-analytics-4-ga4)
2. [Яндекс Метрика](#2-яндекс-метрика)
3. [Google Search Console](#3-google-search-console)
4. [Яндекс Вебмастер](#4-яндекс-вебмастер)
5. [Microsoft Clarity (опционально)](#5-microsoft-clarity)
6. [Настройка целей и событий](#6-настройка-целей-и-событий)
7. [Тестирование перед запуском](#7-тестирование-перед-запуском)

---

## 1. Google Analytics 4 (GA4)

### Шаг 1: Создание аккаунта и свойства

1. Перейдите на [Google Analytics](https://analytics.google.com/)
2. Нажмите **"Администратор"** → **"Создать аккаунт"**
3. Заполните данные:
   - Название аккаунта: `InnovaTech`
   - Название свойства: `InnovaTech Website`
   - Часовой пояс: `(UTC+03:00) Москва`
   - Валюта: `Российский рубль (RUB)` или `US Dollar (USD)`

4. Выберите **"Веб"** как платформу
5. Введите URL: `https://innovatech.com`
6. Получите **Measurement ID** (формат: `G-XXXXXXXXXX`)

### Шаг 2: Установка кода на сайт

**Добавьте в `.env.local`:**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Используйте готовый компонент:**
```typescript
// Файл уже создан: components/Analytics/GoogleAnalytics.tsx
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics';

// В app/[lang]/layout.tsx уже добавлен компонент
<GoogleAnalytics />
```

### Шаг 3: Настройка отслеживания

В GA4 автоматически отслеживаются:
- ✅ Просмотры страниц
- ✅ Время на сайте
- ✅ Показатель отказов
- ✅ География пользователей
- ✅ Устройства и браузеры

**Дополнительные события уже настроены:**
- `cta_click` - клики на CTA кнопки
- `solution_view` - просмотр решений
- `form_submit` - отправка форм
- `phone_click` - клик на телефон
- `email_click` - клик на email

### Шаг 4: Проверка установки

1. Откройте **Реалтайм отчёты** в GA4
2. Откройте сайт в новой вкладке
3. Убедитесь, что видите свой визит в реалтайм

---

## 2. Яндекс Метрика

### Шаг 1: Создание счётчика

1. Перейдите на [Яндекс.Метрика](https://metrika.yandex.ru/)
2. Нажмите **"Добавить счётчик"**
3. Заполните данные:
   - Название: `InnovaTech`
   - Адрес сайта: `https://innovatech.com`
   - Включите опции:
     - ✅ Вебвизор (записи сессий)
     - ✅ Карта кликов
     - ✅ Анализ форм
     - ✅ Электронная коммерция (если планируете продажи)

4. Получите **ID счётчика** (формат: `12345678`)

### Шаг 2: Установка кода

**Добавьте в `.env.local`:**
```bash
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

**Используйте готовый компонент:**
```typescript
// Файл уже создан: components/Analytics/YandexMetrika.tsx
import { YandexMetrika } from '@/components/Analytics/YandexMetrika';

// В app/[lang]/layout.tsx уже добавлен компонент
<YandexMetrika />
```

### Шаг 3: Настройка целей

В Яндекс.Метрике настройте цели:

**1. Отправка формы (JavaScript событие):**
- Идентификатор: `form_submit`
- Условие: `JavaScript событие`

**2. Клик на телефон (JavaScript событие):**
- Идентификатор: `phone_click`
- Условие: `JavaScript событие`

**3. Просмотр раздела "Решения" (Посещение страниц):**
- URL содержит: `#solutions`

**4. Время на сайте > 2 минуты:**
- Условие: `Время на сайте > 120 секунд`

### Шаг 4: Проверка

1. Откройте **"Отчёты" → "Посещаемость" → "В реальном времени"**
2. Откройте сайт в новой вкладке
3. Убедитесь, что видите активного пользователя

---

## 3. Google Search Console

### Шаг 1: Добавление сайта

1. Перейдите на [Google Search Console](https://search.google.com/search-console/)
2. Нажмите **"Добавить ресурс"**
3. Выберите **"Домен"** и введите: `innovatech.com`

### Шаг 2: Подтверждение владения

**Метод 1: DNS-запись (рекомендуется)**
1. Получите TXT-запись от Google
2. Добавьте в DNS вашего домена:
   ```
   Тип: TXT
   Имя: @
   Значение: google-site-verification=XXXXXXXXX
   ```
3. Подождите 5-10 минут и нажмите **"Подтвердить"**

**Метод 2: HTML-файл**
1. Скачайте HTML-файл от Google
2. Загрузите в `public/` папку Next.js
3. Проверьте доступность по URL: `https://innovatech.com/googleXXXX.html`
4. Нажмите **"Подтвердить"**

### Шаг 3: Отправка Sitemap

1. В Search Console перейдите в **"Файлы Sitemap"**
2. Добавьте URL: `https://innovatech.com/sitemap.xml`
3. Нажмите **"Отправить"**

**Проверьте через несколько дней:**
- Количество проиндексированных страниц
- Ошибки индексации
- Позиции в поиске

### Шаг 4: Настройка мультиязычности

Добавьте все версии сайта:
- `https://innovatech.com/en`
- `https://innovatech.com/ru`
- `https://innovatech.com/kk`

В каждой версии отправьте соответствующий sitemap.

---

## 4. Яндекс Вебмастер

### Шаг 1: Добавление сайта

1. Перейдите на [Яндекс.Вебмастер](https://webmaster.yandex.ru/)
2. Нажмите **"Добавить сайт"**
3. Введите URL: `https://innovatech.com`

### Шаг 2: Подтверждение владения

**Метод 1: HTML-файл**
1. Скачайте файл `yandex_XXXX.html`
2. Загрузите в `public/` папку
3. Нажмите **"Проверить"**

**Метод 2: Мета-тег**
1. Получите мета-тег от Яндекса
2. Добавьте в `app/[lang]/layout.tsx` в metadata:
```typescript
verification: {
  yandex: 'XXXXXXXXXXXXXXXX',
}
```

**Метод 3: DNS-запись**
1. Получите TXT-запись
2. Добавьте в DNS домена
3. Нажмите **"Проверить"**

### Шаг 3: Отправка Sitemap

1. Перейдите в **"Индексирование" → "Файлы Sitemap"**
2. Добавьте: `https://innovatech.com/sitemap.xml`
3. Нажмите **"Добавить"**

### Шаг 4: Настройка региона

1. Перейдите в **"Настройки" → "Региональность"**
2. Укажите основной регион:
   - Россия (для .ru домена)
   - Казахстан (для .kz домена)

---

## 5. Microsoft Clarity (опционально, но рекомендуется)

### Преимущества:
- ✅ **Бесплатно** (неограниченно)
- ✅ Записи сессий
- ✅ Тепловые карты
- ✅ Интеграция с Google Analytics

### Шаг 1: Создание проекта

1. Перейдите на [Microsoft Clarity](https://clarity.microsoft.com/)
2. Войдите через Microsoft/Google аккаунт
3. Нажмите **"Add new project"**
4. Введите:
   - Name: `InnovaTech`
   - Website URL: `https://innovatech.com`

5. Получите **Project ID**

### Шаг 2: Установка

**Добавьте в `.env.local`:**
```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXX
```

**Используйте готовый компонент:**
```typescript
// Файл уже создан: components/Analytics/MicrosoftClarity.tsx
<MicrosoftClarity />
```

### Шаг 3: Интеграция с GA4

В настройках Clarity:
1. Перейдите в **"Settings" → "Integrations"**
2. Подключите Google Analytics 4
3. Введите ваш GA4 Measurement ID

---

## 6. Настройка целей и событий

### События для отслеживания

Все события уже настроены в компоненте `lib/analytics.ts`:

```typescript
// 1. CTA клики
trackEvent('cta_click', {
  button_text: 'Запросить цену',
  location: 'navbar'
});

// 2. Отправка форм
trackEvent('form_submit', {
  form_name: 'contact_form',
  form_location: 'footer'
});

// 3. Клики на контакты
trackEvent('contact_click', {
  contact_type: 'phone',
  contact_value: '+7-XXX-XXX-XXXX'
});

// 4. Просмотр решений
trackEvent('solution_view', {
  solution_name: 'Тепличные конструкции',
  solution_category: 'greenhouses'
});

// 5. Скачивание файлов
trackEvent('file_download', {
  file_name: 'catalog.pdf',
  file_type: 'pdf'
});
```

### Настройка конверсий в GA4

1. Перейдите в **"Настройка" → "События"**
2. Найдите событие `form_submit`
3. Нажмите **"Отметить как конверсию"**

Повторите для:
- `cta_click`
- `phone_click`
- `file_download`

### Настройка воронки продаж

1. **Шаг 1:** Посещение главной страницы
2. **Шаг 2:** Просмотр раздела "Решения" (`solution_view`)
3. **Шаг 3:** Клик на CTA (`cta_click`)
4. **Шаг 4:** Отправка формы (`form_submit`)

---

## 7. Тестирование перед запуском

### Чек-лист тестирования

**Google Analytics 4:**
- [ ] Отображается в реалтайм отчётах
- [ ] События `page_view` фиксируются
- [ ] Кастомные события работают (`cta_click`, `form_submit`)
- [ ] Демография и устройства определяются

**Яндекс Метрика:**
- [ ] Видно в реальном времени
- [ ] Вебвизор записывает сессии
- [ ] Цели срабатывают
- [ ] Карта кликов работает

**Google Search Console:**
- [ ] Sitemap отправлен и обработан
- [ ] Нет ошибок индексации
- [ ] Страницы начали индексироваться
- [ ] hreflang теги определяются

**Яндекс Вебмастер:**
- [ ] Sitemap загружен
- [ ] Регион определён корректно
- [ ] Нет критических ошибок
- [ ] Страницы в индексе

### Инструменты для тестирования

**1. Google Tag Assistant (Chrome Extension)**
- Проверяет корректность установки GA4
- Показывает все события в реальном времени

**2. Яндекс.Метрика Debug Mode**
```javascript
// В консоли браузера:
ym(COUNTER_ID, 'getClientID')
// Должен вернуть ID клиента
```

**3. Google Rich Results Test**
- URL: https://search.google.com/test/rich-results
- Проверьте: `https://innovatech.com/ru`
- Убедитесь, что все schemas валидны

**4. Schema Markup Validator**
- URL: https://validator.schema.org/
- Вставьте HTML страницы
- Проверьте Organization, Website, FAQ schemas

---

## 8. Конфигурация Environment Variables

### Production (.env.production)

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Яндекс Метрика
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678

# Microsoft Clarity (опционально)
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=https://innovatech.com

# App URL (для sitemap)
NEXT_PUBLIC_APP_URL=https://innovatech.com
```

### Development (.env.local)

```bash
# Для разработки используйте тестовые ID или оставьте пустыми
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=

# Base URL для локальной разработки
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 9. Дополнительные рекомендации

### SEO мониторинг

**Google Search Console - еженедельно проверяйте:**
- Покрытие индексации (Coverage)
- Производительность (Performance)
- Улучшения (Enhancements)
- Core Web Vitals

**Яндекс Вебмастер - еженедельно проверяйте:**
- Статус индексирования
- Поисковые запросы
- Качество сайта
- Региональность

### Аналитика - ежедневный мониторинг

**Ключевые метрики:**
- Посещаемость (Sessions)
- Уникальные пользователи (Users)
- Показатель отказов (Bounce Rate) - цель: < 40%
- Среднее время на сайте - цель: > 3 минуты
- Конверсия форм - цель: > 5%

### Настройка уведомлений

**Google Analytics 4:**
1. Перейдите в **"Администратор" → "Оповещения"**
2. Создайте оповещение:
   - Падение трафика > 20%
   - Всплеск трафика > 50%
   - Падение конверсий > 30%

**Яндекс Метрика:**
1. Перейдите в **"Настройки" → "Уведомления"**
2. Включите email-уведомления для:
   - Критические ошибки сайта
   - Изменения в индексации

---

## 10. GDPR / Privacy Compliance

### Cookie Notice

Добавьте баннер согласия на куки:

```typescript
// components/CookieConsent.tsx уже создан
import { CookieConsent } from '@/components/CookieConsent';

// Добавьте в layout.tsx
<CookieConsent lang={lang} />
```

### Privacy Policy

Создайте страницу **"Политика конфиденциальности"**:
- `/ru/privacy` - на русском
- `/en/privacy` - на английском
- `/kk/privacy` - на казахском

**Обязательно укажите:**
- Какие данные собираются
- Как используются cookie
- Третьи стороны (Google, Яндекс)
- Права пользователей
- Контакты для запросов

---

## 📊 Summary Checklist

Перед запуском в продакшн убедитесь:

### Analytics
- [ ] Google Analytics 4 установлен и работает
- [ ] Яндекс Метрика установлена и работает
- [ ] Microsoft Clarity настроен (опционально)
- [ ] Все события отслеживаются корректно
- [ ] Цели настроены в обоих сервисах

### Search Engines
- [ ] Google Search Console подтверждён
- [ ] Яндекс Вебмастер подтверждён
- [ ] Sitemap отправлен в оба сервиса
- [ ] Нет ошибок индексации
- [ ] hreflang теги корректны

### Technical
- [ ] Environment variables настроены
- [ ] Structured data валидируется
- [ ] Lighthouse SEO score 100/100
- [ ] Core Web Vitals в зелёной зоне

### Legal
- [ ] Cookie consent баннер работает
- [ ] Privacy Policy создана
- [ ] GDPR compliance проверен

---

**Дата создания:** 2025-02-25
**Версия:** 1.0
**Статус:** ✅ Готово к использованию
