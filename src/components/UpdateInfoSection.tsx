'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { graphqlRequest } from '@/lib/graphql';

interface UpdateItem {
  id: number;
  title: string;
  createdAt: string;
  content?: string;
  highlight?: boolean;
  image?: string;
}

const GET_UPDATE_LIST = `
  query GetUpdateInfoList($page: Int!, $limit: Int!) {
    getUpdateInfoList(page: $page, limit: $limit) {
      id
      title
      content
      highlight
      image
      createdAt
    }
  }
`;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}. ${mm}. ${dd}`;
}

export default function UpdateInfoSection() {
  const language = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updateData, setUpdateData] = useState<UpdateItem[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      setLoading(true);
      try {
        const data = await graphqlRequest<{ getUpdateInfoList: UpdateItem[] }>(
          GET_UPDATE_LIST,
          {
            page: activePage,
            limit: 10,
          },
        );
        setUpdateData(data.getUpdateInfoList || []);
        // Assuming your backend API currently doesn't return totalPages easily, let's max it to 1
        setTotalPages(1);
      } catch (error) {
        console.error('Failed to fetch update info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, [activePage]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="features"
      className="mx-auto w-full px-4 py-40 max-w-7xl max-[459px]:py-20 max-[459px]:px-2"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent inline-block pb-2 border-b-2 border-teal-500">
          {language === 'ko' ? '업데이트 정보' : 'Update Info'}
        </h2>
      </div>

      <div className="w-full bg-white">
        <div className="overflow-x-auto min-h-[600px] max-[459px]:overflow-x-hidden max-[459px]:min-h-[500px]">
          <table className="w-full min-w-[768px] max-[459px]:min-w-0 max-[459px]:table-fixed">
            <thead>
              <tr className="border-t-2 border-gray-800 border-b border-gray-300">
                <th className="py-4 text-center font-bold text-gray-800 w-24 max-[459px]:w-10 max-[459px]:py-3 max-[459px]:text-sm">
                  No.
                </th>
                <th className="py-4 text-center font-bold text-gray-800 max-[459px]:py-3 max-[459px]:text-sm max-[459px]:text-left">
                  Title
                </th>
                <th className="py-4 text-center font-bold text-gray-800 w-32 max-[459px]:w-[72px] max-[459px]:py-3 max-[459px]:text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-500">
                    Loading updates...
                  </td>
                </tr>
              ) : updateData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-500">
                    No updates available.
                  </td>
                </tr>
              ) : (
                updateData.map(item => (
                  <React.Fragment key={item.id}>
                    <tr
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <td className="py-4 text-center text-gray-600 max-[459px]:py-3 max-[459px]:text-sm">
                        {item.id}
                      </td>
                      <td
                        className={`py-4 px-4 max-[459px]:py-3 max-[459px]:px-2 max-[459px]:text-sm max-[459px]:overflow-hidden max-[459px]:text-ellipsis max-[459px]:whitespace-nowrap max-[459px]:max-w-0 ${item.highlight ? 'text-cyan-500 font-medium' : 'text-gray-700'}`}
                      >
                        <span className="hover:underline text-left">
                          {item.title}
                        </span>
                      </td>
                      <td className="py-4 text-center text-gray-500 max-[459px]:py-3 max-[459px]:text-xs max-[459px]:whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                    {expandedId === item.id && item.content && (
                      <tr className="bg-gray-50/50">
                        <td
                          colSpan={3}
                          className="py-8 px-8 max-[459px]:px-4 max-[459px]:py-6 text-gray-700 whitespace-pre-line text-sm leading-relaxed border-b border-gray-200"
                        >
                          {item.image && (
                            <div className="mb-6 max-w-2xl">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto rounded-lg shadow-sm"
                              />
                            </div>
                          )}
                          <div>{item.content}</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-2 text-gray-400 text-sm max-[459px]:mt-8 max-[459px]:gap-1">
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex gap-2 mx-2 max-[459px]:gap-1 max-[459px]:mx-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`w-6 h-6 flex items-center justify-center max-[459px]:text-xs ${
                    activePage === page
                      ? 'text-teal-500 font-bold'
                      : 'hover:text-gray-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
