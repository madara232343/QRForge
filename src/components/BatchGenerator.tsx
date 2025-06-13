
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, FileText, Zap } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import JSZip from 'jszip';

interface BatchItem {
  name: string;
  content: string;
  type: string;
}

export const BatchGenerator: React.FC = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [batchData, setBatchData] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCsvFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data: BatchItem[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim());
          data.push({
            name: values[0] || `QR_${i}`,
            content: values[1] || '',
            type: values[2] || 'url'
          });
        }
      }
      
      setBatchData(data);
      toast.success(`Loaded ${data.length} items from CSV`);
    };
    
    reader.readAsText(file);
  };

  const generateBatchQRs = async () => {
    if (batchData.length === 0) {
      toast.error('Please upload a CSV file first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const zip = new JSZip();
    
    try {
      for (let i = 0; i < batchData.length; i++) {
        const item = batchData[i];
        
        // Generate QR code
        const qrDataUrl = await QRCode.toDataURL(item.content, {
          width: 512,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });

        // Convert to blob and add to zip
        const response = await fetch(qrDataUrl);
        const blob = await response.blob();
        
        zip.file(`${item.name}.png`, blob);
        
        // Update progress
        setProgress(Math.round(((i + 1) / batchData.length) * 100));
      }

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrenzo_batch_${Date.now()}.zip`;
      a.click();
      
      toast.success(`Generated ${batchData.length} QR codes successfully!`);
    } catch (error) {
      console.error('Batch generation error:', error);
      toast.error('Failed to generate batch QR codes');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = `name,content,type
Business Card,BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company\nEMAIL:john@company.com\nEND:VCARD,text
Website,https://example.com,url
WiFi Network,WIFI:T:WPA;S:MyNetwork;P:password123;;,wifi
Phone Number,+1234567890,phone`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrenzo_batch_sample.csv';
    a.click();
  };

  return (
    <Card className="border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-600">
          <Zap className="h-5 w-5" />
          Batch QR Generator
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pro</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Upload a CSV file to generate multiple QR codes at once. Perfect for events, product tags, or bulk operations.
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={downloadSampleCSV}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Download Sample CSV
          </Button>
        </div>

        <div>
          <Label htmlFor="csv-upload">Upload CSV File</Label>
          <Input
            ref={fileInputRef}
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mt-2"
          />
        </div>

        {batchData.length > 0 && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Ready to generate {batchData.length} QR codes
            </p>
            <div className="mt-2 max-h-32 overflow-y-auto">
              {batchData.slice(0, 5).map((item, index) => (
                <div key={index} className="text-xs text-orange-600 dark:text-orange-400">
                  {item.name}: {item.content.substring(0, 50)}...
                </div>
              ))}
              {batchData.length > 5 && (
                <div className="text-xs text-orange-500">
                  ... and {batchData.length - 5} more items
                </div>
              )}
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-slate-600">
              Generating QR codes... {progress}%
            </p>
          </div>
        )}

        <Button
          onClick={generateBatchQRs}
          disabled={batchData.length === 0 || isProcessing}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {isProcessing ? (
            'Generating...'
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate Batch QR Codes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
