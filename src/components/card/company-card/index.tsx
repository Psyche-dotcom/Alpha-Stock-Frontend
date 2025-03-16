import { ICompanyCard } from "@/interface/stock";
import { MetaIcon, StarIcon } from "@/utils/icons";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

const CompanyCard: React.FC<ICompanyCard> = ({
  urlCompanyImg,
  companyName,
  price,
}) => {
  return (
    <Box className="flex-1 py-[10px] px-[17px] bg-white rounded-[12px] mb-2 lg:mb-0">
      <div className="flex items-center gap-[10px] mb-2.5">
        <Image
          src={urlCompanyImg}
          alt="stock symbol"
          width={100}
          height={100}
        />
        <h2 className="xl:text-[36px] lg:text-[32px] text-[28px] font-bold text-[#111928]">
          {companyName}
        </h2>
      </div>
      <div className="justify-between md:flex items-center">
        <h6 className="font-normal text-xs  mb-2 md:mb-0 text-[#6B7280]">
          ${price} - Real Time Price Currency in USD
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
