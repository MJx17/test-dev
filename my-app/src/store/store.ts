import { create } from 'zustand';
import { ExchangeRate, NewExchangeRate } from '../ServicesTypes';
import { restoreExchangeRate, hardDeleteExchangeRate } from '../services/rateServices';
import { 
  getExchangeRates, 
  createExchangeRate, 
  updateExchangeRate, 
  deleteExchangeRate, 
  getExchangeRateById, 
  getAllExchangeRates
} from '../services/rateServices';

interface ExchangeRateStore {
  exchangeRates: ExchangeRate[];
  loading: boolean;
  error: string | null;
  currency: string | null;
  value: number;
  selling_rate: number;
  countryCode: string;
  setCurrency: (currency: string | null) => void;
  setValue: (value: number) => void;
  setSellingRate: (selling_rate: number) => void;
  setCountryCode: (countryCode: string) => void;
  setExchangeRates: (exchangeRates: ExchangeRate[]) => void;
  addExchangeRate: (exchangeRateData: NewExchangeRate) => Promise<void>;
  updateExchangeRate: (id: string, exchangeRateData: Partial<ExchangeRate>) => Promise<void>;
  removeExchangeRate: (id: string) => Promise<void>;
  restoreRate: (id: string) => Promise<void>;
  hardDeleteRate: (id: string) => Promise<void>;
  fetchExchangeRates: () => Promise<void>;
  fetcAllExchangeRates: () => Promise<void>;
  fetchExchangeRateById: (id: string) => Promise<ExchangeRate | undefined>;
  resetForm: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExchangeRateStore = create<ExchangeRateStore>((set, get) => ({
  exchangeRates: [],
  loading: false,
  error: null,
  currency: '',
  value: 0,
  selling_rate: 0,
  countryCode: '',

  setCurrency: (currency) => set({ currency }),
  setValue: (value) => set({ value }),
  setSellingRate: (selling_rate) => set({ selling_rate }),
  setCountryCode: (countryCode) => set({ countryCode }),

  setExchangeRates: (exchangeRates) => set({ exchangeRates }),

  addExchangeRate: async (exchangeRateData: NewExchangeRate) => {
    const { resetForm, setError, setLoading, fetchExchangeRates } = get();
    setLoading(true);
    setError(null);

    try {
      if (!exchangeRateData.currency || !exchangeRateData.value || !exchangeRateData.selling_rate) {
        throw new Error('Missing required fields.');
      }

      const newExchangeRate = await createExchangeRate(exchangeRateData);
      set((state) => ({ exchangeRates: [...state.exchangeRates, newExchangeRate] }));

      resetForm();
      await fetchExchangeRates();
    } catch (error) {
      console.error('Error adding exchange rate:', error);
      setError(error instanceof Error ? error.message : 'Failed to add exchange rate.');
    } finally {
      setLoading(false);
    }
  },

  updateExchangeRate: async (id: string, exchangeRateData: Partial<ExchangeRate>) => {
    const { setError, setLoading } = get();
    setLoading(true);
    setError(null);

    try {
      const updatedExchangeRate = await updateExchangeRate(id, exchangeRateData);
      set((state) => ({
        exchangeRates: state.exchangeRates.map((rate) =>
          rate._id === id ? { ...rate, ...updatedExchangeRate } : rate
        ),
      }));
    } catch (error) {
      console.error('Error updating exchange rate:', error);
      setError(error instanceof Error ? error.message : 'Failed to update exchange rate.');
    } finally {
      setLoading(false);
    }
  },

  removeExchangeRate: async (id: string) => {
    const { setError, setLoading } = get();
    setLoading(true);
    setError(null);

    try {
      await deleteExchangeRate(id);
      set((state) => ({
        exchangeRates: state.exchangeRates.filter((rate) => rate._id !== id),
      }));
    } catch (error) {
      console.error('Error removing exchange rate:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove exchange rate.');
    } finally {
      setLoading(false);
    }
  },

  fetchExchangeRates: async () => {
    set({ loading: true, error: null });

    try {
      const rates = await getExchangeRates();
      set({ exchangeRates: rates, loading: false });
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      set({ error: 'Error fetching exchange rates', loading: false });
    }
  },

  fetcAllExchangeRates: async () => {
    set({ loading: true, error: null });

    try {
      const rates = await getAllExchangeRates();
      set({ exchangeRates: rates, loading: false });
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      set({ error: 'Error fetching exchange rates', loading: false });
    }
  },

  restoreRate: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const restoredRate = await restoreExchangeRate(id);
      set((state) => ({
        exchangeRates: state.exchangeRates.map((rate) =>
          rate._id === id ? restoredRate : rate
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Error restoring exchange rate:', error);
      set({ error: 'Failed to restore exchange rate.', loading: false });
    }
  },
  hardDeleteRate: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await hardDeleteExchangeRate(id);
      set((state) => ({
        exchangeRates: state.exchangeRates.filter((rate) => rate._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Error permanently deleting exchange rate:', error);
      set({ error: 'Failed to delete exchange rate.', loading: false });
    }
  },


  fetchExchangeRateById: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const rate = await getExchangeRateById(id);
      set((state) => ({
        exchangeRates: [...state.exchangeRates.filter((r) => r._id !== id), rate],
        loading: false,
      }));
      return rate;
    } catch (error) {
      console.error('Error fetching exchange rate by ID:', error);
      set({ error: 'Error fetching exchange rate by ID', loading: false });
      return undefined;
    }
  },

  resetForm: () => set({ currency: '', value: 0, selling_rate: 0, countryCode: '' }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
