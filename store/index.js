import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        currentLang: localStorage.getItem('lang') || 
            (navigator.language.startsWith('zh') ? 'zh' : 'en'),
        isDarkTheme: localStorage.getItem('theme') !== 'light',
        visibleCards: new Set(),
        loading: false,
        error: null
    }),

    actions: {
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', 
                this.isDarkTheme ? 'dark' : 'light');
        },

        toggleLang() {
            this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
            localStorage.setItem('lang', this.currentLang);
        },

        setVisibleCard(index) {
            this.visibleCards.add(index);
        },

        setError(error) {
            this.error = error;
            console.error('Error:', error);
        }
    }
});
