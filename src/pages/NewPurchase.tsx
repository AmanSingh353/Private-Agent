import PurchaseRequestForm from "@/components/private-agent/PurchaseRequestForm";
import ApprovalResultState from "@/components/private-agent/ApprovalResultState";
import { usePrivateAgentState } from "@/state/PrivateAgentState";

const NewPurchase = () => {
  const {
    categories,
    purchaseRequest,
    setPurchaseMerchant,
    setPurchaseAmount,
    setPurchaseCategory,
    verificationSteps,
    verificationOutcomes,
    checkingPurchase,
    currentVerificationStep,
    purchaseDone,
    purchaseDecision,
    startPurchaseVerification,
  } = usePrivateAgentState();

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Submit Purchase Request 🔒</h1>
        <p className="text-muted-foreground">Requests are checked against confidential rules; only minimal approval outcomes are revealed.</p>
      </div>

      <div className="card-glass p-6 space-y-6">
        <PurchaseRequestForm
          categories={categories}
          merchant={purchaseRequest.merchant}
          amount={String(purchaseRequest.amount)}
          categoryId={purchaseRequest.categoryId}
          onMerchantChange={setPurchaseMerchant}
          onAmountChange={setPurchaseAmount}
          onCategoryChange={setPurchaseCategory}
          checking={checkingPurchase}
          done={purchaseDone}
          currentStep={currentVerificationStep}
          steps={verificationSteps}
          outcomes={verificationOutcomes}
          onStartCheck={startPurchaseVerification}
        />
        <ApprovalResultState
          visible={purchaseDone}
          status={purchaseDecision.status}
          output={purchaseDecision.output}
        />
      </div>
    </div>
  );
};

export default NewPurchase;
