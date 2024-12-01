export const ToolCard = {
    props: {
        category: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        t: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="card" 
             :data-index="index"
             :style="{'animation-delay': index * 50 + 'ms'}">
            <h2 class="text-xl font-semibold mb-4 text-center">{{ t[category].title }}</h2>
            <p class="text-gray-400 mb-4">{{ t[category].desc }}</p>
            <div class="space-y-2">
                <template v-for="tool in t[category].tools" :key="tool.name">
                    <a :href="tool.url" 
                       target="_blank"
                       rel="noopener"
                       @click="trackClick(tool.name)"
                       class="tool-link">
                        {{ tool.name }}
                    </a>
                </template>
            </div>
        </div>
    `,
    methods: {
        trackClick(toolName) {
            // 添加点击追踪
            if (window.gtag) {
                gtag('event', 'tool_click', {
                    'tool_name': toolName,
                    'category': this.category
                });
            }
        }
    }
};
