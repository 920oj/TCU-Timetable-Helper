export const state = () => ({
    acquired_units: null,
    is_acquired_skipped: false,
    plan_units: null,
    total_units: null
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
    },
    setTotalUnits(state,total_units) {
        state.total_units = total_units;
    }

}