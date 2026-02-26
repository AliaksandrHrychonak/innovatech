'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: any;
}

export function ContactDialog({ open, onOpenChange, dict }: ContactDialogProps) {
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Форматирование телефона
  const formatPhoneNumber = (input: string) => {
    // Убираем все кроме цифр
    const numbers = input.replace(/\D/g, '');

    // Если начинается с 8, заменяем на 7
    const normalized = numbers.startsWith('8') ? '7' + numbers.slice(1) : numbers;

    // Определяем префикс и форматируем
    if (normalized.startsWith('7')) {
      // Россия/Казахстан: +7 (XXX) XXX-XX-XX
      const match = normalized.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (match) {
        let formatted = '+7';
        if (match[1]) formatted += ` (${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;
        if (match[4]) formatted += `-${match[4]}`;
        return formatted;
      }
    } else if (normalized.startsWith('375')) {
      // Беларусь: +375 (XX) XXX-XX-XX
      const match = normalized.match(/^375(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (match) {
        let formatted = '+375';
        if (match[1]) formatted += ` (${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;
        if (match[4]) formatted += `-${match[4]}`;
        return formatted;
      }
    }

    // Для других номеров просто добавляем +
    return normalized ? `+${normalized}` : '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (contactType === 'phone') {
      const formatted = formatPhoneNumber(input);
      setValue(formatted);
    } else {
      setValue(input);
    }
  };

  // Валидация
  const validatePhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    // Минимум 11 цифр для полного номера
    return numbers.length >= 11;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = contactType === 'phone'
    ? validatePhone(value)
    : validateEmail(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    setIsSubmitting(true);

    // Имитация отправки (здесь будет реальная логика)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Закрыть через 2 секунды после успеха
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        setIsSuccess(false);
        setValue('');
      }, 300);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <DialogHeader className="space-y-3 mb-6">
                <DialogTitle className="text-2xl font-bold">
                  {dict.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {dict.description}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Переключатель тип контакта */}
                <div className="space-y-3">
                  <Label>{dict.contactTypeLabel}</Label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                    <button
                      type="button"
                      onClick={() => setContactType('phone')}
                      className={`relative py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                        contactType === 'phone'
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {contactType === 'phone' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-background rounded-md shadow-sm"
                          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Phone size={16} />
                        {dict.phoneLabel}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactType('email')}
                      className={`relative py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                        contactType === 'email'
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {contactType === 'email' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-background rounded-md shadow-sm"
                          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail size={16} />
                        {dict.emailLabel}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Поле контакта с анимацией */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={contactType}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="contact">
                      {contactType === 'phone' ? dict.phoneLabel : dict.emailLabel}
                    </Label>
                    <Input
                      id="contact"
                      type={contactType === 'phone' ? 'tel' : 'email'}
                      placeholder={
                        contactType === 'phone'
                          ? dict.phonePlaceholder
                          : dict.emailPlaceholder
                      }
                      value={value}
                      onChange={handlePhoneChange}
                      required
                      className="h-12 text-base"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Кнопка отправки */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold gap-2 group"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    dict.sending
                  ) : (
                    <>
                      {dict.submitButton}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </Button>

                {/* Подпись внизу */}
                <p className="text-xs text-center text-muted-foreground">
                  {dict.privacyNote.beforeLink}{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    {dict.privacyNote.linkText}
                  </Link>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', bounce: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{dict.successTitle}</h3>
              <p className="text-muted-foreground">{dict.successMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
