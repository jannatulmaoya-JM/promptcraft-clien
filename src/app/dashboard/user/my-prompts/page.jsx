

'use client';

import React from 'react';
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Chip, Card 
} from "@heroui/react"; 
import { Edit, Trash2, BarChart3, Eye, AlertCircle, Plus } from "lucide-react";
import Link from 'next/link';

export default function MyPromptsPage() {
  const myPrompts = []; 

  return (
  
    <div className="max-w-5xl mx-auto p-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-2 text-white">My Prompt Templates</h1>
      <p className="text-gray-400 mb-8">Review approval statuses, change details, and check analytics.</p>
      
      {myPrompts.length === 0 ? (
      
        <Card className="bg-gray-900/50 border border-green-500 min-h-[300px] flex items-center justify-center p-12 shadow-lg">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Prompts Found</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              You have not published any prompts. Upgraded Creators can build and monetize prompts.
            </p>
            <Link href="/dashboard/add-prompt">
              <Button color="primary" className="font-semibold">Create Your First Prompt</Button>
            </Link>
          </div>
        </Card>
      ) : (
        // Data Table
        <Card className="bg-gray-900/50 border border-gray-800 p-4">
          <Table aria-label="My Prompts Table" className="text-gray-200">
            <TableHeader>
              <TableColumn className="text-gray-300">TITLE</TableColumn>
              <TableColumn className="text-gray-300">CATEGORY</TableColumn>
              <TableColumn className="text-gray-300">STATUS</TableColumn>
              <TableColumn className="text-gray-300">COPIES</TableColumn>
              <TableColumn className="text-gray-300">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {myPrompts.map((prompt) => (
                <TableRow key={prompt.id} className="border-b border-gray-800">
                  <TableCell className="text-white">{prompt.title}</TableCell>
                  <TableCell>{prompt.category}</TableCell>
                  <TableCell>
                    <Chip variant="flat" color={prompt.status === 'Approved' ? 'success' : 'warning'}>
                      {prompt.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{prompt.copyCount}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm" variant="flat" className="text-gray-300"><Eye className="w-4 h-4" /></Button>
                      <Button isIconOnly size="sm" variant="flat" className="text-gray-300"><Edit className="w-4 h-4" /></Button>
                      <Button isIconOnly size="sm" variant="flat" className="text-gray-300"><Trash2 className="w-4 h-4" /></Button>
                      <Button isIconOnly size="sm" variant="flat" className="text-gray-300"><BarChart3 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}