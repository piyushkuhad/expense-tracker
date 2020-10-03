export const revenueCategory = [
  { value: 'food', label: 'Food' },
  {
    label: 'Shopping',
    options: [
      {
        label: 'Clothes',
        value: 'clothes',
        parent: 'Shopping',
      },
      {
        label: 'Shoes',
        value: 'shoes',
        parent: 'Shopping',
      },
    ],
  },
  { value: 'bills', label: 'Bills' },
  { value: 'transport', label: 'Transport' },
  { value: 'car', label: 'Car' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
];
