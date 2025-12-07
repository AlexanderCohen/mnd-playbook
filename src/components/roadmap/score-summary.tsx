'use client';

import * as React from 'react';
import { Activity, MessageCircle, Footprints, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { DOMAIN_COLORS } from '@/lib/constants/questions';

interface ScoreSummaryProps {
  total: number;
  bulbar: number;
  motor: number;
  respiratory: number;
  date: string;
}

export function ScoreSummary({ total, bulbar, motor, respiratory, date }: ScoreSummaryProps) {
  const domains = [
    { label: 'Bulbar', score: bulbar, max: 12, color: DOMAIN_COLORS.bulbar, icon: MessageCircle },
    { label: 'Motor', score: motor, max: 24, color: DOMAIN_COLORS.motor, icon: Footprints },
    { label: 'Respiratory', score: respiratory, max: 12, color: DOMAIN_COLORS.respiratory, icon: Wind },
  ];

  const percentage = Math.round((total / 48) * 100);

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        {/* Header - responsive layout */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            <span className="text-sm sm:text-base font-medium text-gray-600">Latest ALSFRS-R Score</span>
          </div>
          <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
        </div>

        {/* Total score - larger for visibility */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl sm:text-5xl font-bold text-gray-900">{total}</span>
          <span className="text-xl sm:text-2xl text-gray-400">/48</span>
          <span className="ml-auto text-base sm:text-lg font-medium text-gray-600">{percentage}%</span>
        </div>

        {/* Progress bar - taller for visibility */}
        <div
          className="h-3 sm:h-4 w-full overflow-hidden rounded-full bg-gray-200 mb-5"
          role="progressbar"
          aria-valuenow={total}
          aria-valuemin={0}
          aria-valuemax={48}
          aria-label={`Total score ${total} out of 48`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Domain breakdown - responsive grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {domains.map((domain) => {
            const domainPercentage = Math.round((domain.score / domain.max) * 100);
            return (
              <div
                key={domain.label}
                className="rounded-xl p-3 sm:p-4 text-center min-h-[80px] flex flex-col items-center justify-center"
                style={{ backgroundColor: `${domain.color}15` }}
              >
                <domain.icon className="h-5 w-5 sm:h-6 sm:w-6 mb-1.5" style={{ color: domain.color }} />
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{domain.label}</div>
                <div className="text-lg sm:text-xl font-bold" style={{ color: domain.color }}>
                  {domain.score}/{domain.max}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
