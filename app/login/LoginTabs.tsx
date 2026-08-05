'use client';

import { useState } from 'react';
import SessionLoginForm from './SessionLoginForm';
import JwtLoginForm from './JwtLoginForm'; 
export default function LoginTabs() {
  const [tab, setTab] = useState<'session' | 'jwt'>('session');

    return (
        <div className="w-full max-w-sm">
              <div className="flex gap-2 mb-6 border border-gray-200 rounded-lg p-1">
                      <button
                                onClick={() => setTab('session')}
                                          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                                                      tab === 'session' ? 'bg-blue-600 text-white' : 'text-gray-500'
                                                                }`}
                                                                        >
                                                                                  ورود عادی (Session)
                                                                                          </button>
                                                                                                  <button
                                                                                                            onClick={() => setTab('jwt')}
                                                                                                                      className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                                                                                                                                  tab === 'jwt' ? 'bg-blue-600 text-white' : 'text-gray-500'
                                                                                                                                            }`}
                                                                                                                                                    >
                                                                                                                                                              ورود JWT
                                                                                                                                                                      </button>
                                                                                                                                                                            </div>

                                                                                                                                                                                  {tab === 'session' ? (
                                                                                                                                                                                          <SessionLoginForm />
                                                                                                                                                                                                ) : (
                                                                                                                                                                                                        
                                                                                     <JwtLoginForm />                                                                                                                   )}
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                      }