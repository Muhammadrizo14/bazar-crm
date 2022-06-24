import { createStore } from "vuex";
import auth from "./auth"
import {API_URL} from "../helper";
import axios from "axios";

export default createStore({
    state: {
        balance: null,
        total: {
            students: null,
            trialStudents: null,
            debtorStudents: null,
        }
    },
    mutations: {
        SET_BALANCE(state, balance) {
            state.balance = balance
        },
        INIT_ORGANIZATION(state, data) {
            state.total = data
        }
    },
    actions: {
        setBalance({commit}, payments) {
            const balance = {payments: payments, total: 0}
            payments.forEach(payment => {
                balance.total += payment.amount
            })
            commit("SET_BALANCE", balance)
        },
        initOrganization({commit}) {
            axios.get(API_URL).then(res => {
                commit("INIT_ORGANIZATION", res.data)
            })
        }
    },
    getters: {
        getBalance(state) {
            return state.balance
        },
        getOrganizationData(state) {
            return state.total
        }
    },
    modules: {
        auth
    }
})