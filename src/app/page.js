import Image from "next/image";
import Slides from "./components/slides/Slides";
import { AiOutlineLike } from "react-icons/ai";
import { GoSponsorTiers } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import img3 from"../../public/assets/image/bc3.jpg";
import img2 from"../../public/assets/image/bc2.jpg";
import img4 from"../../public/assets/image/bc4.jpg";
import img6 from"../../public/assets/image/bc6.jpg";
import img7 from"../../public/assets/image/bc7.jpg";
import img8 from"../../public/assets/image/bc8.jpg";
import Newsletters from "./components/newsletters/Newsletters";

export default function Home() {
  return (
    <div className="">
      <Slides />
      <section className=" flex flex-col md:flex-row md:container  md:mx-auto ">
      <div className="flex  flex-col mx-3 pt-6   md:space-x-6 space-y-2 md:flex-row md:space-y-0">
                <div className="flex  flex-col mx-3 pt-6   md:space-x-6 space-y-2 md:flex-row md:space-y-0">
                    <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                    <AiOutlineLike className="text-xl md:text-3xl text-red-600" />
                        <p className=" text-sm md:text-lg font-bold  ">  Des outils conviviaux   </p>
                        <p className=" text-sm md:text-lg  text-center">  Nos outils intuitifs facilitent la création de produits photo, que vous souhaitiez concevoir rapidement ou créer un chef-d'œuvre   </p>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                    <GoSponsorTiers  className="text-xl md:text-3xl text-blue-600"/>
                    <p className=" text-sm md:text-lg font-bold ">  Qualité durable</p>
                    <p className=" text-sm md:text-lg  text-center">  Nous utilisons uniquement des matériaux de haute qualité et traitons chaque produit avec le plus grand soin afin que vos souvenirs perdurent.</p>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                    <IoStarOutline  className="text-xl md:text-3xl text-green-600"/>
                    <p className=" text-sm md:text-lg font-bold ">Garantie de satisfaction     </p>
                    <p className="text-sm md:text-lg  text-center">  Nous voulons que vous n'ayez que des expériences positives avec nous. Dans le cas contraire, nous vous aiderons à trouver la meilleure solution.</p>
                    </div>
                </div>
        </div>
      </section>
       <section>   
            <div className="mt-16 grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  md:container  md:mx-auto ">
                <div className="flex flow-col bg-gray-100  ">
                    <div className=" relative bg-bc1 bg-no-repeat bg-cover bg-bottom  w-full h-64" >
                        <div className=" absolute top-8 right-0 flex flex-col   ">
                        <p className="text-white w-40  text-lg md:text-lg md:w-32 lg:w-48  text-center mt-12 ml-12">30% de remise sur les Livres  </p>
                         <button className="flex flex-wrap text-white text-sm ml-12 items-center mt-16 md:text-lg"> concevoir maintenant <SlArrowRight /> </button>
                        </div>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100  ">
                    <div className=" relative bg-bc9 bg-no-repeat bg-cover bg-bottom  w-full h-64" >
                        <div className=" absolute top-8 right-0   ">
                        <p className="text-white w-40  text-lg md:text-lg md:w-32 lg:w-48  text-center mt-12 ml-12">30% de remise sur les calendries  </p>
                         <button className="flex flex-wrap text-white text-sm ml-12 items-center mt-16 md:text-lg"> concevoir maintenant <SlArrowRight /> </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  md:container  md:mx-auto ">
                <div className="flex flow-col bg-gray-100 ">
                    <div className=" drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img2} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Peintures murales </p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">7.500 Dt </p>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100 ">
                    <div className="card drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img3} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Tableaux muraux avec cadres</p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">70 Dt </p>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100 ">
                    <div className="card  drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img4} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Creer un livre photo</p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">48 Dt </p>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100 ">
                    <div className="card drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img6} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Tirage photo</p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">5 Dt </p>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100 ">
                    <div className="card  drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img7} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Gobelet imprimé</p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">15 Dt </p>
                    </div>
                </div>
                <div className="flex flow-col bg-gray-100 ">
                    <div className="card  drop-shadow-2xl">
                    <Image  className="h-64 md:h-72 rounded-md" src={img8} alt="News" />
                    <p className="font-bold text-lg py-5 text-gray-600 text-center ">Calendrie photo</p>
                        <p className="font-bold text-sm ml-2 text-gray-600">loin </p>
                        <p className="font-bold text-lg ml-2 text-orange-600">15 Dt </p>
                    </div>
                </div>
            </div>
        </section>
        <Newsletters />
    </div>
  );
}
