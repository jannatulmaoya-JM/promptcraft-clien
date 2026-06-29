
'use client';

import React, { useState, Suspense } from 'react';
import { Button, Card } from "@heroui/react";
import { CheckCircle2, Zap, ShieldCheck, Star, Sparkles, CreditCard, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function PaymentContent() {
  const [selectedCard, setSelectedCard] = useState('visa');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('promptId');

  const handlePayment = () => {
    setIsSuccess(true);
    toast.success("Payment Successful!");
    
    setTimeout(() => {
      if (promptId) {
        router.push(`/all-prompts/${promptId}`);
      } else {
        router.push('/all-prompts');
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-gray-400 mt-2">Welcome to PromptCraft Pro. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upgrade to PromptCraft Pro</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          <Card className="bg-gray-900 border border-gray-800 p-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white">PromptCraft Pro Access</h2>
              <div className="text-5xl font-bold text-white">$5.00 <span className="text-lg text-gray-500 font-normal">/ one-time</span></div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlock all premium templates</li>
                <li className="flex items-center gap-3"><Zap className="w-5 h-5 text-yellow-500" /> Unlimited prompt copy actions</li>
                <li className="flex items-center gap-3"><Star className="w-5 h-5 text-orange-400" /> Community review access</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-blue-500" /> Lifetime ownership</li>
              </ul>
            </div>
          </Card>

          <Card className="bg-gray-900 border border-gray-800 p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <CreditCard /> Card Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setSelectedCard('visa')}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${selectedCard === 'visa' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800'}`}
                >
                  <span className="text-white font-medium">Visa ending 4242</span>
                  <span className="text-gray-400 text-sm">04 / 28</span>
                </button>
                <button 
                  onClick={() => setSelectedCard('mastercard')}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${selectedCard === 'mastercard' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800'}`}
                >
                  <span className="text-white font-medium">Mastercard ending 8888</span>
                  <span className="text-gray-400 text-sm">12 / 27</span>
                </button>
              </div>

              <Button 
                onClick={handlePayment} 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-14 text-lg w-full transition-all"
              >
                Pay One-time $5.00
              </Button>

              <div className="border border-purple-900/30 bg-purple-900/5 p-4 rounded-lg text-center">
                <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Stripe Testing Assist</p>
                <p className="text-gray-400 text-xs mb-4">Running locally without keys? Use our Sandbox simulation to test.</p>
                <Button variant="flat" className="w-full bg-cyan-950/30 text-cyan-400 border border-cyan-800/50">
                  Simulate $5 Test Checkout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}