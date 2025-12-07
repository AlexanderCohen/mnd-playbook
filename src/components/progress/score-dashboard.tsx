'use client';

import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';
import { db } from '@/lib/dexie-db';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

export function ScoreDashboard() {
  const assessments = useLiveQuery(() =>
    db.assessments.orderBy('date').reverse().toArray()
  );

  if (!assessments || assessments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="mb-4 h-12 w-12 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900">No assessments yet</h3>
        <p className="text-gray-500">Complete your first assessment to see your scores</p>
      </div>
    );
  }

  const latest = assessments[0];
  const previous = assessments[1];
  const trend = previous ? latest.totalScore - previous.totalScore : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-gray-900">
                {latest.totalScore}
                <span className="text-lg font-normal text-gray-400">/48</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {format(new Date(latest.date), 'MMM d, yyyy')}
              </div>
            </div>
            {previous && (
              <div className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium',
                trend > 0 ? 'bg-green-100 text-green-700' :
                trend < 0 ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              )}>
                {trend > 0 ? <TrendingUp className="h-4 w-4" /> :
                 trend < 0 ? <TrendingDown className="h-4 w-4" /> :
                 <Minus className="h-4 w-4" />}
                {trend > 0 ? '+' : ''}{trend}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assessments.slice(0, 5).map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="text-sm text-gray-500">
                  {format(new Date(assessment.date), 'MMM d, yyyy')}
                </div>
                <div className="font-semibold">{assessment.totalScore}/48</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
