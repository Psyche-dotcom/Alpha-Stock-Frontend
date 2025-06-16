interface iProps {
  item: any;
}

const ShowAnalysisHistory: React.FC<iProps> = ({ item }) => {
  return (
    <div className="h-fit text-base">
      <p className="text-end mb-1">{item?.date}</p>
      <div className="flex w-full gap-5 mb-1">
        <p className=" font-bold">{item?.symbol}</p>
        <p className="me-auto">{item?.company}</p>
        <p className="">{item?.time}PM</p>
      </div>
      <div className="flex w-full gap-5">
        <p className="">Years of Analysis: {item?.years}</p>
        <p className="">Assumption Entried: {item?.entries}</p>
      </div>
    </div>
  );
};

export default ShowAnalysisHistory;
