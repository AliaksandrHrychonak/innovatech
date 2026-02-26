'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContactDialog } from './ContactDialog';

interface ContactDialogContextType {
  openDialog: () => void;
  closeDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined);

export function ContactDialogProvider({ children, dict }: { children: React.ReactNode; dict: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <ContactDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <ContactDialog open={isOpen} onOpenChange={setIsOpen} dict={dict.contactDialog} />
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error('useContactDialog must be used within ContactDialogProvider');
  }
  return context;
}
