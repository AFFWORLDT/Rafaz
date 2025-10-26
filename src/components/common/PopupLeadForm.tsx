"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Loader, CheckCircle, AlertCircle, X, Phone, Mail, User } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface PopupLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  agentId?: string;
  propertyId?: string;
  title?: string;
  subtitle?: string;
}

export default function PopupLeadForm({
  isOpen,
  onClose,
  source = 'Website',
  agentId,
  propertyId,
  title = 'Get Your Dream Property',
  subtitle = 'Fill out the form below and we\'ll get back to you soon'
}: PopupLeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: '',
    budget: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useLanguage();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyType: '',
        budget: '',
        location: ''
      });
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

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
          ...formData,
          source,
          agentId,
          propertyId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Auto close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-xl font-light text-gray-800 leading-tight">
                {title}
              </DialogTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                We've received your inquiry and will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500k">Under AED 500,000</SelectItem>
                    <SelectItem value="500k-1m">AED 500,000 - 1,000,000</SelectItem>
                    <SelectItem value="1m-2m">AED 1,000,000 - 2,000,000</SelectItem>
                    <SelectItem value="2m-5m">AED 2,000,000 - 5,000,000</SelectItem>
                    <SelectItem value="5m-10m">AED 5,000,000 - 10,000,000</SelectItem>
                    <SelectItem value="over-10m">Over AED 10,000,000</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                    <SelectValue placeholder="Preferred Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                    <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                    <SelectItem value="business-bay">Business Bay</SelectItem>
                    <SelectItem value="jlt">JLT</SelectItem>
                    <SelectItem value="deira">Deira</SelectItem>
                    <SelectItem value="dubai-hills">Dubai Hills Estate</SelectItem>
                    <SelectItem value="any">Any Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="min-h-[70px] sm:min-h-[80px] resize-none text-sm sm:text-base"
              />

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm p-2 sm:p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 sm:h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-medium text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Get Free Consultation'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
