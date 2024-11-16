import Image from "next/image";
import Slides from "../app/_components/slides/Slides";
import { AiOutlineLike } from "react-icons/ai";
import { GoSponsorTiers } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import img2 from "../../public/assets/image/bc2.jpg";
import img3 from "../../public/assets/image/bc3.jpg";
import img4 from "../../public/assets/image/bc4.jpg";
import img6 from "../../public/assets/image/bc6.jpg";
import img7 from "../../public/assets/image/bc7.jpg";
import img8 from "../../public/assets/image/bc8.jpg";
import Newsletters from "../app/_components/newsletters/Newsletters";
import img from "../../public/assets/image/slide2.png";
import Link from "next/link";

function PromoCard({ bgClass, text, href }) {
  return (
    <div className="flex bg-gray-100">
      <div
        className={`relative ${bgClass} bg-no-repeat bg-cover bg-bottom w-full h-64 transform transition-transform duration-300 hover:scale-105 hover:opacity-90`}
      >
        <div className="absolute top-8 right-0 flex flex-col">
          <p className="text-white w-40 text-lg md:w-32 lg:w-48 text-center mt-12 ml-12">
            {text}
          </p>
          <Link href={href} passHref>
            <button className="flex text-white text-sm ml-12 items-center mt-16 md:text-lg">
              Concevoir maintenant <SlArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ href, imgSrc, title, price }) {
  return (
    <Link href={href}>
      <div className="flex bg-gray-100">
        <div className="card drop-shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <Image className="h-64 md:h-72 rounded-md" src={imgSrc} alt={title} />
          <p className="font-bold text-lg py-5 text-gray-600 text-center">{title}</p>
          <p className="font-bold text-sm ml-2 text-gray-600">Loin</p>
          <p className="font-bold text-lg ml-2 text-orange-600">{price}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const promos = [
    { bgClass: "bg-bc1", text: "30% de remise sur les Livres", href: "/creer-un-livre-photo" },
    { bgClass: "bg-bc9", text: "30% de remise sur les calendriers", href: "/calendrier-photos" },
  ];

  const products = [
    { href: "/peinture-murales", imgSrc: img2, title: "Peintures murales", price: "7.500 Dt" },
    { href: "/tableaux-muraux-avec-cadres", imgSrc: img3, title: "Tableaux muraux avec cadres", price: "70 Dt" },
    { href: "/creer-un-livre-photo", imgSrc: img4, title: "Créer un livre photo", price: "48 Dt" },
    { href: "/tirages-photo", imgSrc: img6, title: "Tirage photo", price: "5 Dt" },
    { href: "/cadeaux-photos/Gobelet%20imprimé", imgSrc: img7, title: "Mug personnalisé", price: "15 Dt" },
    { href: "/calendrier-photos", imgSrc: img8, title: "Calendrier photo", price: "15 Dt" },
  ];

  return (
    <div>
      <Slides setimage={img} />
      
      <section className="flex flex-col md:flex-row md:container md:mx-auto">
        <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
          {[ 
            {
              Icon: AiOutlineLike,
              colorClass: "text-red-600",
              title: "Des outils conviviaux",
              description:
                "Nos outils intuitifs facilitent la création de produits photo, que vous souhaitiez concevoir rapidement ou créer un chef-d'œuvre.",
            },
            {
              Icon: GoSponsorTiers,
              colorClass: "text-blue-600",
              title: "Qualité durable",
              description:
                "Nous utilisons uniquement des matériaux de haute qualité et traitons chaque produit avec le plus grand soin afin que vos souvenirs perdurent.",
            },
            {
              Icon: IoStarOutline,
              colorClass: "text-green-600",
              title: "Garantie de satisfaction",
              description:
                "Nous voulons que vous n'ayez que des expériences positives avec nous. Dans le cas contraire, nous vous aiderons à trouver la meilleure solution.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center"
            >
              <div className="icon-animation">
                <feature.Icon className={`text-xl md:text-3xl ${feature.colorClass}`} />
              </div>
              <p className="text-sm md:text-lg font-bold">{feature.title}</p>
              <p className="text-sm md:text-lg text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 md:container md:mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {promos.map((promo, index) => (
    <PromoCard
      key={index}
      bgClass={promo.bgClass}
      text={promo.text}
      href={promo.href}
    />
  ))}
</div>

        {/* Product Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out"
    >
      <Link href={product.href}>
        <div className="relative overflow-hidden">
          <Image
            className="w-full h-56 object-cover rounded-t-lg"
            src={product.imgSrc}
            alt={product.title}
          />
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800 truncate">{product.title}</p>
          <p className="text-sm text-gray-500 mt-2">{product.price}</p>
          <div className="mt-4">
            <button
              className="w-full px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-orange-700 transition duration-200"
            >
              Voir le produit
            </button>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>
      </section>

      {/* Newsletter Section */}
      {/* <Newsletters /> */}
    </div>
  );
}