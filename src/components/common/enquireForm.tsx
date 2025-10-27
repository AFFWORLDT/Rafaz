"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

function EnquireForm({ type, propertyId, agentId }: { type: string; propertyId?: string; agentId?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.name} ${formData.surname}`.trim(),
          email: formData.email,
          phone: formData.telephone,
          message: formData.message,
          source: `${type} Property Inquiry`,
          propertyId,
          agentId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          surname: "",
          email: "",
          telephone: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center p-4 sm:p-6">
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          We've received your inquiry and will contact you within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="outline"
          className="rounded-lg h-9 sm:h-10 text-sm"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          className="bg-white h-10 sm:h-12 px-3 sm:px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono rounded-lg text-sm sm:text-base"
        />
        <Input
          type="text"
          placeholder="Surname"
          value={formData.surname}
          onChange={(e) => handleInputChange('surname', e.target.value)}
          required
          className="bg-white h-10 sm:h-12 px-3 sm:px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono rounded-lg text-sm sm:text-base"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          className="bg-white h-10 sm:h-12 px-3 sm:px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono rounded-lg text-sm sm:text-base"
        />
        <Input
          type="tel"
          placeholder="Telephone"
          value={formData.telephone}
          onChange={(e) => handleInputChange('telephone', e.target.value)}
          required
          className="bg-white h-10 sm:h-12 px-3 sm:px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono rounded-lg text-sm sm:text-base"
        />
      </div>
      {type !== "offPlan" && (
        <Textarea
          placeholder="Write your message here..."
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="bg-white min-h-[120px] sm:min-h-[150px] p-3 sm:p-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold resize-y font-mono rounded-lg text-sm sm:text-base"
        />
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm p-2 sm:p-3 bg-red-50 rounded-lg">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{errorMessage}</span>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3 sm:mt-4 font-mono leading-relaxed">
        By submitting this form you confirm that this website can store your
        submitted information, agree to our{" "}
        <a href="/privacy-policy" className="text-brand-gold hover:underline font-mono">
          privacy policy
        </a>{" "}
        and consent to{" "}
        <a href="/cookie-policy" className="text-brand-gold hover:underline font-mono">
          cookies
        </a>{" "}
        being stored on your computer.
      </p>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg md:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-brand-gold text-white font-semibold uppercase tracking-wider hover:bg-brand-gold/90 transition-colors bg-primary font-mono h-10 sm:h-12 text-sm sm:text-base"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  );
}

export default EnquireForm;
