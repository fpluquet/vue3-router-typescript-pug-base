
import { computed } from 'vue';
// import { useStore } from 'vuex';
import { PERSONA } from '../utils/constants'

export const calculateGlobalPercent = (store: any) => {
    const quantitySections = computed(() =>
        store.state.account.type === PERSONA ? 2 : 3,
    );
    const availableSections = computed(() => store.state.sections);

    const sumPercentSections = availableSections.value.reduce((accumulator: number, current: any) => accumulator + current.percentCompleted, 0)

    return Math.round(((sumPercentSections) / quantitySections.value));
};

export const useGlobalPercentage = (store: any) => {
    // const store = useStore();
    return calculateGlobalPercent(store);
};
