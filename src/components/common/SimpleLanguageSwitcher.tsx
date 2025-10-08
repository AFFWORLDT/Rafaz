"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage, languages } from '@/src/contexts/LanguageContext';

type LanguageSwitcherProps = {
  variant?: "default" | "compact" | "minimal";
};

export default function SimpleLanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const onSelectChange = (languageCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === languageCode);
    if (selectedLanguage) {
      setCurrentLanguage(selectedLanguage);
    }
  };

  if (variant === "minimal") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full transition-all duration-300 hover:bg-[#D4AF37]/10 text-[#D4AF37] hover:text-[#B8941F]"
          >
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg rounded-xl border border-[#D4AF37]/20 p-1">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => onSelectChange(lang.code)}
              className={cn(
                "flex items-center space-x-2 p-2 cursor-pointer rounded-lg transition-colors duration-200",
                currentLanguage.code === lang.code ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold" : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLanguage.code === lang.code && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 h-10 px-4 rounded-full border border-[#D4AF37]/30 bg-white text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#B8941F] transition-all duration-300 shadow-sm"
          >
            <Globe className="h-4 w-4" />
            <span className="text-lg">{currentLanguage.flag}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg rounded-xl border border-[#D4AF37]/20 p-1">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => onSelectChange(lang.code)}
              className={cn(
                "flex items-center space-x-2 p-2 cursor-pointer rounded-lg transition-colors duration-200",
                currentLanguage.code === lang.code ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold" : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLanguage.code === lang.code && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 h-12 px-6 rounded-lg border border-[#D4AF37]/30 bg-white text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#B8941F] transition-all duration-300 shadow-sm"
        >
          <Globe className="h-5 w-5" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="font-medium">{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-xl border border-[#D4AF37]/20 p-1">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onSelectChange(lang.code)}
            className={cn(
              "flex items-center space-x-2 p-3 cursor-pointer rounded-lg transition-colors duration-200",
              currentLanguage.code === lang.code ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold" : "hover:bg-gray-100 text-gray-700"
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {currentLanguage.code === lang.code && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}