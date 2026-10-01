'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import { createCustomer, CustomerState } from '@/app/lib/actions';
import { useActionState } from 'react';

const AVATARS = [
  'amy-burns', 'balazs-orban', 'delba-de-oliveira',
  'evil-rabbit', 'lee-robinson', 'michael-novotny',
];

export default function Form() {
  const initialState: CustomerState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Choose an avatar</legend>
          <div className="flex flex-wrap gap-3 rounded-md border border-gray-200 bg-white p-4">
            {AVATARS.map((name) => (
              <label key={name} className="cursor-pointer">
                <input
                  type="radio"
                  name="image_url"
                  value={`/customers/${name}.png`}
                  className="peer sr-only"
                  aria-describedby="avatar-error"
                />
                <Image
                  src={`/customers/${name}.png`}
                  alt={name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-transparent peer-checked:ring-blue-600"
                />
              </label>
            ))}
          </div>
          <div id="avatar-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}