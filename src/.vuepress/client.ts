import { defineClientConfig } from "vuepress/client";
import { onMounted, onUnmounted } from "vue";

export default defineClientConfig({
  setup() {
    onMounted(() => {
      const handleScroll = () => {
        if (window.scrollY === 0) {
          document.documentElement.classList.add("at-top");
        } else {
          document.documentElement.classList.remove("at-top");
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      });
    });
  },
});
