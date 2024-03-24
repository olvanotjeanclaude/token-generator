import { Metadata } from 'next';
import React from 'react'
import TokenCreator from './token-creator';

export const metadata: Metadata = {
    title: "Homepage"
};

export default function Page() {
    return  <TokenCreator />
}
