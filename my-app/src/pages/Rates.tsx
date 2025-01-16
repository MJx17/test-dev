// import React, { useState } from 'react';
// import Select from 'react-select';
// import { countryOptions } from '../utils/CurrencyOptions';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import InputAdornment from '@mui/material/InputAdornment';
// import Box from '@mui/material/Box';
// import Flag from '../utils/Flag';

// interface OptionType {
//   value: string;
//   label: JSX.Element;
// }

// interface Rate {
//   currency: string;
//   exchangeRate: string;
//   value: string;
//   countryCode: string;
// }



// const CurrencyForm: React.FC = () => {
//   const [currency, setCurrency] = useState<OptionType | null>(null);
//   const [value, setValue] = useState<string>('');
//   const [exchangeRate, setExchangeRate] = useState<string>('');
//   const [open, setOpen] = useState<boolean>(false);
//   const [rateList, setRateList] = useState<Rate[]>([]);

//   const getCurrencySymbol = (currencyCode: string): string => {
//     const currencyOption = countryOptions.find(option => option.currency === currencyCode);
//     return currencyOption ? currencyOption.symbol : '';
//   };

//   const handleCurrencyChange = (selectedOption: OptionType | null) => {
//     setCurrency(selectedOption);
//   };

//   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!isNaN(Number(event.target.value))) {
//       setValue(event.target.value);
//     }
//   };

//   const handleExchangeRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!isNaN(Number(event.target.value))) {
//       setExchangeRate(event.target.value);
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
  
//     if (!currency || !value || !exchangeRate) {
//       alert('All fields are required. Please fill them out.');
//       return;
//     }
  
//     if (isNaN(Number(value)) || isNaN(Number(exchangeRate))) {
//       alert('Please enter valid numeric values for value and exchange rate.');
//       return;
//     }
  
//     const newRate: Rate = {
//       currency: currency.value,
//       value,
//       exchangeRate,
//       countryCode: countryOptions.find(option => option.currency === currency.value)?.countryCode || '',
//     };
  
//     setRateList([...rateList, newRate]);
//     handleClose();
//     resetForm();
//   };
  

//   const resetForm = () => {
//     setCurrency(null);
//     setValue('');
//     setExchangeRate('');
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDeleteRate = (index: number) => {
//     const updatedRateList = rateList.filter((_, i) => i !== index);
//     setRateList(updatedRateList);
//   };

//   const customSelectStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       zIndex: 10,
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       zIndex: 1000,
//       maxHeight: '200px',
//     }),
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Open Currency Form
//       </Button>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Currency Form</DialogTitle>
//         <DialogContent
//           sx={{ padding: '20px', gap: '20px' }}
//           style={{ overflowY: 'auto', maxHeight: '500px' }}
//         >
//           <form onSubmit={handleSubmit}>
//             <Box sx={{ width: '100%', marginBottom: '16px' }}>
//               <Select
//                 options={countryOptions.map(option => ({
//                   value: option.currency,
//                   label: (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <Flag countryCode={option.countryCode} />
//                       {option.currency}
//                     </div>
//                   ),
//                 }))}
//                 value={currency}
//                 onChange={handleCurrencyChange}
//                 placeholder="Select a currency"
//                 styles={customSelectStyles}
//                 aria-label="Currency Selector"
//               />
//             </Box>

//             <FormControl sx={{ width: '100%' }} required>
//               <TextField
//                 label="Currency Value"
//                 type="number"
//                 value={value}
//                 onChange={handleValueChange}
//                 placeholder="Enter value"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: currency && (
//                     <InputAdornment position="start">
//                       {getCurrencySymbol(currency.value)}
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ marginBottom: '16px' }}
//                 aria-label="Currency Value"
//               />
//             </FormControl>

//             <FormControl sx={{ width: '100%' }} required>
//               <TextField
//                 label="Exchange Rate"
//                 type="number"
//                 value={exchangeRate}
//                 onChange={handleExchangeRateChange}
//                 placeholder="Enter exchange rate"
//                 fullWidth
//                 sx={{ marginBottom: '20px' }}
//                 aria-label="Exchange Rate"
//               />
//             </FormControl>

//             <DialogActions sx={{ width: '100%' }}>
//               <Button onClick={handleClose} color="secondary">
//                 Cancel
//               </Button>
//               <Button type="submit" color="primary">
//                 Save
//               </Button>
//             </DialogActions>
//           </form>

//           <Box sx={{ marginTop: '20px' }}>
//   <h4>Rate List</h4>
//   <ul>
//     {rateList.map((rate, index) => (
//       <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//           {rate.countryCode ? (
//             <Flag countryCode={rate.countryCode.toLowerCase()} />
//           ) : (
//             <span style={{ width: '30px', height: '20px', backgroundColor: '#ddd' }}></span> // Placeholder if no flag
//           )}
//           <span style={{ marginLeft: '8px', flex: 1 }}>{rate.currency}</span>
//         </div>
//         <Button
//           color="secondary"
//           onClick={() => handleDeleteRate(index)}
//           sx={{ marginLeft: '10px' }}
//         >
//           Delete
//         </Button>
//       </li>
//     ))}
//   </ul>
// </Box>

//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CurrencyForm;
