import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
        },
    {
            path: "/:pathMatch(.*)*", // Khớp với bất kỳ đường dẫn nào không tìm thấy
            name: "notfound",
            component: NotFound, // Thành phần hiển thị trang Not Found
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
        },
];
const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
});
export default router;