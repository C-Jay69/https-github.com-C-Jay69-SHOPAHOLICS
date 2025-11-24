import React, { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Download, Upload } from 'lucide-react';
import { CURRENCY } from '../constants';
import { Button } from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

const CHART_DATA = [
  { name: 'Mon', sales: 400, impulse: 240 },
  { name: 'Tue', sales: 300, impulse: 139 },
  { name: 'Wed', sales: 200, impulse: 980 },
  { name: 'Thu', sales: 278, impulse: 390 },
  { name: 'Fri', sales: 189, impulse: 480 },
  { name: 'Sat', sales: 239, impulse: 380 },
  { name: 'Sun', sales: 349, impulse: 430 },
];

const MOCK_ORDERS = [
  { id: 1001, customer: 'John Doe', items: 3, total: 124.00, status: 'Paid', date: '2023-10-25' },
  { id: 1002, customer: 'Jane Smith', items: 1, total: 45.00, status: 'Shipped', date: '2023-10-26' },
  { id: 1003, customer: 'Bob Johnson', items: 5, total: 299.99, status: 'Processing', date: '2023-10-26' },
  { id: 1004, customer: 'Alice Cooper', items: 2, total: 89.50, status: 'Delivered', date: '2023-10-24' },
];

export const Admin: React.FC = () => {
  const { products, addProducts } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadCSV = (data: any[], filename: string) => {
    if (!data.length) {
        alert("No data to export");
        return;
    }
    
    const headers = Object.keys(data[0]);
    
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = row[header];
        // Handle null/undefined
        if (value === null || value === undefined) return '""';
        
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const escaped = stringValue.replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',');
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportProducts = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    // Explicit mapping ensures clean CSV structure matching import expectations
    const exportData = products.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      price: p.price,
      category: p.category,
      image: p.image,
      description: p.description,
      isDupeCandidate: p.isDupeCandidate,
      rating: p.rating,
      reviews: p.reviews
    }));
    downloadCSV(exportData, `products_export_${timestamp}.csv`);
  };

  const handleExportOrders = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(MOCK_ORDERS, `orders_export_${timestamp}.csv`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const processCSV = (str: string) => {
    try {
        // Normalize line endings and remove BOM
        const content = str.charCodeAt(0) === 0xFEFF ? str.slice(1) : str;
        const rows = content.split(/\r?\n/);
        
        if (rows.length < 2) {
            alert('File appears empty or missing headers.');
            return;
        }

        // Parse Headers
        const headerLine = rows[0];
        const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
        
        // Check for minimal required fields
        if (!headers.includes('title') || !headers.includes('price')) {
             alert('CSV must contain at least "title" and "price" columns.');
             return;
        }

        const newProducts: Product[] = [];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].trim();
            if (!row) continue;

            // Robust split for CSV (handling quoted commas)
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            const rowData: Record<string, string> = {};
            headers.forEach((h, idx) => {
                if (cols[idx] !== undefined) {
                    rowData[h] = cols[idx].trim().replace(/^"|"$/g, '').replace(/""/g, '"');
                }
            });

            try {
                const title = rowData['title'];
                const price = parseFloat(rowData['price']);

                if (!title || isNaN(price)) {
                    console.warn(`Skipping row ${i + 1}: Missing title or valid price.`);
                    errorCount++;
                    continue;
                }

                // Map CSV fields to Product type
                const product: Product = {
                    id: rowData['id'] || Math.random().toString(36).substr(2, 9),
                    title: title,
                    slug: rowData['slug'] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    price: price,
                    category: rowData['category'] || 'Uncategorized',
                    image: rowData['image'] || `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
                    description: rowData['description'] || '',
                    isDupeCandidate: rowData['isdupecandidate']?.toLowerCase() === 'true' || rowData['is_dupe_candidate']?.toLowerCase() === 'true',
                    rating: parseFloat(rowData['rating']) || 0,
                    reviews: parseInt(rowData['reviews']) || 0,
                    specs: {} // Specs handling from CSV is skipped for simplicity
                };

                newProducts.push(product);
                successCount++;
            } catch (err) {
                console.error(`Error parsing row ${i + 1}`, err);
                errorCount++;
            }
        }

        if (newProducts.length > 0) {
            addProducts(newProducts);
            alert(`Import complete!\nSuccess: ${successCount}\nSkipped/Errors: ${errorCount}`);
        } else {
            alert('No valid products found to import.');
        }

    } catch (error) {
        console.error('CSV processing error:', error);
        alert('Failed to process CSV file. Check console for details.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        if (evt.target?.result) {
            processCSV(evt.target.result as string);
        }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome, Overlord. Sales are up, morals are down.</p>
        </div>
        <div className="flex items-center gap-3">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".csv" 
                className="hidden" 
            />
            <Button onClick={handleImportClick} variant="primary" size="sm" className="flex items-center gap-2">
              <Upload size={16} /> Import CSV
            </Button>
            <Button onClick={handleExportProducts} variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={16} /> Export Products
            </Button>
            <Button onClick={handleExportOrders} variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={16} /> Export Orders
            </Button>
            <div className="bg-electric text-white px-4 py-2 text-sm font-bold rounded-sm ml-2">
                Live Mode
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-slate-900">£12,450.00</div>
            <div className="text-green-600 text-sm mt-1">↑ 12% from last week</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Impulse Buys</h3>
            <div className="text-3xl font-bold text-electric">843</div>
            <div className="text-slate-400 text-sm mt-1">Customers with weak will</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Dupe Acceptance Rate</h3>
            <div className="text-3xl font-bold text-cyan-600">34%</div>
            <div className="text-slate-400 text-sm mt-1">Money saved for users: £4.2k</div>
        </div>
      </div>

      <div className="bg-white p-8 border border-slate-200 shadow-sm mb-12">
        <h3 className="text-lg font-bold mb-6">Sales vs. Impulse Events</h3>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: 'none' }} itemStyle={{ color: '#fff' }} />
                    <Bar dataKey="sales" fill="#0000FF" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="impulse" fill="#00FFFF" name="Impulse Triggered" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold">Recent Orders</h3>
            <button className="text-electric text-sm font-bold hover:text-cyan">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Items</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-mono text-slate-600">#{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.items}</td>
                          <td className="px-6 py-4 font-bold">{CURRENCY}{order.total.toFixed(2)}</td>
                          <td className="px-6 py-4 text-slate-500">{order.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              order.status === 'Paid' || order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};