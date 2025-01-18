'use client';
import AuthForm from '@/components/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/Validations'
import React from 'react'

const page = () => (
    <AuthForm
        type='SIGN_IN'
        schema={signInSchema}
        defaultValues={{
            email: '',
            password: '',
        }}
        onSubmit={signInWithCredentials}
    />
)
export default page
