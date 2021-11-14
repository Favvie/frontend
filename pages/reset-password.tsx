import React, { useState } from 'react';

import { AuthLayout } from '@/layouts';
import { AuthForm } from '@/shared';

const Page = function () {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetPass = (formData: any) => {
    console.log(formData);
  };

  const form = {
    title: 'Reset your Password.',
    isLoading,
    subtitle: 'Reset your password to continue.',
    fields: [
      {
        name: 'password',
        placeholder: 'New Password',
        type: 'password',
      },
      {
        name: 'newPassword',
        placeholder: 'Confirm New Password',
        type: 'password',
      },
    ],
    submit: {
      text: 'Reset Password',
      action: resetPass,
    },
    extra: {
      text: 'Do you remember your password?',
      linkText: 'Try Logging In',
      linkUrl: '/login',
    },
  };

  return (
    <AuthLayout id="resetPassword" withBanner={false}>
      <AuthForm {...form} />
    </AuthLayout>
  );
};

export default Page;
