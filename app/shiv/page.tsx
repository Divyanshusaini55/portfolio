import { Metadata } from 'next'
import ClientShivPage from './client-page'

export const metadata: Metadata = {
  title: 'वीरत्वं शिवत्वं - Shiva Rudrashtakam',
  description: 'Shiva Rudrashtakam',
}

export default function ShivPage() {
  return <ClientShivPage />
}
