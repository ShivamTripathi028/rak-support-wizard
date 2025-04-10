
import React from "react";
import { useSupportForm } from "@/context/SupportFormContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Sparkles, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PROBLEM_TYPES } from "@/constants/supportForm";
import { ProblemType } from "@/types/supportForm";

const IssueDescriptionStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useSupportForm();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.issueDescription) {
      return;
    }
    nextStep();
  };

  const isFormValid = formData.issueDescription.trim().length > 0;

  return (
    <form onSubmit={handleNext} className="step-container">
      <Card className="border-support-light-blue shadow-md">
        <CardContent className="pt-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-support-blue">Issue Description</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" /> Problem Type <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.problemType}
                onValueChange={(value) => updateFormData({ problemType: value as ProblemType })}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {Object.entries(PROBLEM_TYPES).map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`problem-${value}`} />
                    <Label htmlFor={`problem-${value}`} className="cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issueDescription" className="flex items-center gap-2">
                <Info className="h-4 w-4" /> Detailed Issue Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="issueDescription"
                placeholder="Please describe the issue in detail..."
                value={formData.issueDescription}
                onChange={(e) => updateFormData({ issueDescription: e.target.value })}
                className="min-h-[100px] border-support-light-blue focus:border-support-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="errorMessage" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Error Message <span className="text-gray-400">(Optional)</span>
              </Label>
              <Textarea
                id="errorMessage"
                placeholder="Enter any error messages you're seeing..."
                value={formData.errorMessage}
                onChange={(e) => updateFormData({ errorMessage: e.target.value })}
                className="min-h-[80px] border-support-light-blue focus:border-support-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stepsToReproduce" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Steps to Reproduce <span className="text-gray-400">(Optional)</span>
              </Label>
              <Textarea
                id="stepsToReproduce"
                placeholder="Steps to reproduce the issue..."
                value={formData.stepsToReproduce}
                onChange={(e) => updateFormData({ stepsToReproduce: e.target.value })}
                className="min-h-[80px] border-support-light-blue focus:border-support-blue"
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              onClick={prevStep}
              variant="outline"
              className="border-support-light-blue"
            >
              Previous
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid}
              className="bg-support-blue hover:bg-support-dark-blue text-white"
            >
              Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default IssueDescriptionStep;
