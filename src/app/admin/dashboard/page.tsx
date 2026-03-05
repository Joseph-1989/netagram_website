'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  graphqlRequest,
  graphqlUploadRequest,
  GRAPHQL_URL,
} from '@/lib/graphql';

const getImageUrl = (path: string | null | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  try {
    const url = new URL(GRAPHQL_URL);
    return `${url.origin}${path.startsWith('/') ? '' : '/'}${path}`;
  } catch {
    return path;
  }
};

interface UpdateItem {
  id: number;
  title: string;
  content: string;
  highlight: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const GET_LIST = `
  query GetUpdateInfoList($page: Int!, $limit: Int!) {
    getUpdateInfoList(page: $page, limit: $limit) {
      id
      title
      content
      highlight
      image
      createdAt
      updatedAt
    }
  }
`;

const CREATE_MUTATION = `
  mutation CreateUpdateInfo($input: CreateUpdateInfoDto!) {
    createUpdateInfo(input: $input) {
      id
    }
  }
`;

const UPDATE_MUTATION = `
  mutation UpdateUpdateInfo($id: Int!, $input: UpdateUpdateInfoDto!) {
    updateUpdateInfo(id: $id, input: $input) {
      id
    }
  }
`;

const DELETE_MUTATION = `
  mutation DeleteUpdateInfo($id: Int!) {
    deleteUpdateInfo(id: $id)
  }
`;

const PAGE_LIMIT = 10;

export default function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formHighlight, setFormHighlight] = useState(false);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData(activePage);
  }, [router, activePage]);

  const fetchData = async (page = activePage) => {
    setLoading(true);
    setError('');
    try {
      const data = await graphqlRequest<{ getUpdateInfoList: UpdateItem[] }>(
        GET_LIST,
        { page, limit: PAGE_LIMIT },
      );
      const fetched = data.getUpdateInfoList || [];
      setItems(fetched);
      const more = fetched.length === PAGE_LIMIT;
      setHasMore(more);
      setTotalPages(prev =>
        more ? Math.max(prev, page + 1) : Math.max(prev, page),
      );
    } catch (err: any) {
      setError(err.message || 'Failed to fetch items');
      if (
        err.message.includes('Unauthorized') ||
        err.message.includes('Token')
      ) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
    setFormHighlight(false);
    setFormImage(null);
    setExistingImage(null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const openEditModal = (item: UpdateItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormContent(item.content);
    setFormHighlight(item.highlight);
    setFormImage(null);
    setExistingImage(item.image || null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await graphqlRequest(DELETE_MUTATION, { id });
      await fetchData();
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      if (editingId) {
        if (formImage) {
          await graphqlUploadRequest(
            UPDATE_MUTATION,
            {
              id: editingId,
              input: {
                title: formTitle,
                content: formContent,
                highlight: formHighlight,
                image: null, // Set to null per graphql-upload spec for the main variable
                removeImage: false,
              },
            },
            { image: formImage }, // The actual file mapping
          );
        } else {
          await graphqlRequest(UPDATE_MUTATION, {
            id: editingId,
            input: {
              title: formTitle,
              content: formContent,
              highlight: formHighlight,
              removeImage,
            },
          });
        }
      } else {
        if (formImage) {
          await graphqlUploadRequest(
            CREATE_MUTATION,
            {
              input: {
                title: formTitle,
                content: formContent,
                highlight: formHighlight,
                image: null,
              },
            },
            { image: formImage },
          );
        } else {
          await graphqlRequest(CREATE_MUTATION, {
            input: {
              title: formTitle,
              content: formContent,
              highlight: formHighlight,
            },
          });
        }
      }
      setIsModalOpen(false);
      await fetchData();
    } catch (err: any) {
      alert(`Failed to save: ${err.message}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Update Information
            </h2>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              + Create New
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4 font-medium">No.</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">Highlight</th>
                  <th className="p-4 font-medium">Created At</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      No update information found.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() =>
                          setExpandedId(prev =>
                            prev === item.id ? null : item.id,
                          )
                        }
                        className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                      >
                        <td className="p-4 text-sm text-gray-500">
                          {(activePage - 1) * PAGE_LIMIT + index + 1}
                        </td>
                        <td className="p-4 text-sm text-gray-800 font-medium">
                          {item.title}
                        </td>
                        <td className="p-4 text-sm">
                          {item.image ? (
                            <span className="text-teal-600 text-xs font-semibold px-2 py-1 bg-teal-50 rounded">
                              Yes
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">No</span>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          {item.highlight ? (
                            <span className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded text-xs font-semibold">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                              No
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm text-right space-x-2">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              openEditModal(item);
                            }}
                            className="px-3 py-1 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            className="px-3 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      {expandedId === item.id && (
                        <tr className="bg-gray-50">
                          <td
                            colSpan={6}
                            className="p-6 border-b border-gray-100"
                          >
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                              {item.content}
                            </div>
                            {item.image && (
                              <div className="mt-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.title}
                                  className="max-h-64 rounded border border-gray-200 object-contain"
                                />
                              </div>
                            )}
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
          {totalPages > 1 || hasMore ? (
            <div className="flex justify-center items-center py-4 gap-2 text-gray-400 text-sm border-t border-gray-100">
              {/* First */}
              <button
                onClick={() => setActivePage(1)}
                disabled={activePage === 1}
                className="flex items-center justify-center w-8 h-8 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </button>
              {/* Prev */}
              <button
                onClick={() => setActivePage(p => Math.max(1, p - 1))}
                disabled={activePage === 1}
                className="flex items-center justify-center w-8 h-8 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Page numbers */}
              <div className="flex gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setActivePage(page)}
                      className={`w-7 h-7 rounded text-sm flex items-center justify-center ${
                        activePage === page
                          ? 'bg-teal-600 text-white font-bold'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => setActivePage(p => p + 1)}
                disabled={!hasMore && activePage === totalPages}
                className="flex items-center justify-center w-8 h-8 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              {/* Last */}
              <button
                onClick={() => setActivePage(totalPages)}
                disabled={!hasMore && activePage === totalPages}
                className="flex items-center justify-center w-8 h-8 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Update Info' : 'Create Update Info'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="e.g. New Features Added"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (Optional)
                </label>
                {!removeImage && existingImage && (
                  <div className="mb-3 relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(existingImage)}
                      alt="Current"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        setFormImage(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = '';
                      }}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line text-xs font-medium text-center"
                    >
                      Click to{'\n'}remove
                    </button>
                  </div>
                )}
                {removeImage && existingImage && (
                  <div className="mb-3 text-sm text-amber-600 font-medium">
                    Current image will be removed.
                    <button
                      type="button"
                      onClick={() => setRemoveImage(false)}
                      className="ml-2 underline hover:text-amber-800"
                    >
                      Undo
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0] || null;
                    setFormImage(file);
                    if (file) {
                      setRemoveImage(false); // Disable remove flag if replacing image
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlight (Blue Text)
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHighlight}
                    onChange={e => setFormHighlight(e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-600">Mark as highlighted</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content (Markdown/Text)
                </label>
                <textarea
                  required
                  rows={10}
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none resize-y"
                  placeholder="Enter the update details here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className={`px-6 py-2 text-white rounded-lg transition-colors ${
                    formSubmitting
                      ? 'bg-teal-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {formSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
