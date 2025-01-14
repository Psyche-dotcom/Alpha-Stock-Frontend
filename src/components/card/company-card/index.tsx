import { MetaIcon, StarIcon } from "@/utils/icons";
import { Box } from "@chakra-ui/react";

const CompanyCard: React.FC = () => {
  return (
    <Box
      className="py-[10px] px-[17px] bg-white rounded-[12px]"
      w={"fit-content"}
    >
      <div className="flex items-center gap-[10px] mb-2.5">
        <MetaIcon />
        <h2 className="text-[36px] font-bold text-[#111928]">NVIDIA Corp</h2>
      </div>
      <div className="gap-[5rem] flex items-center">
        <h6 className="font-normal text-xs text-[#6B7280]">
          NYSE American - Real Time Price Currency in USD
        </h6>
        <div className="flex item-center gap-2 font-medium text-sm text-[#291804]">
          <StarIcon />
          <p>Add To Watchlist</p>
        </div>
      </div>
    </Box>
  );
};

export default CompanyCard;
