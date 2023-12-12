type AdvertType = 'service' | 'product';

const AdvetTypeValues = () => {
  const values: string[] = [];
  values.push('service');
  values.push('product');

  return values;
};

export { AdvertType, AdvetTypeValues };
