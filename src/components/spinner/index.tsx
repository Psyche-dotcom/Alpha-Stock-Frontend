import { Loader } from "lucide-react";

const SpinnerFill = () => {
  return (
    <div className="full-screen-spinner">
      <div className="spinner-overlay">
        <Loader className="spinner" />
        <p className="text-white text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
};

export default SpinnerFill;
