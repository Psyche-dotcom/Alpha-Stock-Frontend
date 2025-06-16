import Company from "@/parts/user/company";

export default function CompanyPage({
  params,
}: {
  params: { symbol: string };
}) {
  return (
    <>
      <Company symbol={params.symbol} />
    </>
  );
}
