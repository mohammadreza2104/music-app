import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full justify-center item-center flex-col">
    <img src={loader} alt="loader" className="w-32 h-31 object-contain" />
    <h1 className="font-bold text-white mt-2">{title || 'Loading...'}</h1>
  </div>
);

export default Loader;
