"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Phone, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact" | "modal";
  className?: string;
  onSuccess?: () => void;
}

export default function LeadCaptureForm({
  title = "Get Your Free Property Consultation",
  subtitle = "Speak with our expert agents and discover your perfect property today",
  variant = "default",
  className = "",
  onSuccess
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'Lead Capture Form'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        onSuccess?.();
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        alert(result.error || 'There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-4 sm:p-8">
        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          We've received your inquiry and will contact you within 24 hours.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="rounded-lg h-9 sm:h-10 text-sm"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="pl-10 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="pl-10 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="pl-10 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <Textarea
          name="message"
          placeholder="Tell us about your property requirements..."
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className="pl-10 rounded-lg border-gray-300 focus:border-primary focus:ring-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting...
          </div>
        ) : (
          "Get Free Consultation"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );

  if (variant === "compact") {
    return (
      <Card className={`bg-white shadow-lg border-0 ${className}`}>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
          {formContent}
        </CardContent>
      </Card>
    );
  }

  if (variant === "modal") {
    return (
      <div className={`bg-white rounded-lg p-6 max-w-md mx-auto ${className}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm">{subtitle}</p>
        {formContent}
      </div>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          {title}
        </CardTitle>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        {formContent}
      </CardContent>
    </Card>
  );
}
