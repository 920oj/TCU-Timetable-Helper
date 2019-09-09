export const state = () => ({
    acquired_units: null,
    is_acquired_skipped: false,
    plan_units: null
})

export const mutations = {
    setAcquiredUnits(state,units_data) {
        state.acquired_units = units_data;
    },
    notSetAcquiredUnits(state, t) {
        state.is_acquired_skipped = t;
    },
    setPlanUnits(state,units_data) {
        state.plan_units = units_data;
    }

}