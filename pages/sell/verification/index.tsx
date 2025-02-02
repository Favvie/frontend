import {
  ProgressTracker,
  ValidID,
  VendorsPolicy,
  VerifyBankAccount,
  VerifyBVN,
} from "@/components/verification";
import VerificationLayout from "@/layouts/seller/VerificationLayout";
import { RootState } from "@/store/rootReducer";
import { sellerVerification } from "@/store/seller/seller.action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Step, StepComponentProps } from "react-step-builder";
import { useRouter } from "next/router";
import withAuth from "@/hooks/withAuth";

function index(props: StepComponentProps) {
  const dispatch = useDispatch();
  const { user, seller } = useSelector((state: RootState) => state);
  const router = useRouter();
  // find last element in the array

  const submitDetails = (details: any) => {
    console.log(details);
    //  not sure about the function to send to the backend
    //dispatch(sellerVerification(details, user.token))
  };

  useEffect(() => {
    // a verified seller shouldn't be able to access this page
    if (seller.seller.sellerIsVerified) {
      router.push("/seller/profile");
    }
  }, []);

  interface configProps {
    navigation: {
      component: (props: any) => JSX.Element;
      location: "before" | "after";
    };
  }
  const config: configProps = {
    navigation: {
      component: ProgressTracker, // a React component with special props provided automatically
      location: "before", // or after
    },
  };

  return (
    <VerificationLayout>
      <Steps config={config}>
        <Step title="Vendor's Policy" component={VendorsPolicy} />
        <Step title="Upload a Valid ID" component={ValidID} />
        <Step title="Verify BVN" component={VerifyBVN} />
        <Step
          title="Verify Bank Account"
          component={VerifyBankAccount}
          submit={submitDetails}
        />
      </Steps>
    </VerificationLayout>
  );
}

export default withAuth(index);
