import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { fetchCustomersPages } from '@/app/lib/data';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customers',
};

const ERROR_MESSAGES = {
  'has-invoices':
    "This customer has invoices, so they can't be deleted. Delete their invoices first.",
  'delete-failed': "Couldn't delete the customer. Try again.",
} as const;

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    error?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  const errorKey = searchParams?.error;
  const errorMessage =
    errorKey === 'has-invoices' || errorKey === 'delete-failed'
      ? ERROR_MESSAGES[errorKey]
      : undefined;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      {errorMessage && (
        <div
          role="alert"
          className="mt-4 flex items-center justify-between rounded-md bg-red-50 p-4 text-sm text-red-600"
        >
          <p>{errorMessage}</p>
          <Link href="/dashboard/customers" className="font-medium underline">
            Dismiss
          </Link>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customer..." />
        <CreateCustomer />
      </div>
      {<Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>}
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}