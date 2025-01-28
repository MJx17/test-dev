import React, { useState } from 'react';
import { useExchangeRateStore } from '../store/store';
import Select from 'react-select';
import { countryOptions } from '../utils/CurrencyOptions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Flag from '../utils/Flag';
import { CreateButton } from "../components/ButtonGroup";
import { toast } from 'react-toastify';
import { NewExchangeRate } from '../ServicesTypes';

const CurrencyForm: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);

  const { addExchangeRate, currency, setCurrency, selling_rate, setSellingRate, value, setValue} = useExchangeRateStore();

  const handleCurrencyChange = (selectedOption: { value: string } | null) => {
    setCurrency(selectedOption?.value || null); // Store only the currency string (value)
  };
  

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setValue(value); // setValue expects a number
    }
  };
  
  const handleSellingRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setSellingRate(value); // setSellingRate expects a number
    }
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!currency || !value || !selling_rate) {
      toast.error('All fields are required.');
      return;
    }
  
    const exchangeRateData: NewExchangeRate = {
      currency,
      value: Number(value),
      selling_rate: Number(selling_rate),
      countryCode: countryOptions.find(option => option.currency === currency)?.countryCode || '',
    };
  
    try {
      await addExchangeRate(exchangeRateData); // Pass NewExchangeRate
      toast.success('Exchange rate added successfully!');
      handleClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to add exchange rate. Please try again.');
    }
  };
  
  

  const resetForm = () => {
    setCurrency('');
    setValue(0);
    setSellingRate(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      zIndex: 10,
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000,
      maxHeight: '200px',
    }),
  };

  return (
    <div>
      <CreateButton label='' icon='' type='create' onClick={handleClickOpen}>
       Create
      </CreateButton>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Currency Form</DialogTitle>
        <DialogContent
          sx={{ padding: '20px', gap: '20px' }}
          style={{ overflowY: 'auto', maxHeight: '500px' }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ width: '100%', marginBottom: '16px' }}>
            <Select
              options={countryOptions.map(option => ({
                value: option.currency, // Store only the currency code as value
                label: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Flag countryCode={option.countryCode} />
                    {option.currency}
                  </div>
                ),
              }))}
              value={
                currency
                  ? { value: currency, label: (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Flag countryCode={countryOptions.find(option => option.currency === currency)?.countryCode || ''} />
                        {currency}
                      </div>
                    )}
                  : null
              }
              onChange={handleCurrencyChange} // Only pass the `value` to `setCurrency`
              placeholder="Select a currency"
              styles={customSelectStyles}
              aria-label="Currency Selector"
            />

            </Box>

            <FormControl sx={{ width: '100%' }} required>
              <TextField
                label="Currency Value"
                type="number"
                value={value}
                onChange={handleValueChange}
                placeholder="Enter value"
                fullWidth
                InputProps={{
                  startAdornment: currency && (
                    <InputAdornment position="start">
                      {countryOptions.find(option => option.currency === currency)?.countryCode || ''}
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: '16px' }}
                aria-label="Currency Value"
              />
            </FormControl>

            <FormControl sx={{ width: '100%' }} required>
              <TextField
                label="Selling Rate"
                type="number"
                value={selling_rate}
                onChange={handleSellingRateChange}
                placeholder="Enter selling rate"
                fullWidth
                sx={{ marginBottom: '20px' }}
                aria-label="Selling Rate"
              />
            </FormControl>

            <DialogActions sx={{ width: '100%' }}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrencyForm;
