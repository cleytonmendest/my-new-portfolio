'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '5521974219271'; // Country code + number
  const message = 'Hi! I found your portfolio and would like to talk.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        asChild
        size="icon"
        variant="accent"
        className="h-14 w-14 rounded-full"
        aria-label="Contact via WhatsApp"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-6" />
        </a>
      </Button>
    </div>
  );
}
