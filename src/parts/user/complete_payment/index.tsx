import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const PaymentStatusScreen: React.FC = () => {
  const isSuccess = true;

  return (
    <div className="w-full h-[calc(100vh-83px)] flex justify-center items-center">
      <div className="shadow-lg w-full max-w-[380px] p-8 text-center bg-white border-2 border-gray-300 rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          {isSuccess ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500" />
          )}
        </div>
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-gray-800 text-center mb-4">
          {isSuccess ? "Payment Successfully made!" : "Payment Failed!"}
        </p>
        <p className="text-lg text-sm sm:text-base text-gray-600 mb-10 text-center">
          {isSuccess
            ? "Your payment was processed successfully. You can now enjoy the benefits!"
            : "Unfortunately, the payment could not be processed. Please try again."}
        </p>
        <Button
          variant={"secondary"}
          className="font-medium px-3 py-5 w-fit-content"
        >
          <Link passHref href={ROUTES.USER.HOME}>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentStatusScreen;
