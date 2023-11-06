"use client";

import React from "react";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({
  children, open, onClose 
}: ModalProps) {
  function handleClose() {
    if (onClose) onClose()
  }

  return open && (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500
                      bg-opacity-75 transition-opacity"
           onClick={handleClose}></div>

      <div className="flex items-center justify-center min-h-screen
                      pt-4 px-4 pb-20 text-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl 
                          transform transition-all sm:max-w-fit sm:w-full">
          {children}
        </div>
      </div>
    </div>
  )
}