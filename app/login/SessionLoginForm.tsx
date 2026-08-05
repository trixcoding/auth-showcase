'use client';

import { useActionState } from 'react';
import { loginWithSessionAction } from './actions';
import { ActionState } from '@/types/user';

const initialState: ActionState = {};

export default function SessionLoginForm() {
  const [state, formAction, pending] = useActionState(
      loginWithSessionAction,
          initialState
            );

              return (
                  <form action={formAction} className="flex flex-col gap-3">
                        <input
                                type="email"
                                        name="email"
                                                placeholder="ایمیل"
                                                        required
                                                                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                      />
                                                                            <input
                                                                                    type="password"
                                                                                            name="password"
                                                                                                    placeholder="رمز عبور"
                                                                                                            required
                                                                                                                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                                          />
                                                                                                                                {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                                                                                                                                      <button
                                                                                                                                              type="submit"
                                                                                                                                                      disabled={pending}
                                                                                                                                                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg px-5 py-2.5 transition"
                                                                                                                                                                    >
                                                                                                                                                                            {pending ? '...' : 'ورود'}
                                                                                                                                                                                  </button>
                                                                                                                                                                                      </form>
                                                                                                                                                                                        );
                                                                                                                                                                                        }