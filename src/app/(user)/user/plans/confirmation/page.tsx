"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Spinner,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, MessageCircleWarningIcon } from "lucide-react";
import { useConfirmSubscriptionsPayment } from "@/services/subscriptions";

const ConfirmPaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [fetchSubscription, setFetchSubscription] = useState<boolean>(false);
  const [status, setStatus] = useState<"loading" | "success" | "fail">(
    "loading"
  );
  const router = useRouter();
  const {
    confirmSubscriptionsData,
    confirmSubscriptionsFilter,
    confirmSubscriptionsIsLoading,
    setConfirmSubscriptionsFilter,
    confirmSubscriptionsError,
  } = useConfirmSubscriptionsPayment({ enabled: fetchSubscription });
  useEffect(() => {
    if (token) {
      setConfirmSubscriptionsFilter({ token: token });
      setFetchSubscription(true);
    }
  }, []);
  useEffect(() => {
    if (confirmSubscriptionsData) {
      console.log("response", confirmSubscriptionsData);
      if (confirmSubscriptionsData.statusCode == 200) {
        setStatus("success");
      }
    } else {
      setStatus("fail");
    }
  }, [confirmSubscriptionsData]);

  const handleBackToDashboard = () => {
    router.push("/user");
  };

  return (
    <Center minH="100vh" bg="gray.50" p={4}>
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        w="full"
        maxW="400px"
        textAlign="center"
      >
        {status === "loading" && (
          <VStack spacing={6}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text fontSize="lg" color="gray.700">
              Confirming Payment...
            </Text>
          </VStack>
        )}

        {status === "success" && (
          <VStack spacing={6} color="green.500">
            <Icon as={CheckCircleIcon} boxSize={16} />
            <Text fontSize="2xl" fontWeight="bold">
              Payment Successful 🎉
            </Text>
            <Button
              colorScheme="green"
              size="lg"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </VStack>
        )}

        {status === "fail" && (
          <VStack spacing={6} color="red.500">
            <Icon as={MessageCircleWarningIcon} boxSize={16} />
            <Text fontSize="2xl" fontWeight="bold">
              Payment Failed ❌
            </Text>
            <Button colorScheme="red" size="lg" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </VStack>
        )}
      </Box>
    </Center>
  );
};

export default ConfirmPaymentPage;
