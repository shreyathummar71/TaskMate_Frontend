import walmartLogo from '../assets/images/patners/walmart.png';
import nestLogo from '../assets/images/patners/nest.png';
import equityResidentialLogo from '../assets/images/patners/equity.png';
import leesaLogo from '../assets/images/patners/leesa.png';
import wayfairLogo from '../assets/images/patners/wayfair.png';
import googleHomeLogo from '../assets/images/patners/googlehome.png';

const Partners = () => {
  return (
    <div className="py-6 px-10">
      <h2 className="text-left text-2xl text-primary font-primary mb-8">Our Partners</h2>
      <div className="grid grid-cols-3 gap-y-10 gap-x-12">
        <img src={equityResidentialLogo} alt="Equity Residential" className="h-12 w-auto" />
        <img src={nestLogo} alt="Nest" className="h-12 w-auto" />
        <img src={walmartLogo} alt="Walmart" className="h-12 w-auto" />
        <img src={wayfairLogo} alt="Wayfair" className="h-14 w-auto " />
        <img src={leesaLogo} alt="Leesa" className="h-12 w-auto" />
        <img src={googleHomeLogo} alt="Google Home" className="h-12 w-auto" />
      </div>
    </div>
  );
};

export default Partners;
