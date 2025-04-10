
import React, { createContext, useState, useContext, ReactNode } from "react";
import { FormStep, SupportFormData } from "../types/supportForm";
import { toast } from "@/hooks/use-toast";

interface SupportFormContextType {
  formData: SupportFormData;
  currentStep: FormStep;
  updateFormData: (data: Partial<SupportFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  stepProgress: number;
}

const defaultFormData: SupportFormData = {
  name: "",
  email: "",
  phone: "",
  deviceModel: "",
  serialNumber: "",
  firmwareVersion: "",
  problemType: "connectivity",
  issueDescription: "",
  errorMessage: "",
  stepsToReproduce: "",
  supportMethod: "email",
  urgencyLevel: "medium",
  attachments: [],
  privacyAgreed: false
};

const steps: FormStep[] = [
  "clientInfo",
  "deviceInfo",
  "issueDescription",
  "supportRequest",
  "fileUpload", 
  "review",
  "confirmation"
];

const SupportFormContext = createContext<SupportFormContextType | undefined>(undefined);

export const SupportFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<SupportFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>("clientInfo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentStepIndex = steps.indexOf(currentStep);
  const stepProgress = Math.round((currentStepIndex / (steps.length - 2)) * 100);

  const updateFormData = (data: Partial<SupportFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goToStep = (step: FormStep) => {
    if (steps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to a server here
      console.log("Form submitted:", formData);
      
      // Move to confirmation step
      setCurrentStep("confirmation");
      toast({
        title: "Success!",
        description: "Your support request has been submitted.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your support request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SupportFormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        isSubmitting,
        stepProgress
      }}
    >
      {children}
    </SupportFormContext.Provider>
  );
};

export const useSupportForm = () => {
  const context = useContext(SupportFormContext);
  if (context === undefined) {
    throw new Error("useSupportForm must be used within a SupportFormProvider");
  }
  return context;
};
