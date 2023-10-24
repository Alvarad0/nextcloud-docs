import DefaultTheme from "vitepress/theme";
import "./custom.css";
import mediumZoom from "medium-zoom";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";

export default {
    ...DefaultTheme,
    setup() {
        const route = useRoute()
        const initZoom = () => {
            new mediumZoom('[data-zoomable]', { margin: 15 })
        }
        onMounted(() => {
            initZoom()
        })
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        )
    }
}
