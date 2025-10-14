import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '~/trpc/react';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
import { Calculator, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const calculatorSchema = z.object({
  aov: z.number().min(1, { message: 'AOV must be greater than $0' }),
  disputeRate: z.number().min(0.01).max(10, { message: 'Dispute rate must be between 0.01% and 10%' }),
  monthlySuccessfulTransactions: z.number().min(100, { message: 'Monthly successful transactions must be at least 100' })
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

interface ROIResult {
  currentMonthlyCost: number;
  projectedSavings: number;
  projectedMonthlyCost: number;
  savingsPercentage: number;
  // Calculation details
  monthlyDisputes: number;
  disputeFee: number;
  chargebackFee: number;
  reductionPercentage: number;
  aov: number;
  disputeRate: number;
  monthlySuccessfulTransactions: number;
}

export function ROICalculator() {
  const [result, setResult] = useState<ROIResult | null>(null);
  const trpc = useTRPC();

  const calculateROI = useMutation(
    trpc.calculateROI.mutationOptions({
      onSuccess: (data) => {
        setResult(data);
      },
      onError: (error) => {
        console.error('ROI calculation failed:', error);
        // Handle error appropriately
      }
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
  });

  const onSubmit = async (data: CalculatorForm) => {
    calculateROI.mutate(data);
  };

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    
    if (absAmount >= 1000000) {
      const millions = absAmount / 1000000;
      const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
      return `${sign}$${formatted}M`;
    } else if (absAmount >= 1000) {
      const thousands = absAmount / 1000;
      const formatted = thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1);
      return `${sign}$${formatted}K`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }
  };

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-6">
              <Calculator className="w-6 h-6 text-neutral-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              ROI teaser
            </h2>
            <p className="text-lg text-neutral-800 mb-3">
              How much could you save this quarter?
            </p>
            <p className="text-lg text-neutral-700">
              Enter AOV, dispute rate, and monthly successful transactions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="aov" className="block text-sm font-medium text-neutral-800 mb-3">
                      Average Order Value ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 w-5 h-5" />
                      <input
                        id="aov"
                        type="number"
                        step="0.01"
                        {...register('aov', { valueAsNumber: true })}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white text-neutral-900 transition-colors"
                        placeholder="50.00"
                      />
                    </div>
                    {errors.aov && (
                      <p className="mt-2 text-sm text-neutral-800">{errors.aov.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="disputeRate" className="block text-sm font-medium text-neutral-800 mb-3">
                      Dispute Rate (%)
                    </label>
                    <input
                      id="disputeRate"
                      type="number"
                      step="0.01"
                      {...register('disputeRate', { valueAsNumber: true })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white text-neutral-900 transition-colors"
                      placeholder="1.5"
                    />
                    {errors.disputeRate && (
                      <p className="mt-2 text-sm text-neutral-800">{errors.disputeRate.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="monthlySuccessfulTransactions" className="block text-sm font-medium text-neutral-800 mb-3">
                      Monthly successful transactions
                    </label>
                    <input
                      id="monthlySuccessfulTransactions"
                      type="number"
                      {...register('monthlySuccessfulTransactions', { valueAsNumber: true })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white text-neutral-900 transition-colors"
                      placeholder="2000"
                    />
                    {errors.monthlySuccessfulTransactions && (
                      <p className="mt-2 text-sm text-neutral-800">{errors.monthlySuccessfulTransactions.message}</p>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="xl" 
                    disabled={calculateROI.isPending}
                    className="w-full md:w-auto"
                  >
                    {calculateROI.isPending ? 'Calculating...' : 'Calculate my savings'}
                  </Button>
                </div>
              </form>
            </div>

            {result && (
              <>
                <div className="bg-neutral-50 p-8 border-t border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">
                    Your Potential Savings
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-neutral-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="flex items-center justify-center mb-3">
                        <TrendingDown className="w-6 h-6 text-neutral-700 mr-2" />
                        <span className="text-sm font-medium text-neutral-800">Current Cost</span>
                      </div>
                      <div className="text-xl font-bold text-neutral-900">
                        {formatCurrency(result.currentMonthlyCost)}/mo
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white rounded-xl border border-neutral-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="flex items-center justify-center mb-3">
                        <TrendingUp className="w-6 h-6 text-neutral-700 mr-2" />
                        <span className="text-sm font-medium text-neutral-800">Projected Savings</span>
                      </div>
                      <div className="text-xl font-bold text-neutral-800">
                        {formatCurrency(result.projectedSavings)}/mo
                      </div>
                      <div className="text-sm text-neutral-700">
                        ({result.savingsPercentage.toFixed(0)}% reduction)
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white rounded-xl border border-neutral-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="flex items-center justify-center mb-3">
                        <DollarSign className="w-6 h-6 text-neutral-700 mr-2" />
                        <span className="text-sm font-medium text-neutral-800">New Cost</span>
                      </div>
                      <div className="text-xl font-bold text-neutral-900">
                        {formatCurrency(result.projectedMonthlyCost)}/mo
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-base font-semibold text-neutral-900">
                      Quarterly savings: <span className="text-neutral-800">{formatCurrency(result.projectedSavings * 3)}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 border-t border-neutral-200">
                  <h4 className="text-lg font-bold text-neutral-900 mb-6 text-center">
                    How We Calculate Your ROI
                  </h4>
                  
                  <div className="space-y-4 text-sm text-neutral-700 max-w-3xl mx-auto">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="font-medium text-neutral-900 mb-2">Step 1: Calculate Monthly Disputes</div>
                      <div className="font-mono text-xs bg-white p-2 rounded border">
                        Monthly Disputes = (Monthly Successful Transactions × Dispute Rate) ÷ 100
                      </div>
                      <div className="mt-2">
                        ({result.monthlySuccessfulTransactions.toLocaleString()} × {result.disputeRate}%) ÷ 100 = <span className="font-medium">{result.monthlyDisputes} disputes/month</span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="font-medium text-neutral-900 mb-2">Step 2: Calculate Current Monthly Cost</div>
                      <div className="font-mono text-xs bg-white p-2 rounded border">
                        Current Cost = Monthly Disputes × (Dispute Fee + Chargeback Fee + AOV)
                      </div>
                      <div className="mt-2">
                        {result.monthlyDisputes} × (${result.disputeFee} + ${result.chargebackFee} + {formatCurrency(result.aov)}) = <span className="font-medium">{formatCurrency(result.currentMonthlyCost)}/month</span>
                      </div>
                      <div className="mt-2 text-xs text-neutral-600">
                        • Dispute Fee: ${result.disputeFee} (industry average processing fee)<br/>
                        • Chargeback Fee: ${result.chargebackFee} (average penalty from payment processors)<br/>
                        • AOV: {formatCurrency(result.aov)} (lost revenue per dispute)
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="font-medium text-neutral-900 mb-2">Step 3: Calculate Projected Savings</div>
                      <div className="font-mono text-xs bg-white p-2 rounded border">
                        Projected Savings = Current Cost × Reduction Percentage ÷ 100
                      </div>
                      <div className="mt-2">
                        {formatCurrency(result.currentMonthlyCost)} × {result.reductionPercentage}% = <span className="font-medium">{formatCurrency(result.projectedSavings)}/month</span>
                      </div>
                      <div className="mt-2 text-xs text-neutral-600">
                        • Based on our proven {result.reductionPercentage}% average dispute reduction rate
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-800 text-center">
                      <strong>Note:</strong> This calculation uses industry-standard fees and our proven reduction rates. 
                      Actual savings may vary based on your specific business model and dispute patterns.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
