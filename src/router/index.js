import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
            path: "/:pathMatch(.*)*", // Khớp với bất kỳ đường dẫn nào không tìm thấy
            name: "notfound",
            component: NotFound, // Thành phần hiển thị trang Not Found
          },
];
const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
});
export default router;