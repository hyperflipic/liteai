// 配置
const CONFIG = {
    STORAGE_KEYS: {
        LANG: 'lang',
        THEME: 'theme'
    }
};

// 创建应用
const app = Vue.createApp({
    setup() {
        const state = Vue.reactive({
            currentLang: localStorage.getItem(CONFIG.STORAGE_KEYS.LANG) || 
                (navigator.language.startsWith('zh') ? 'zh' : 'en'),
            isDarkTheme: localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) !== 'light',
            visibleCards: new Set()
        });

        // 主题切换
        const toggleTheme = () => {
            state.isDarkTheme = !state.isDarkTheme;
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.isDarkTheme ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', state.isDarkTheme ? 'dark' : 'light');
        };

        // 语言切换
        const toggleLang = () => {
            state.currentLang = state.currentLang === 'zh' ? 'en' : 'zh';
            localStorage.setItem(CONFIG.STORAGE_KEYS.LANG, state.currentLang);
        };

        // 监听卡片可见性
        Vue.onMounted(() => {
            const observer = new IntersectionObserver(
                entries => entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        state.visibleCards.add(entry.target.dataset.index);
                    }
                }),
                { threshold: 0.1 }
            );

            document.querySelectorAll('.card').forEach(card => observer.observe(card));

            // 注册 Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(console.error);
            }
        });

        return {
            ...Vue.toRefs(state),
            toggleTheme,
            toggleLang
        };
    }
});

app.mount('#app');
