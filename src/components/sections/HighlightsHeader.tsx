import React, { useState } from 'react';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

export function HighlightsHeader() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-neutral-800 text-white relative">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">
                New Feature Highlights
              </span>
            </div>
            <span className="text-sm text-neutral-200">
              Advanced chargeback prevention now available with 40% better dispute resolution
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-neutral-200 hover:bg-neutral-700 p-2"
            aria-label="Close highlights header"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </div>
  );
}
