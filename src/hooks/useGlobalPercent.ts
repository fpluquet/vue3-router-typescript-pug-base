
import { useStore } from 'vuex';
import { computed } from 'vue';
import { PERSONA } from '../utils/constants'


export const useGlobalPercentaje = (percentCompleted: number) => {
    const store = useStore();
    return calculateGlobalPercent(store, percentCompleted);
};

export const calculateGlobalPercent = (store: any, percentCompleted: number) => {
    const quantitySections = computed(() =>
        store.state.account.type === PERSONA ? 2 : 3,
    );

    const globalPercentage = Math.round(
        (store.state.globalPercentage + percentCompleted) /
        quantitySections.value,
    );
    return globalPercentage;
};