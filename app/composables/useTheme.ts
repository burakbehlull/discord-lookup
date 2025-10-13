import { ref, watchEffect } from "vue";

const theme = ref("light");

if (process.client) {
  const saved = localStorage.getItem("theme");
  if (saved) theme.value = saved;
}

watchEffect(() => {
  if (process.client) {
    document.documentElement.setAttribute("data-theme", theme.value);
    localStorage.setItem("theme", theme.value);
  }
});

export function useTheme() {
  return {
    theme,
    toggleTheme: () => {
      theme.value = theme.value === "light" ? "dark" : "light";
    },
  };
}
