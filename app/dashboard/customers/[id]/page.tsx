import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomerById, fetchInvoicesByCustomerId } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import InvoiceStatus from '@/app/ui/invoices/status';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Detail',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const [customer, invoices] = await Promise.all([
    fetchCustomerById(id),
    fetchInvoicesByCustomerId(id),
  ]);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: customer.name,
            href: `/dashboard/customers/${id}`,
            active: true,
          },
        ]}
      />

      <div className="mb-6 flex items-center gap-4 rounded-md bg-gray-50 p-6">
        <Image
          src={customer.image_url}
          className="rounded-full"
          alt={`${customer.name}'s profile picture`}
          width={48}
          height={48}
        />
        <div>
          <h1 className="text-xl font-semibold">{customer.name}</h1>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Total Invoices</p>
          <p className="text-xl font-medium">{customer.total_invoices}</p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Total Pending</p>
          <p className="text-xl font-medium">{customer.total_pending}</p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Total Paid</p>
          <p className="text-xl font-medium">{customer.total_paid}</p>
        </div>
      </div>

      <div className="rounded-md bg-gray-50 p-2">
        {invoices.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">This customer has no invoices yet.</p>
        ) : (
          <table className="min-w-full text-gray-900">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}