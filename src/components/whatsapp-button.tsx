'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function WhatsAppButton() {
  const phoneNumber = '5521974219271'; // Seu número com código do país
  const message = 'Hi! I found your portfolio and would like to talk.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        asChild
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-[#25D366] hover:bg-[#20BA5A] text-white"
        aria-label="Contact via WhatsApp"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src='/whatsapp.svg'
            height={30}
            width={30}
            alt='Whatsapp'
          />
        </a>
      </Button>
    </motion.div>
  );
}
