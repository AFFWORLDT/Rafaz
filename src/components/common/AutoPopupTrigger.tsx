"use client";

import { useEffect, useRef } from 'react';
import { useLeadForm } from '@/src/contexts/LeadFormContext';

const POPUP_DELAY = 2000; // 2 seconds delay

export default function AutoPopupTrigger() {
  const { openLeadForm, isOpen } = useLeadForm();
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Don't show if popup is already open
    if (isOpen) return;

    // Prevent showing multiple times on the same page load
    if (hasShownRef.current) return;

    // Delay showing the popup to allow page to load
    const timer = setTimeout(() => {
      openLeadForm('Website Popup');
      hasShownRef.current = true;
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, [openLeadForm, isOpen]);

  return null;
}

