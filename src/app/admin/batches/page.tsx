"use client";

import { useState, useEffect } from "react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<any | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/batches');
      if (res.ok) {
        const data = await res.json();
        setBatches(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleUpdateStatus = async (batchId: string, status: string) => {
    if (status === "Rejected" && !rejectNote) {
      alert("Please provide a rejection note.");
      return;
    }
    
    try {
      const res = await fetch('/api/admin/batches', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchId, status, rejectionNotes: rejectNote })
      });
      
      if (res.ok) {
        alert(`Batch ${status} successfully!`);
        fetchBatches();
        setSelectedBatch(null);
        setRejectNote("");
      } else {
        alert("Failed to update status.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": case "Published": return "bg-green-100 text-green-800 border-green-200";
      case "Pending Verification": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-forest-900">Batch Management & QR</h1>
        <button className="bg-forest-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-800 transition">
          + Create New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Batches Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-medium">Batch ID</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Loading batches...</td></tr>
              ) : batches.map((batch) => (
                <tr key={batch._id} className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer" onClick={() => setSelectedBatch(batch)}>
                  <td className="p-4 font-medium text-forest-900">{batch.batchId}</td>
                  <td className="p-4 text-gray-700 text-sm">{(batch.productId as any)?.name || 'Unknown Product'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-forest-700 hover:text-forest-900">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* QR Code & Approval Panel */}
        <div className="lg:col-span-1">
          {selectedBatch ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center sticky top-8">
              <h3 className="font-serif text-lg mb-1">Batch Details</h3>
              <p className="text-sm text-gray-500 mb-6">ID: {selectedBatch.batchId}</p>

              {(selectedBatch.status === 'Approved' || selectedBatch.status === 'Published') ? (
                <>
                  <QRCodeDisplay 
                    url={`${globalThis.window ? window.location.origin : ''}/verification/${(selectedBatch.productId as any)?._id || selectedBatch.productId}/${selectedBatch.batchId}`} 
                  />
                  <div className="w-full mt-8 space-y-3">
                    <button className="w-full bg-forest-900 text-white py-2 rounded-lg font-medium hover:bg-forest-800 transition">
                      Download QR Code
                    </button>
                    <Link 
                      href={`/verification/${(selectedBatch.productId as any)?._id || selectedBatch.productId}/${selectedBatch.batchId}`} 
                      target="_blank"
                      className="w-full block border border-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Preview Passport Page
                    </Link>
                  </div>
                </>
              ) : (
                <div className="w-full text-left space-y-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-4">
                    <h4 className="font-medium text-amber-800 mb-1">Needs Verification</h4>
                    <p className="text-xs text-amber-700">Please verify documents and physical checks before generating QR code.</p>
                  </div>
                  
                  {selectedBatch.status === 'Pending Verification' && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleUpdateStatus(selectedBatch._id, 'Approved')}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                      >
                        <CheckCircle size={18} /> Approve Batch
                      </button>
                      
                      <div className="space-y-2">
                        <textarea 
                          placeholder="Rejection note (required for rejection)..."
                          className="w-full text-sm border p-2 rounded-lg"
                          value={rejectNote}
                          onChange={(e) => setRejectNote(e.target.value)}
                        />
                        <button 
                          onClick={() => handleUpdateStatus(selectedBatch._id, 'Rejected')}
                          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                        >
                          <XCircle size={18} /> Reject Batch
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-8 flex items-center justify-center text-gray-500 text-sm text-center h-full min-h-[300px]">
              Select a batch from the table to generate and view its QR code.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
