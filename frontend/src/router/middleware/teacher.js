import {teacherRoleId} from "../../helper";

export default function teacherMiddleware ({ next, store }){
    if(!store.getters['auth/loggedIn']){
        return next({
            name: 'Login'
        })
    }

    const roleId = store.getters['auth/user'].roleId
    if (roleId !== teacherRoleId) {
        return next({
            path: '/access'
        })
    }
    return next();
}