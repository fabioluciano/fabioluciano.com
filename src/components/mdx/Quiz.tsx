// =============================================================================
// Quiz Component - Interactive quiz questions for educational content
// =============================================================================

'use client';

import React, { useState } from 'react';
import { HiCheckCircle, HiXCircle, HiQuestionMarkCircle } from 'react-icons/hi2';

interface QuizProps {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export function Quiz({ question, options, correct, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
  };

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = selected === correct;

  return (
    <div className="my-6 not-prose rounded-lg border border-base-300 bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/10 border-b border-base-300 flex items-center gap-2">
        <HiQuestionMarkCircle className="w-5 h-5 text-primary" />
        <span className="font-semibold text-primary">Quiz</span>
      </div>

      {/* Question */}
      <div className="p-4">
        <p className="font-medium mb-4">{question}</p>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option, index) => {
            const isSelected = selected === index;
            const isCorrectOption = index === correct;

            let optionClass = 'border-base-300 bg-base-100 hover:bg-base-200 cursor-pointer';

            if (revealed) {
              if (isCorrectOption) {
                optionClass = 'border-success bg-success/10 text-success';
              } else if (isSelected && !isCorrectOption) {
                optionClass = 'border-error bg-error/10 text-error';
              } else {
                optionClass = 'border-base-300 bg-base-100 opacity-50';
              }
            } else if (isSelected) {
              optionClass = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={revealed}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${optionClass}`}
              >
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {revealed && isCorrectOption && (
                  <HiCheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                )}
                {revealed && isSelected && !isCorrectOption && (
                  <HiXCircle className="w-5 h-5 text-error flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {!revealed ? (
            <button
              onClick={handleReveal}
              disabled={selected === null}
              className="btn btn-primary btn-sm"
            >
              Verificar Resposta
            </button>
          ) : (
            <button onClick={handleReset} className="btn btn-outline btn-sm">
              Tentar Novamente
            </button>
          )}
        </div>

        {/* Result */}
        {revealed && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              isCorrect ? 'bg-success/10 border border-success/30' : 'bg-error/10 border border-error/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {isCorrect ? (
                <>
                  <HiCheckCircle className="w-5 h-5 text-success" />
                  <span className="font-semibold text-success">Correto!</span>
                </>
              ) : (
                <>
                  <HiXCircle className="w-5 h-5 text-error" />
                  <span className="font-semibold text-error">Incorreto</span>
                </>
              )}
            </div>
            {explanation && <p className="text-sm text-base-content/80">{explanation}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
