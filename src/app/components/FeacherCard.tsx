import Image from "next/image";

const FeaturesCard = () => {
  return (
    <article className="firstcard h-[251px] w-[393px] transform rounded-lg border-2 border-[#0E1330] bg-card-color p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="cardimg mb-4">
        <Image
          src="/asset/images/icon2.svg"
          alt={`Feature icon`}
          width={50}
          height={50}
          unoptimized
        />
      </div>
      <div className="text">
        <h3 className="mb-2 text-2xl font-semibold text-white">
          User information
        </h3>
        <p className="bg-text-gradient bg-clip-text text-sm leading-relaxed text-transparent">
          Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere
          et amet arcu dictum ultricies convallis.
        </p>
      </div>
    </article>
  );
};

export default FeaturesCard;