import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CardSkeleton() {
  return (
    <div className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] p-4 border rounded-xl shadow-sm">
      <Skeleton height={160} className="mb-2" />
      <Skeleton height={20} width="80%" className="mb-1" />
      <Skeleton height={20} width="60%" />
    </div>
  );
}
