"use client";

import PlanCard from "@/components/card/plan-card";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import AdminStockAnalyser from "./stock-analyzer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ButtonIcon } from "@/components/button/button-icon";
import { useEffect, useState } from "react";
import { EditPlanIcon, ViewPlanIcon } from "@/utils/icons";
import AddStockPlan from "./add-stock-plan";
import {
  useGetSubscription,
  useGetSubscriptions,
} from "@/services/subscriptions";
import { ISubscription } from "@/types";
import EditStockPlan from "./edit-stock";

const StockPlans = () => {
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

  const handleSuccess = () => {
    refetchSubscriptions();
  };

  const renderItem = () => {
    switch (option) {
      case "create":
        return (
          <AddStockPlan setIsOpen={setIsOpen} handleSuccess={handleSuccess} />
        );
      case "edit":
        return (
          <EditStockPlan
            setIsOpen={setIsOpen}
            handleSuccess={handleSuccess}
            selectedPlan={selectedPlan}
          />
        );

      default:
        return (
          <AddStockPlan setIsOpen={setIsOpen} handleSuccess={handleSuccess} />
        );
    }
  };

  return (
    <>
      <Box mt={8}>
        <div className="flex justify-end">
          <ButtonIcon
            text="Create Plan"
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
            onClick={() => {
              setIsOpen(true);
              setOption("create");
            }}
          />
        </div>
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
                  text="Edit Plan"
                  variant={"outline"}
                  border={"1px solid #291804"}
                  bg={""}
                  fontWeight={500}
                  color={"#291804"}
                  fontSize="18px"
                  p={"12px 16px"}
                  flexDirection="row-reverse"
                  icon={<EditPlanIcon />}
                  gap={2}
                  onClick={() => {
                    setIsOpen(true);
                    setOption("edit");
                  }}
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
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent
          className={`${"left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]"} bg-white p-[2rem] pt-[1.5rem]`}
        >
          {renderItem()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StockPlans;
