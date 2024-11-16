import Downloadspace from './downloadspace';
import Infospace from './infospace';

export default function DownloadImage() {
  const getPrice =(price)=>{
    return price
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center items-center md:space-x-5 space-y-8 md:space-y-0 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[70%]">
        <Downloadspace />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[30%]">
        <Infospace />
      </div>
    </div>
  );
}