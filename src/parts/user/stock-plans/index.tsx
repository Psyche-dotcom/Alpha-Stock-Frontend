"use client";

import PlanCard from "@/components/card/plan-card";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import AdminStockAnalyser from "./stock-analyzer";
import { ButtonIcon } from "@/components/button/button-icon";
import { useEffect, useState } from "react";
import { ViewPlanIcon } from "@/utils/icons";
import {
  useBuySubscription,
  useBuySubscriptionStripe,
  useGetSubscription,
  useGetSubscriptions,
} from "@/services/subscriptions";
import { ISubscription } from "@/types";
import PlanSkeleton from "@/components/card/skeleton/plan";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Plans = () => {
  const [selectOption, setSelectOption] = useState<string>("view");
  const [option, setOption] = useState<string>("create");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fetchSubscription, setFetchSubscription] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<ISubscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    getSubscriptionsData,
    getSubscriptionsIsLoading,
    setSubscriptionsFilter,
    refetchSubscriptions,
  } = useGetSubscriptions({ enabled: true });

  const [selectedId, setSelectedId] = useState<string>("");

  const {
    getSubscriptionData,
    setSubscriptionFilter,
    getSubscriptionIsLoading,
  } = useGetSubscription({ enabled: fetchSubscription });

  const {
    buySubscriptionData,
    buySubscriptionIsLoading,
    buySubscriptionPayload,
  } = useBuySubscription((res: any) => {
    window.location.href = res;
  });
  const {
    buySubscriptionDataStripe,
    buySubscriptionIsLoadingStripe,
    buySubscriptionPayloadStripe,
  } = useBuySubscriptionStripe((res: any) => {
    window.location.href = res;
  });

  useEffect(() => {
    if (selectedId) {
      setSubscriptionFilter({ id: selectedId });
      setFetchSubscription(true);
    }
  }, [selectedId]);

  const groupedByCategory = getSubscriptionData?.subscriptionFeatures?.reduce(
    (acc: any, feature: any) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    },
    {}
  );

  const handleMakePayment = () => {
    const data = { Id: selectedId };
    buySubscriptionPayload(data); // PayPal (existing method)
  };

  const handleStripePayment = () => {
    buySubscriptionPayloadStripe({ Id: selectedId });
  };

  return (
    <>
      <Box mt={8} className="max-w-[1440px] mx-auto">
        <div className="mt-10">
          <Box>
            <Grid
              gap={3}
              className="xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
            >
              {getSubscriptionsIsLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <PlanSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {getSubscriptionsData?.map(
                    (plan: ISubscription, index: number) => (
                      <GridItem
                        key={index}
                        className="w-full"
                        onClick={() => setSelectedPlan(plan || null)}
                      >
                        <PlanCard
                          plan={plan}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                        />
                      </GridItem>
                    )
                  )}
                </>
              )}
            </Grid>

            {selectedId && (
              <div className="my-5">
                <ButtonIcon
                  text="Make Payment"
                  variant={"outline"}
                  border={"1px solid #291804"}
                  bg={""}
                  fontWeight={500}
                  color={"#291804"}
                  fontSize="18px"
                  p={"12px 16px"}
                  flexDirection="row-reverse"
                  icon={<ViewPlanIcon />}
                  gap={2}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            )}

            {/* Modal for Payment Option */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent
                className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
                bg-white text-black p-8 shadow-lg rounded-lg
                w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
              >
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-black">
                    Choose Payment Method
                  </DialogTitle>
                  <DialogDescription className="text-gray-700 mt-2 text-base">
                    Please select your preferred payment provider.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      handleMakePayment();
                      setIsModalOpen(false);
                    }}
                    className="px-6 py-3 bg-[#291804] text-white font-medium rounded hover:bg-[#291804dc]"
                  >
                    Pay with PayPal
                  </button>
                  <button
                    onClick={() => {
                      handleStripePayment();
                      setIsModalOpen(false);
                    }}
                    className="px-6 py-3 bg-white text-[#291804] font-medium rounded border border-[#291804] hover:bg-[#29180434]"
                  >
                    Pay with Stripe
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {getSubscriptionData?.subscriptionFeatures && (
              <div className="mt-8">
                {Object.keys(groupedByCategory).map((category) => (
                  <AdminStockAnalyser
                    key={category}
                    selectOption={selectOption}
                    title={category}
                    datas={groupedByCategory[category]}
                  />
                ))}
              </div>
            )}
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Plans;
