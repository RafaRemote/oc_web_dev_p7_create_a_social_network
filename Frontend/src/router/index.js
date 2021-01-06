import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Connexion",
        component: () => import("../views/Connexion"),
    },
    {
        path: "/Admin",
        name: "Admin",
        component: () => import("../views/Admin"),
    },
    {
        path: "/Compte",
        name: "Compte",
        component: () => import("../views/Compte"),
    },
    {
        path: "/Comment",
        name: "Comment",
        component: () => import("../views/Comment"),
    },
    {
        path: "/CommentsList",
        name: "CommentsList",
        component: () => import("../views/CommentsList"),
    },
    {
        path: "/create",
        name: "Create",
        component: () => import("../views/Create")
    },
    {
        path: "/CreateComment",
        name: "CreateComment",
        component: () => import("../views/CreateComment"),
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () => import("../views/Inscription")
    },
    {
        path: "/stream",
        name: "Stream",
        component: () => import("../views/Stream")
    },
    {
        path: "/UsersList",
        name: "UsersList",
        component: () => import("../views/UsersList")
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/inscription"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/")
    }
    next()
})

export default router