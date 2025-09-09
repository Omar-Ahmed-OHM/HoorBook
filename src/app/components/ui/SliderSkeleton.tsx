import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSkeleton = () => {
  return (
    <div className="relative bg-white">

      <div className="max-w-screen-xl mx-auto px-5 mt-[140px]">
        <Skeleton height={300} className="rounded-xl" />
      </div>

      <div className="flex overflow-x-auto px-6 py-6 gap-4 scrollbar-hide justify-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton circle width={80} height={80} />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>

      <SectionSkeleton title="الأكثر مبيعاً" count={4} />

      <SectionSkeleton title="عروض مميزة" count={4} />

      {[...Array(3)].map((_, i) => (
        <SectionSkeleton key={i} title={`قسم رقم ${i + 1}`} count={4} />
      ))}
    </div>
  );
};

export default HomeSkeleton;

const SectionSkeleton = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="w-full bg-white mt-6 relative shadow-sm rounded-xl px-6">
      <div className="flex justify-center items-center text-2xl mb-4">
        <h2 className="text-btn-color font-bold text-[26px] sm:text-[30px] tracking-tight">
          <Skeleton width={160} height={32} />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton height={200} className="rounded-xl" />
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={20} />
          </div>
        ))}
      </div>
    </div>
  );
};
