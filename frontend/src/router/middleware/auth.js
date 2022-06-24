import {adminRoleId, teacherRoleId} from "../../helper";

export default function authMiddleware ({ next, store }){
    const user = store.getters['auth/user']
    if(!store.getters['auth/loggedIn']){
        return next({
            name: 'Login'
        })
    }

    let routerName = 'Access'
    switch (user.roleId) {
        case adminRoleId: {
            routerName = 'AdminMain'
            break
        }
        case teacherRoleId: {
            routerName = 'TeacherIndex'
            break
        }
    }

    return next({
        name: routerName
    })
}