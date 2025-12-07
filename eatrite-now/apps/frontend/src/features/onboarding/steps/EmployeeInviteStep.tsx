/**
 * Step 2: Employee Invite
 * Allow admins to invite employees via email
 * Skipping is allowed
 */

import React, { useState } from 'react';
import { useInviteEmployees } from '../services';

interface EmployeeInviteStepProps {
  companyId: string;
  onComplete: () => void;
}

export function EmployeeInviteStep({ companyId, onComplete }: EmployeeInviteStepProps) {
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState('');

  const inviteEmployees = useInviteEmployees();

  const handleAddEmail = () => {
    const email = emailInput.trim();
    
    if (!email) {
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Check for duplicates
    if (emails.includes(email)) {
      setError('Email already added');
      return;
    }

    setEmails([...emails, email]);
    setEmailInput('');
    setError('');
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const handlePasteEmails = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Split by newlines, commas, or semicolons
    const pastedEmails = pastedText
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter((e) => e);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = pastedEmails.filter((email) => emailRegex.test(email));
    const uniqueEmails = [...new Set([...emails, ...validEmails])];

    setEmails(uniqueEmails);
    setEmailInput('');
    setError('');
  };

  const handleSubmit = async () => {
    try {
      await inviteEmployees.mutateAsync({
        companyId,
        employees: { emails },
      });

      onComplete();
    } catch (error) {
      console.error('Failed to invite employees:', error);
      setError(error instanceof Error ? error.message : 'Failed to send invites');
    }
  };

  const handleSkip = async () => {
    try {
      // Send empty array to skip
      await inviteEmployees.mutateAsync({
        companyId,
        employees: { emails: [] },
      });

      onComplete();
    } catch (error) {
      console.error('Failed to skip step:', error);
      setError(error instanceof Error ? error.message : 'Failed to proceed');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite Your Team</h2>
      <p className="text-sm text-gray-600 mb-8">
        Invite employees now or come back later. You can add employees at any time.
      </p>

      <div className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700 mb-2">
            Employee Email Addresses
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              id="emailInput"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onPaste={handlePasteEmails}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmail())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address or paste list..."
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Tip: Paste multiple emails separated by commas or newlines
          </p>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Email List */}
        {emails.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {emails.length} employee{emails.length !== 1 ? 's' : ''} to invite:
            </p>
            <ul className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {emails.map((email) => (
                <li
                  key={email}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={emails.length === 0 || inviteEmployees.isPending}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {inviteEmployees.isPending ? 'Sending Invites...' : `Send ${emails.length} Invite${emails.length !== 1 ? 's' : ''}`}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            disabled={inviteEmployees.isPending}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}
