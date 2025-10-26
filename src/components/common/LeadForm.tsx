"use client";

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface LeadFormProps {
  source?: string;
  agentId?: string;
  propertyId?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  showPropertyType?: boolean;
  showBudget?: boolean;
  showLocation?: boolean;
  compact?: boolean;
}

export default function LeadForm({
  source = 'Website',
  agentId,
  propertyId,
  className = '',
  title = 'Get in Touch',
  subtitle = 'Fill out the form below and we\'ll get back to you soon',
  showPropertyType = true,
  showBudget = true,
  showLocation = true,
  compact = false
}: LeadFormProps) {
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
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          propertyType: '',
          budget: '',
          location: ''
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

  if (compact) {
    return (
      <Card className={`w-full max-w-md mx-auto ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-light text-center">{title}</CardTitle>
          {subtitle && (
            <p className="text-sm text-gray-600 text-center">{subtitle}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Input
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="h-10"
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="h-10"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-[#dbbb90] hover:bg-[#C2A17B] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get Started'
              )}
            </Button>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Thank you! We'll contact you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-lg mx-auto ${className}`}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-light text-center">{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-gray-600 text-center">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="h-11"
            />
            <Input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="h-11"
            />
          </div>

          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="h-11"
          />

          {showPropertyType && (
            <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
              <SelectTrigger className="h-11">
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
          )}

          {showBudget && (
            <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
              <SelectTrigger className="h-11">
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
          )}

          {showLocation && (
            <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
              <SelectTrigger className="h-11">
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
          )}

          <Textarea
            placeholder="Tell us about your requirements..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="min-h-[100px] resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 text-sm p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Thank you! We'll contact you soon.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
