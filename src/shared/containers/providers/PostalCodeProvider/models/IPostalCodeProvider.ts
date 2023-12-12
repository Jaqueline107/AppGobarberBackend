interface IPostalCodeProvider {
  getFullAddres(postalCode: string): Promise<string | void>;
}

export default IPostalCodeProvider;
