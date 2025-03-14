"use client";

import PlanCard from "@/components/card/plan-card";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import AdminStockAnalyser from "./stock-analyzer";
import { ButtonIcon } from "@/components/button/button-icon";
import { useEffect, useState } from "react";
import { ViewPlanIcon } from "@/utils/icons";
import {
  useBuySubscription,
  useGetSubscription,
  useGetSubscriptions,
} from "@/services/subscriptions";
import { ISubscription } from "@/types";

const Plans = () => {
  const [selectOption, setSelectOption] = useState<string>("view");
  const [option, setOption] = useState<string>("create");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fetchSubscription, setFetchSubscription] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<ISubscription | null>(null);
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
  useEffect(() => {
    if (selectedId) {
      setSubscriptionFilter({ id: selectedId });
      setFetchSubscription(true);
    }
  }, [selectedId]);

  const groupedByCategory =
    getSubscriptionData?.subscriptionFeatures &&
    getSubscriptionData?.subscriptionFeatures?.reduce(
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
    console.log(selectedId);
    const data = {
      Id: selectedId,
    };
    buySubscriptionPayload(data);
  };
  return (
    <>
      <Box mt={8}>
        <div className="mt-10">
          <Box>
            <Grid gap={3} gridTemplateColumns={"repeat(4, 1fr)"}>
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
                  onClick={handleMakePayment}
                />
              </div>
            )}
            {getSubscriptionData?.subscriptionFeatures && (
              <div>
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
