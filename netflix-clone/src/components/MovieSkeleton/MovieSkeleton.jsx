import Skeleton from "react-loading-skeleton";

function MovieSkeleton() {
  return (
    <div className="min-w-[140px] md:min-w-[180px] lg:min-w-[220px]">
      <Skeleton
        height={270}
        borderRadius={8}
      />
    </div>
  );
}

export default MovieSkeleton;